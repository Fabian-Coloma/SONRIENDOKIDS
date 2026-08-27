import express from "express";
import "dotenv/config";
import { rebeca, horasOcupadas, agendarCita } from "./ia.js";
import { enviarTexto, configurarWebhook, asegurarInstancia } from "./evolution.js";
import { agregar, getHistorial, limpiar } from "./memoria.js";
import { revisarRecordatorios } from "./recordatorios.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true, bot: "Rebeca · Sonriendo Kids" }));

app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // responder rápido a Evolution

  try {
    if (req.body?.event !== "messages.upsert") return;
    const msg = req.body.data;
    if (msg.key?.fromMe || msg.key?.remoteJid?.includes("@g.us")) return;

    const telefono = msg.key.remoteJid.split("@")[0];
    const texto = (msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text || "").trim();
    if (!texto) return;

    console.log(`📩 ${telefono}: ${texto}`);
    agregar(telefono, "user", texto);

    let respuesta = await rebeca(getHistorial(telefono), texto);

    // ¿Rebeca pidió agendar? Validamos y ejecutamos en TU tabla citas
    try {
      const posibleJson = respuesta.replace(/```json/g, "").replace(/```/g, "").trim();
      if (posibleJson.startsWith("{") && posibleJson.includes("agendar_cita")) {
        const d = JSON.parse(posibleJson);

        // Validar que la hora esté libre ANTES de crear
        const ocupadas = await horasOcupadas(d.fecha);
        if (ocupadas.includes(d.hora)) {
          respuesta = `😔 Lo siento, las ${d.hora} del ${d.fecha} ya están reservadas. ¿Te ofrezco otra hora?`;
        } else {
          await agendarCita({
            nombre_nino: d.nombre_nino,
            nombre_apoderado: d.nombre_apoderado,
            whatsapp: telefono,
            fecha: d.fecha,
            hora: d.hora,
            motivo: d.motivo,
          });
          const [y, m, dia] = d.fecha.split("-");
          respuesta = `🎉 ¡Listo! Cita agendada para *${d.nombre_nino}*:\n\n📅 ${dia}/${m}/${y}\n🕐 ${d.hora}\n📍 Sonriendo Kids\n\nLa doctora lo verá en su panel. Si necesitas cambiar algo, escríbeme por aquí 💙`;
          limpiar(telefono);
        }
      }
    } catch { /* era texto normal */ }

    agregar(telefono, "model", respuesta);
    await enviarTexto(telefono, respuesta);
    console.log(`📤 → ${telefono}: ${respuesta.slice(0, 80)}...`);
  } catch (e) {
    console.error("Webhook error:", e);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Rebeca escuchando en :${PORT}`);
  asegurarInstancia();   // crea/reconecta la instancia si Evolution la perdió al reiniciar
  configurarWebhook();   // re-arma el webhook por si Evolution lo perdió al reiniciar
});

// 🔄 Keep-alive: evita que Render FREE duerma el bot y Evolution tras 15 min de inactividad.
// Se hace ping a sí mismo y a Evolution cada 10 minutos para que siempre estén "despiertos".
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
const EVOLUTION_URL = process.env.EVOLUTION_URL || "http://localhost:8080";
const KEEPALIVE_MS = 10 * 60 * 1000; // 10 minutos

setInterval(async () => {
  try {
    await fetch(SELF_URL).catch(() => {});
    await fetch(EVOLUTION_URL).catch(() => {});
    console.log("💓 keep-alive ping enviado");
  } catch (e) {
    console.error("keep-alive error:", e.message);
  }
}, KEEPALIVE_MS);

// 🔔 Recordatorios: revisa citas 1 día y 3 horas antes, por WhatsApp y correo.
// Se ejecuta al arrancar y luego cada hora.
const RECORDATORIOS_MS = 60 * 60 * 1000; // 1 hora
revisarRecordatorios().catch((e) => console.error("recordatorios iniciales:", e.message));
setInterval(() => {
  revisarRecordatorios().catch((e) => console.error("recordatorios:", e.message));
}, RECORDATORIOS_MS);

// Ping inmediato al arrancar para despertar Evolution de una vez
fetch(EVOLUTION_URL).catch(() => {});
