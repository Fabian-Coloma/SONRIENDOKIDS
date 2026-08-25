import express from "express";
import "dotenv/config";
import { rebeca, horasOcupadas, agendarCita, notificarDoctora } from "./ia.js";
import { enviarTexto } from "./evolution.js";
import { agregar, getHistorial, limpiar } from "./memoria.js";
import { revisarRecordatorios } from "./recordatorios.js";

// Revisar recordatorios cada 10 minutos (1 día antes y 3 horas antes)
setInterval(revisarRecordatorios, 10 * 60 * 1000);
setTimeout(revisarRecordatorios, 15 * 1000); // primera revisión al arrancar

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true, bot: "Rebeca · Sonriendo Kids" }));

app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // responder rápido a Evolution

  try {
    if (req.body?.event !== "messages.upsert") return;
    const msg = req.body.data;
    if (msg.key?.fromMe || msg.key?.remoteJid?.includes("@g.us")) return;

    let telefono = msg.key.remoteJid.split("@")[0];
    const esLid = msg.key.remoteJid.endsWith("@lid");
    // Perú: si llega sin código de país, agregarlo
    if (!esLid && !telefono.startsWith("51") && telefono.length <= 9) telefono = "51" + telefono;
    // Mapa LID → número real (los LIDs son internos de WhatsApp y no se pueden responder)
    let mapaLid = {};
    try { mapaLid = JSON.parse(process.env.LID_MAP || "{}"); } catch {}
    if (esLid) {
      if (mapaLid[telefono]) {
        telefono = mapaLid[telefono];
      } else {
        console.log(`⚠️ LID desconocido ${telefono} — no se puede responder. Agrégalo a LID_MAP en .env`);
        return;
      }
    }
    const texto = (msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text || "").trim();
    if (!texto) return;

    console.log(`📩 ${telefono}: ${texto}`);
    console.log("🔍 payload:", JSON.stringify(req.body.data).slice(0, 1200));
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
            email_apoderado: d.email_apoderado,
            whatsapp: telefono,
            fecha: d.fecha,
            hora: d.hora,
            motivo: d.motivo,
          });
          // Avisar a la doctora por correo (sin bloquear la respuesta)
          notificarDoctora({ ...d, whatsapp: telefono });
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
app.listen(PORT, () => console.log(`✅ Rebeca escuchando en :${PORT}`));
