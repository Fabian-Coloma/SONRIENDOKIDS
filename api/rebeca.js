// Bot Rebeca como Vercel Serverless Function (autocontenido, sin imports externos)
// Se despierta cuando Evolution manda un webhook (mensaje de WhatsApp) y responde.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EVOLUTION_URL = process.env.EVOLUTION_URL || "https://evolution-9z0r.onrender.com";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "bxvo23ulxh7l3ohxyu348";
const INSTANCE = process.env.EVOLUTION_INSTANCE || "sonriendokids";

// LID_MAP: LIDs conocidos → números reales (Evolution v1.8.2 con MongoDB entrega LIDs)
const LID_MAP = {
  "83421837680836": "51904104511",   // clínica (escritura desde la clínica misma)
  "250078983893027": "51927784729",  // amiga (51 927 784 729)
};

// Memoria de conversación (persiste entre invocaciones calientes; se resetea en cold start)
const memoria = new Map();

async function sb(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
    },
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function citasProximas() {
  try {
    const hoy = new Date().toISOString().split("T")[0];
    return await sb(`citas?select=id,fecha,hora,motivo,estado,pacientes(nombre_nino)&fecha=gte.${hoy}&order=fecha.asc&limit=50`);
  } catch (e) {
    console.error("citasProximas error:", e.message);
    return [];
  }
}

async function horasOcupadas(fecha) {
  try {
    const rows = await sb(`citas?select=hora&fecha=eq.${fecha}&estado=in.(No confirmado,Confirmado)`);
    return (rows || []).map((r) => r.hora.slice(0, 5));
  } catch (e) {
    console.error("horasOcupadas error:", e.message);
    return [];
  }
}

async function agendarCita({ nombre_nino, nombre_apoderado, whatsapp, fecha, hora, motivo }) {
  try {
    let paciente = await sb(`pacientes?select=id&whatsapp=eq.${whatsapp}`).then((r) => r?.[0]);
    if (!paciente) {
      paciente = await sb("pacientes", {
        method: "POST",
        body: [{ nombre_nino, nombre_apoderado, whatsapp }],
      }).then((r) => r?.[0]);
    }
    return await sb("citas", {
      method: "POST",
      body: { paciente_id: paciente.id, fecha, hora, motivo, estado: "No confirmado" },
    });
  } catch (e) {
    console.error("agendarCita error:", e.message);
    throw e;
  }
}

async function rebeca(historial, mensaje) {
  const modelos = (process.env.GEMINI_MODEL
    ? [process.env.GEMINI_MODEL]
    : ["gemini-3.6-flash"]);
  const unicos = [...new Set(modelos)];
  let ultimoError = null;
  for (const modelo of unicos) {
    for (let intento = 0; intento < 2; intento++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${GEMINI_API_KEY}`;
        const systemPrompt = `Eres Rebeca, la asistente virtual del consultorio odontopediátrico 'Sonriendo Kids', atendiendo por WhatsApp a padres de familia.

Horario: Lun-Sáb 9:00-13:00 y 14:00-17:30. Servicios: odontopediatría, ortopedia/ortodoncia, sedaciones. PUEDES agendar citas.

PARA CREAR UNA CITA reúne SIEMPRE: nombre del niño, nombre del apoderado, fecha (AAAA-MM-DD), hora (HH:MM), motivo. Cuando tengas los 5, responde SOLO este JSON:
{"comando":"agendar_cita","nombre_nino":"...","nombre_apoderado":"...","fecha":"AAAA-MM-DD","hora":"HH:MM","motivo":"..."}

Si NO hay acción, responde en texto natural, breve, cálido y con emojis. Solo usa *negritas*.`;
        const contents = [
          ...historial.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: "user", parts: [{ text: mensaje }] },
        ];
        const body = JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt }] }, contents });
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text.trim();
      } catch (e) {
        ultimoError = e;
        console.error(`Gemini (${modelo}) intento ${intento + 1} falló:`, e.message);
        await new Promise((r) => setTimeout(r, 400));
      }
    }
  }
  throw ultimoError || new Error("Sin modelos disponibles");
}

async function enviarTexto(telefono, texto) {
  const r = await fetch(`${EVOLUTION_URL}/message/sendText/${INSTANCE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: EVOLUTION_API_KEY },
    body: JSON.stringify({ number: telefono, textMessage: { text: texto, delay: 1200, linkPreview: false } }),
  });
  if (!r.ok) {
    const t = await r.text();
    console.error(`enviarTexto FALLÓ (${r.status}): ${t.slice(0, 200)}`);
    throw new Error(`Evolution ${r.status}: ${t.slice(0, 120)}`);
  }
  return r;
}

