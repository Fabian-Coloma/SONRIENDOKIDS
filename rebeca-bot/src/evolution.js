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
    await api("POST", `/webhook/set/${INSTANCE}`, {
      webhook: {
        enabled: true,
        url: `${botUrl}/webhook`,
        events: ["MESSAGES_UPSERT"],
        webhook_by_events: false,
      },
    });
    console.log("🔗 Webhook de Evolution configurado →", `${botUrl}/webhook`);
  } catch (e) {
    console.error("No se pudo configurar webhook:", e.message);
  }
}
