import express from "express";
import "dotenv/config";
import { rebeca, horasOcupadas, agendarCita } from "./ia.js";
import { enviarTexto, configurarWebhook, asegurarInstancia } from "./evolution.js";
import { agregar, getHistorial, limpiar } from "./memoria.js";
import { revisarRecordatorios } from "./recordatorios.js";

const app = express();
app.use(express.json());

// Endpoint de diagnóstico: muestra la última respuesta generada por Rebeca (para verificar que funciona)
let ultimaRespuesta = null;
let ultimoError = null;
let ultimoRemoteJid = null;
let ultimoLidCrudo = null;

app.get("/", (_req, res) => res.json({ ok: true, bot: "Rebeca · Sonriendo Kids" }));
app.get("/ultima", (_req, res) => res.json({ ok: true, ultimaRespuesta, ultimoError, ultimoRemoteJid, ultimoLidCrudo }));

app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // responder rápido a Evolution

  try {
    const ev = req.body?.event || req.body?.data?.event;
    const msg = req.body.data;
    ultimoRemoteJid = msg?.key?.remoteJid;
    ultimoLidCrudo = msg?.key?.remoteJid?.split("@")[0];
    console.log("🔔 Webhook recibido. event=", ev, "| remoteJid=", msg?.key?.remoteJid, "| fromMe=", msg?.key?.fromMe);
    // Aceptar cualquier evento que traiga un mensaje de texto (más tolerante a versiones de Evolution)
    const tieneTexto = msg?.message?.conversation || msg?.message?.extendedTextMessage?.text;
    if (!tieneTexto) {
      console.log("⏭️ Sin texto utilizable, ignorado.");
      return;
    }
    if (msg.key?.remoteJid?.includes("@g.us")) return; // ignorar grupos

    // Evolution v1.8.2 entrega remoteJid como LID (12345@lid) que NO es enviabl.
    // Convertimos con LID_MAP (env) cuando aplique.
    const lidMap = {
      "83421837680836": "51937685350",   // tu personal 51 937 685 350
      "250078983893027": "51927784729",  // amiga 51 927 784 729
    };
    try { Object.assign(lidMap, JSON.parse(process.env.LID_MAP || "{}")); } catch {}
    let telefono = msg.key.remoteJid.split("@")[0]; // ej: "83421837680836" o "51927784729"
    // Si es un LID (clave en el mapa), convertirlo a número real
    const lidLimpio = telefono.replace("@lid", "");
    if (lidMap[lidLimpio]) {
      telefono = lidMap[lidLimpio];
    }
    telefono = String(telefono).replace(/\D/g, "");
    if (telefono.length <= 9 && !telefono.startsWith("51")) telefono = "51" + telefono;

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
    ultimaRespuesta = { telefono, texto, respuesta: respuesta.slice(0, 200), hora: new Date().toISOString() };
    await enviarTexto(telefono, respuesta);
    console.log(`📤 → ${telefono}: ${respuesta.slice(0, 80)}...`);
  } catch (e) {
    ultimoError = { mensaje: e.message, hora: new Date().toISOString() };
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
// Cada 5 min: ping a sí mismo, a Evolution, y RE-ARMA el webhook (Render FREE borra el webhook al reiniciar).
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
const EVOLUTION_URL = process.env.EVOLUTION_URL || "http://localhost:8080";
const KEEPALIVE_MS = 5 * 60 * 1000; // 5 minutos

setInterval(async () => {
  try {
    await fetch(SELF_URL).catch(() => {});
    await fetch(EVOLUTION_URL).catch(() => {});
    configurarWebhook(); // re-arma el webhook por si Evolution lo perdió
    console.log("💓 keep-alive + webhook rearmado");
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