async function revisarRecordatorios() {
  const ahora = new Date();
  // 1 día antes
  const unDia = new Date(ahora.getTime() + 24 * 3600 * 1000);
  const fechaUnDia = unDia.toISOString().split("T")[0];
  // 3 horas antes
  const tresHoras = new Date(ahora.getTime() + 3 * 3600 * 1000);
  const fechaTres = tresHoras.toISOString().split("T")[0];
  const horaTres = tresHoras.toTimeString().slice(0, 5);

  const citas = await sb(`citas?select=id,fecha,hora,motivo,pacientes(nombre_nino,whatsapp,correo)&estado=in.(No confirmado,Confirmado)`);
  for (const c of citas || []) {
    if (c.fecha === fechaUnDia && !c.recordatorio_dia) {
      if (c.pacientes?.whatsapp) await enviarTexto(c.pacientes.whatsapp, `📅 Hola, te recordamos tu cita en Sonriendo Kids mañana ${c.fecha} a las ${c.hora}. ¡Te esperamos! 💙`);
      if (c.pacientes?.correo) await enviarCorreo(c.pacientes.correo, c);
      await sb(`citas?id=eq.${c.id}`, { method: "PATCH", body: { recordatorio_dia: true } });
    }
    if (c.fecha === fechaTres && c.hora.slice(0,5) === horaTres && !c.recordatorio_hora) {
      if (c.pacientes?.whatsapp) await enviarTexto(c.pacientes.whatsapp, `⏰ ¡Faltan 3 horas para tu cita en Sonriendo Kids (${c.hora})! 💙`);
      await sb(`citas?id=eq.${c.id}`, { method: "PATCH", body: { recordatorio_hora: true } });
    }
  }
  // También tabla proximas_citas (flujo antiguo)
  const prox = await sb(`proximas_citas?select=*&rec_dia_wspp=eq.false`);
  for (const p of prox || []) {
    if (p.fecha === fechaUnDia) {
      if (p.telefono) await enviarTexto(p.telefono, `📅 Recordatorio: cita mañana ${p.fecha} ${p.hora} en Sonriendo Kids 💙`);
      await sb(`proximas_citas?id=eq.${p.id}`, { method: "PATCH", body: { rec_dia_wspp: true, rec_dia_email: true } });
    }
  }
}

async function enviarCorreo(correo, cita) {
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/enviar-correo`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` },
      body: JSON.stringify({ to: correo, asunto: "Recordatorio de cita - Sonriendo Kids", cita }),
    });
  } catch (e) { console.error("correo error:", e.message); }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.url && req.url.includes("/recordatorios")) {
      try { await revisarRecordatorios(); res.status(200).json({ ok: true, recordatorios: "ejecutados" }); }
      catch (e) { res.status(200).json({ ok: false, error: e.message }); }
      return;
    }
    if (req.url && req.url.includes("/diag")) {
      try {
        const r = await rebeca([], "Hola, ¿qué horarios tienen y agendaste?");
        res.status(200).json({ ok: true, gemini: r.slice(0, 300) });
      } catch (e) {
        res.status(200).json({ ok: false, error: e.message });
      }
      return;
    }
    res.status(200).json({ ok: true, bot: "Rebeca · Sonriendo Kids (Vercel)" });
    return;
  }
  if (req.method !== "POST") { res.status(405).json({ error: "Método no permitido" }); return; }

  res.status(200).end(); // ack a Evolution

  try {
    const ev = req.body?.event || req.body?.data?.event;
    if (ev !== "MESSAGES_UPSERT" && ev !== "messages.upsert") { console.log("⏭️ ignorado:", ev); return; }
    const msg = req.body.data;
    if (msg.key?.remoteJid?.includes("@g.us")) return; // ignorar grupos

    const rawRemoteJid = msg.key.remoteJid || "";
    const telefonoLimpio = rawRemoteJid.split("@")[0].replace("@lid", "");
    const telefonoReal = LID_MAP[telefonoLimpio] || telefonoLimpio;
    const telefono = String(telefonoReal).replace(/\D/g, "");
    if (telefono.length <= 9 && !telefono.startsWith("51")) telefono = "51" + telefono;

    console.log(`📥 remoteJid crudo: ${rawRemoteJid} → limpio: ${telefonoLimpio} → real: ${telefonoReal} → final: ${telefono}`);
    const texto = (msg.message?.conversation || msg.message?.extendedTextMessage?.text || "").trim();
    if (!texto) { console.log("📭 sin texto"); return; }

    const hist = memoria.get(telefono) || [];
    hist.push({ role: "user", text: texto });
    console.log(`🤖 llamando rebeca() para ${telefono}...`);

    let respuesta = await rebeca(hist, texto);
    console.log(`✅ rebeca() respondió: ${respuesta.slice(0, 100)}`);
    hist.push({ role: "model", text: respuesta });
    memoria.set(telefono, hist.slice(-20));

    try {
      const posibleJson = respuesta.replace(/```json/g, "").replace(/```/g, "").trim();
      if (posibleJson.startsWith("{") && posibleJson.includes("agendar_cita")) {
        const d = JSON.parse(posibleJson);
        console.log(`📅 agendar_cita detectado:`, d);
        const ocupadas = await horasOcupadas(d.fecha);
        if (ocupadas.includes(d.hora)) {
          respuesta = `😔 Lo siento, las ${d.hora} del ${d.fecha} ya están reservadas. ¿Te ofrezco otra hora?`;
        } else {
          await agendarCita({ nombre_nino: d.nombre_nino, nombre_apoderado: d.nombre_apoderado, whatsapp: telefono, fecha: d.fecha, hora: d.hora, motivo: d.motivo });
          const [y, m, dia] = d.fecha.split("-");
          respuesta = `🎉 ¡Listo! Cita agendada para *${d.nombre_nino}*:\n\n📅 ${dia}/${m}/${y}\n🕐 ${d.hora}\n📍 Sonriendo Kids\n\nLa doctora lo verá en su panel. Si necesitas cambiar algo, escríbeme por aquí 💙`;
          memoria.delete(telefono);
        }
      }
    } catch { console.log("📝 respuesta normal (no JSON agendar)"); }

    console.log(`📤 enviando a ${telefono}...`);
    await enviarTexto(telefono, respuesta);
    console.log(`✅ enviado OK a ${telefono}: ${respuesta.slice(0, 80)}...`);
    revisarRecordatorios().catch(() => {});
  } catch (e) {
    console.error("❌ Webhook error:", e);
  }
}
