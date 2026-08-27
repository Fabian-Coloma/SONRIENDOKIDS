import "dotenv/config";

const BASE = process.env.EVOLUTION_URL || "http://localhost:8080";
const KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE = process.env.EVOLUTION_INSTANCE || "sonriendo";

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", apikey: KEY },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Evolution API ${res.status}: ${await res.text()}`);
  return res.json().catch(() => ({}));
}

export async function enviarTexto(telefono, texto) {
  await api("POST", `/message/sendText/${INSTANCE}`, {
    number: telefono,
    text: texto,
    delay: 1200,          // pausa humanizada
    linkPreview: false,
  });
}

// Configura el webhook por instancia apuntando al bot (idempotente: se re-arma si Evolution lo perdió al reiniciar)
export async function configurarWebhook() {
  const botUrl = process.env.BOT_URL || process.env.RENDER_EXTERNAL_URL;
  if (!botUrl) return;
  try {
    // Formato Evolution v1.8.2: body plano (sin envolver en "webhook")
    await api("POST", `/webhook/set/${INSTANCE}`, {
      url: `${botUrl}/webhook`,
      webhook_by_events: false,
      events: ["MESSAGES_UPSERT"],
    });
    console.log("🔗 Webhook de Evolution configurado →", `${botUrl}/webhook`);
  } catch (e) {
    console.error("No se pudo configurar webhook:", e.message);
  }
}

// Asegura que la instancia exista y esté conectada. Si Evolution la perdió al reiniciar (común en Render FREE),
// la crea y la deja lista para escanear, o la reconecta si ya existe pero no está "open".
export async function asegurarInstancia() {
  try {
    const estado = await api("GET", `/instance/connectionState/${INSTANCE}`).catch(() => null);
    const state = estado?.instance?.state;
    if (state === "open") {
      console.log("✅ Instancia ya conectada");
      return;
    }
    // Si no existe o no está open, la creamos (si hace falta) y dejamos lista para conectar
    const lista = await api("GET", `/instance/fetchInstances`).catch(() => []);
    const existe = Array.isArray(lista) && lista.some((i) => i.instance?.instanceName === INSTANCE);
    if (!existe) {
      console.log("🔧 Creando instancia faltante:", INSTANCE);
      await api("POST", `/instance/create`, {
        instanceName: INSTANCE,
        qrcode: true,
        integration: "WHATSAPP-BAILEYS",
      }).catch(() => {});
    } else if (state === "connecting" || state === "close") {
      await api("PUT", `/instance/restart/${INSTANCE}`).catch(() => {});
    }
    console.log("⚠️ Instancia no está OPEN. Estado actual:", state || "desconocido", "- puede requerir re-escanear QR.");
  } catch (e) {
    console.error("asegurarInstancia error:", e.message);
  }
}
