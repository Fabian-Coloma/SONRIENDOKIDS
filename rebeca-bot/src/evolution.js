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
    textMessage: { text: texto },
    delay: 1200,          // pausa humanizada
    linkPreview: false,
  });
}
