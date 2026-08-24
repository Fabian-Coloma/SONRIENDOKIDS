// Bot WhatsApp "Rebeca" para Sonriendo Kids
// Recibe mensajes (Evolution API) → Gemini decide → lee/escribe en TUS tablas
// Tablas usadas (las que YA tienes): pacientes, citas
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;              // ej: https://xxxx.supabase.co
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

export async function citasProximas() {
  const hoy = new Date().toISOString().split("T")[0];
  return sb(`citas?select=id,fecha,hora,motivo,estado,pacientes(nombre_nino)&fecha=gte.${hoy}&order=fecha.asc&limit=50`);
}

export async function horasOcupadas(fecha) {
  const rows = await sb(`citas?select=hora&fecha=eq.${fecha}&estado=in.(No confirmado,Confirmado)`);
  return (rows || []).map((r) => r.hora.slice(0, 5));
}

/** Crea (o reutiliza) al paciente por whatsapp e inserta la cita */
export async function agendarCita({ nombre_nino, nombre_apoderado, whatsapp, fecha, hora, motivo }) {
  let paciente = await sb(`pacientes?select=id&whatsapp=eq.${whatsapp}`, {}).then((r) => r?.[0]);
  if (!paciente) {
    paciente = await sb("pacientes", {
      method: "POST",
      body: [{ nombre_nino, nombre_apoderado, whatsapp }],
    }).then((r) => r?.[0]);
  }
  return sb("citas", {
    method: "POST",
    body: { paciente_id: paciente.id, fecha, hora, motivo, estado: "No confirmado" },
  });
}

/** Pregunta a Rebeca (Gemini). Devuelve texto o comando JSON */
export async function rebeca(historial, mensaje) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const systemPrompt = `Eres Rebeca, la asistente virtual del consultorio odontopediátrico 'Sonriendo Kids', atendiendo por WhatsApp a padres de familia.

Citas próximas: ${JSON.stringify(await citasProximas())}

PUEDES responder preguntas de: horarios de atención (Lun-Sáb 9:00-13:00 y 14:00-17:30), servicios (odontopediatría, ortopedia/ortodoncia, sedaciones), sedes, precios ("escríbenos para cotizar" si no sabes), y AGENDAR citas.

PARA CREAR UNA CITA necesitas reunir SIEMPRE estos 5 datos preguntando de a uno:
nombre del niño, nombre del apoderado, fecha (AAAA-MM-DD), hora (HH:MM, media hora en punto o y media), motivo.
Cuando ya tengas los 5, responde SOLO este JSON sin texto adicional:
{"comando":"agendar_cita","nombre_nino":"...","nombre_apoderado":"...","fecha":"AAAA-MM-DD","hora":"HH:MM","motivo":"..."}

Horas ocupadas se validan después; no inventes disponibilidad.

Si NO hay una acción que ejecutar, responde en texto natural, breve, cálido y con emojis, como secretaria amable. Nunca uses markdown complejo (WhatsApp no lo renderiza bien salvo *negritas*).`;

  const contents = [
    ...historial.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: "user", parts: [{ text: mensaje }] },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt }] }, contents }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates[0].content.parts[0].text.trim();
}
