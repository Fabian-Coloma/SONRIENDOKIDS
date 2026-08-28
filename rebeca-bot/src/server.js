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
let ultimoQR = null;
let ultimoBody = null;

app.get("/", (_req, res) => res.json({ ok: true, bot: "Rebeca · Sonriendo Kids" }));
app.get("/ultima", (_req, res) => res.json({ ok: true, ultimaRespuesta, ultimoError, ultimoRemoteJid, ultimoLidCrudo, ultimoQR, ultimoBody }));
app.get("/qr", (_req, res) => res.json({ ok: true, qr: ultimoQR }));

app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // responder rápido a Evolution

  try {
    ultimoBody = JSON.stringify(req.body).slice(0, 500); // diagnóstico: guardar body crudo
    const ev = req.body?.event || req.body?.data?.event;
    const msg = req.body.data;
    // Capturar QR enviado por Evolution v2 (evento QRCODE_UPDATED)
    if (ev === "QRCODE_UPDATED" || ev === "qrcode.updated" || req.body?.event === "QRCODE_UPDATED") {
      const b64 =
        req.body?.data?.qrcode?.base64 ||
        req.body?.data?.base64 ||
        req.body?.qrcode?.base64 ||
        req.body?.base64 ||
        (typeof req.body?.data === "string" ? req.body.data : null);
      if (b64) {
        ultimoQR = b64.startsWith("data:image") ? b64 : `data:image/png;base64,${b64}`;
        console.log("🔳 QR recibido, listo en /qr");
      } else {
        console.log("🔳 QRCODE_UPDATED sin base64. Body keys:", Object.keys(req.body || {}));
      }
      return;
    }
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

    // Evolution v2 entrega remoteJid como número real (51937685350@s.whatsapp.net)
    let telefono = msg.key.remoteJid.split("@")[0];
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
