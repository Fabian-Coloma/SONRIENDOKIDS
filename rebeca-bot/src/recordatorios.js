// recordatorios.js — Envía recordatorios por WhatsApp: 1 día antes y 3 horas antes
import { sb } from "./ia.js";
import { enviarTexto } from "./evolution.js";
import "dotenv/config";

const CLINICA = "Sonriendo Kids";

/** Envía correo vía Edge Function enviar-correo (a la doctora o al apoderado) */
export async function enviarCorreo(to, subject, html) {
  if (!to) return;
  try {
    await fetch(`${process.env.SUPABASE_URL}/functions/v1/enviar-correo`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}` },
      body: JSON.stringify({ to, subject, html }),
    });
  } catch (e) { console.error("❌ correo:", e.message); }
}

async function emailApoderado(paciente_id) {
  const p = await sb(`pacientes?select=email&id=eq.${paciente_id}`).then(r => r?.[0]);
  return p?.email || null;
}

/** Ejecuta la revisión de recordatorios pendientes */
export async function revisarRecordatorios() {
  try {
    await recordatorioUnDiaAntes();
    await recordatorioTresHoras();
    await recordatoriosProximasCitas(); // próximas citas agendadas por la doctora
  } catch (e) {
    console.error("❌ Error en recordatorios:", e.message);
  }
}

/** Recordatorios de PRÓXIMAS CITAS (agendadas por la doctora):
 *  1 semana antes, 1 día antes y 3 horas antes — por WSPP y/o correo */
async function recordatoriosProximasCitas() {
  const ahora = Date.now();
  const desde = new Date(ahora).toISOString().slice(0, 10);
  const hasta = new Date(ahora + 9 * 24 * 3600e3).toISOString().slice(0, 10);

  const citas = await sb(
    `proximas_citas?select=*,pacientes(id,nombre_nino,nombre_apoderado,email,whatsapp)&fecha=gte.${desde}&fecha=lte.${hasta}`
  );
  if (!citas) return;

  for (const c of citas) {
    const tsCita = new Date(`${c.fecha}T${c.hora.slice(0, 5)}:00`).getTime();
    const tel = normalizar(c.pacientes?.whatsapp);
    const email = c.pacientes?.email;
    const nombreNino = c.pacientes?.nombre_nino || '';
    const [y, m, d] = c.fecha.split('-');
    const fechaTxt = `${d}/${m}/${y}`;
    const horaTxt = c.hora.slice(0, 5);
    const updates = {};

    const enviarRecordatorio = async (tipo) => {
      const textos = {
        semana: `🔔 ¡Hola! Te recordamos que ${nombreNino} tiene una cita en ${CLINICA} el 📅 ${fechaTxt} a las 🕐 ${horaTxt}. ¡Te esperamos! 💙`,
        dia: `⏰ ¡Recuerda! Mañana a las 🕐 ${horaTxt} tienes la cita de ${nombreNino} en ${CLINICA}. Nos vemos pronto 💙`,
        hora: `🕐 ¡Hoy a las ${horaTxt} es la cita de ${nombreNino} en ${CLINICA}! Te esperamos en unos minutos 😊🦷`,
      };
      const asuntos = {
        semana: `🔔 Recordatorio: cita el ${fechaTxt} — Sonriendo Kids`,
        dia: `⏰ Mañana: cita de ${nombreNino} a las ${horaTxt} — Sonriendo Kids`,
        hora: `🕐 Hoy ${horaTxt}: cita de ${nombreNino} — Sonriendo Kids`,
      };

      if (tel && (tipo === 'hora' ? c.notificar_whatsapp : true)) {
        try { await enviarTexto(tel, textos[tipo]); } catch {}
      }
      if (email && ((tipo === 'semana' && c.notificar_email) || (tipo === 'dia' && c.notificar_email) || (tipo === 'hora' && c.notificar_email))) {
        await enviarCorreo(email, asuntos[tipo], `<h2>${textos[tipo]}</h2><p>Detalles: ${fechaTxt} · ${horaTxt}${c.motivo ? ' · ' + c.motivo : ''}</p>`);
      }
    };

    // 1 SEMANA ANTES (entre 6.5 y 7.5 días)
    if (!c.rec_semana_wspp && !c.rec_semana_email &&
        tsCita > ahora + 6.5*24*3600e3 && tsCita < ahora + 7.5*24*3600e3) {
      await enviarRecordatorio('semana');
      updates.rec_semana_wspp = true; updates.rec_semana_email = true;
    }
    // 1 DÍA ANTES (entre 22 y 26 horas)
    if (!c.rec_dia_wspp && !c.rec_dia_email &&
        tsCita > ahora + 22*3600e3 && tsCita < ahora + 26*3600e3) {
      await enviarRecordatorio('dia');
      updates.rec_dia_wspp = true; updates.rec_dia_email = true;
    }
    // 3 HORAS ANTES (entre 2 y 4 horas)
    if (!c.rec_hora_wspp && !c.rec_hora_email &&
        tsCita > ahora + 2*3600e3 && tsCita < ahora + 4*3600e3) {
      await enviarRecordatorio('hora');
      updates.rec_hora_wspp = true; updates.rec_hora_email = true;
    }

    if (Object.keys(updates).length) {
      await sb(`proximas_citas?id=eq.${c.id}`, { method: "PATCH", body: updates });
      console.log(`🔔 Recordatorio (${Object.keys(updates)[0]}) → ${tel || email}`);
    }
  }
}


async function recordatorioUnDiaAntes() {
  // Citas de MAÑANA sin recordatorio diario enviado
  const manana = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const citas = await sb(
    `citas?select=id,fecha,hora,motivo,pacientes(nombre_nino,whatsapp)&fecha=eq.${manana}&estado=in.(No confirmado,Confirmado)&recordatorio_dia=eq.false`
  );
  for (const c of citas || []) {
    const tel = normalizar(c.pacientes?.whatsapp);
    if (!tel) continue;
    const [y, m, d] = c.fecha.split("-");
    await enviarTexto(tel,
      `🔔 ¡Hola! *Recuerda que tienes una cita MAÑANA* en ${CLINICA}:\n\n` +
      `📅 ${d}/${m}/${y}\n🕐 ${c.hora.slice(0, 5)}\n` +
      (c.motivo ? `🦷 Motivo: ${c.motivo}\n` : "") +
      `\nSi necesitas reprogramar, escríbenos por aquí 💙`);
    await sb(`citas?id=eq.${c.id}`, { method: "PATCH", body: { recordatorio_dia: true } });
    console.log(`🔔 Recordatorio 1 día enviado → ${tel}`);
  }
}

async function recordatorioTresHoras() {
  // Citas cuya fecha+hora estén entre 2 y 4 horas desde ahora, sin recordatorio de hora enviado
  const ahora = Date.now();
  const desde = new Date(ahora + 2 * 60 * 60 * 1000).toISOString();
  const hasta = new Date(ahora + 4 * 60 * 60 * 1000).toISOString();
  // PostgREST: filtrar por rango de fecha y luego afinar hora en JS
  const hoy = new Date(ahora).toISOString().slice(0, 10);
  const pasadoManana = new Date(ahora + 48 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const citas = await sb(
    `citas?select=id,fecha,hora,motivo,pacientes(nombre_nino,whatsapp)&fecha=gte.${hoy}&fecha=lte.${pasadoManana}&estado=in.(No confirmado,Confirmado)&recordatorio_hora=eq.false`
  );

  for (const c of citas || []) {
    const tsCita = new Date(`${c.fecha}T${c.hora.slice(0, 5)}:00`).getTime();
    if (tsCita < ahora + 2 * 3600e3 || tsCita > ahora + 4 * 3600e3) continue;

    const tel = normalizar(c.pacientes?.whatsapp);
    if (!tel) continue;
    await enviarTexto(tel,
      `⏰ ¡Hola! *Recuerda que HOY a las ${c.hora.slice(0, 5)} tienes una cita programada* en ${CLINICA}.\n\n` +
      `🦷 ${c.pacientes?.nombre_nino || ""}\n` +
      (c.motivo ? `Motivo: ${c.motivo}\n` : "") +
      `\nTe esperamos 💙`);
    await sb(`citas?id=eq.${c.id}`, { method: "PATCH", body: { recordatorio_hora: true } });
    console.log(`⏰ Recordatorio 3 horas enviado → ${tel}`);
  }
}

function normalizar(tel) {
  if (!tel) return null;
  let t = String(tel).replace(/\D/g, "");
  if (!t.startsWith("51") && t.length <= 9) t = "51" + t;
  return t;
}
