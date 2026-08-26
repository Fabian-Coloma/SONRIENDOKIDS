import express from "express";
import "dotenv/config";
import { rebeca, horasOcupadas, agendarCita, notificarDoctora, citasProximas } from "./ia.js";
import { enviarTexto } from "./evolution.js";
import { agregar, getHistorial, limpiar } from "./memoria.js";
import { revisarRecordatorios } from "./recordatorios.js";
import { obtenerNumeroPorLid, guardarLid, actualizarLid } from "./lidStore.js";

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
    const texto = (msg.message?.conversation ||
                   msg.message?.extendedTextMessage?.text || "").trim();
    if (!texto) return;

    // ---- Resolución de LID → número real ----
    let modoVerificacion = false; // true mientras le pedimos su número al usuario

    if (esLid) {
      // 1. Mapa estático del .env (compatibilidad)
      let mapaLid = {};
      try { mapaLid = JSON.parse(process.env.LID_MAP || "{}"); } catch {}
      let real = mapaLid[telefono];

      // 2. Almacén persistente en Supabase (auto-aprendido)
      if (!real) real = await obtenerNumeroPorLid(telefono);

      if (real) {
        telefono = real;
      } else {
        // LID nuevo: pedir el número para registrarlo
        const historial = getHistorial(telefono);
        const ultimoBot = [...historial].reverse().find(m => m.role === "model");

        // ¿Ya le pedimos el número y esto que mandó parece un teléfono?
        const esTelefono = /^(\+?51)?9\d{8}$|^9\d{8}$/.test(texto.replace(/\s|-/g, ""));
        if (ultimoBot && ultimoBot.text.includes("confirmar tu número")) {
          if (esTelefono) {
            let num = texto.replace(/\D/g, "");
            if (!num.startsWith("51")) num = "51" + num;
            await guardarLid(telefono, num);
            agregar(telefono, "user", texto);
            console.log(`✅ LID ${telefono} registrado → ${num}`);
            await enviarTexto(telefono,
              `🎉 ¡Gracias! Tu número quedó registrado ✅\n\nAhora sí, ¿en qué te puedo ayudar?\n\n1️⃣ Agendar una cita\n2️⃣ Preguntarme horarios o servicios 😊`);
          } else {
            await enviarTexto(telefono,
              `😊 Para poder responderte necesito confirmar tu número de celular.\n\nEscríbelo aquí (ej: 9 digitos, ej: 987654321).`);
          }
          return;
        }

        // Primera vez: pedir el número
        console.log(`⚠️ LID nuevo ${telefono} → pidiendo número`);
        await enviarTexto(telefono,
          `👋 ¡Hola! Soy Rebeca de *Sonriendo Kids* 🦷\n\nAntes de empezar, ¿me confirmas tu número de celular? (escríbelo aquí)`);
        return;
      }
    }

    console.log(`📩 ${telefono}: ${texto}`);
    agregar(telefono, "user", texto);

    let respuesta = await rebeca(getHistorial(telefono), texto);

    // ¿Rebeca pidió agendar? Validamos y ejecutamos en TU tabla citas
    try {
      const posibleJson = respuesta.replace(/```json/g, "").replace(/```/g, "").trim();
      if (posibleJson.startsWith("{") && posibleJson.includes("agendar_cita")) {
        const d = JSON.parse(posibleJson);

        // Validar que la hora esté libre ANTES de crear + horario permitido
        const fechaCita = new Date(d.fecha + 'T12:00:00');
        const diaSemana = fechaCita.getUTCDay(); // 2=mar, 3=mié
        const horaNum = parseInt(d.hora.slice(0, 2), 10);
        const diaValido = diaSemana === 2 || diaSemana === 3;
        const horaValida = horaNum >= 11 && horaNum <= 19 && d.hora.slice(3, 5) === '00';
        
        if (!diaValido || !horaValida) {
          respuesta = `📅 Por ahora solo atendemos MARTES y MIÉRCOLES de 11:00 a 20:00, con citas cada hora en punto. ¿Te ofrezco un día y hora dentro de ese horario?`;
        } else {
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
