// Keep-alive: mantiene Evolution despierto y reconfigura el webhook cada 5 min (cron de Vercel).
const EVOLUTION_URL = process.env.EVOLUTION_URL || "https://evolution-9z0r.onrender.com";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "miclave123";
const INSTANCE = process.env.EVOLUTION_INSTANCE || "sonriendo";
const WEBHOOK_URL = "https://sonriendokids.vercel.app/api/rebeca";

export default async function handler(req, res) {
  try {
    // 1) Ping a Evolution (lo mantiene despierto en Render FREE)
    await fetch(EVOLUTION_URL, { method: "GET" }).catch(() => {});

    // 2) Reconfigurar webhook (por si Render lo borró al reiniciar)
    const r = await fetch(`${EVOLUTION_URL}/webhook/set/${INSTANCE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: EVOLUTION_API_KEY },
      body: JSON.stringify({ url: WEBHOOK_URL, byEvents: true, events: ["MESSAGES_UPSERT"] }),
    });
    const data = await r.json().catch(() => ({}));

    // 3) Ping al bot (lo mantiene caliente en Vercel)
    await fetch(WEBHOOK_URL, { method: "GET" }).catch(() => {});

    res.status(200).json({ ok: true, webhook: data, ts: Date.now() });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
