// recordatorios.js — Envía recordatorios por WhatsApp: 1 día antes y 3 horas antes
import { sb } from "./ia.js";
import { enviarTexto } from "./evolution.js";

const CLINICA = "Sonriendo Kids";

/** Ejecuta la revisión de recordatorios pendientes */
export async function revisarRecordatorios() {
  try {
    await recordatorioUnDiaAntes();
    await recordatorioTresHoras();
  } catch (e) {
    console.error("❌ Error en recordatorios:", e.message);
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
