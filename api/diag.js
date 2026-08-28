// Diagnóstico: ejecuta el flujo real de Rebeca y devuelve evidencia en JSON.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EVOLUTION_URL = process.env.EVOLUTION_URL || "https://evolution-9z0r.onrender.com";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "bxvo23ulxh7l3ohxyu348";
const INSTANCE = process.env.EVOLUTION_INSTANCE || "sonriendokids";

async function sb(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`, "Content-Type": "application/json", Prefer: options.prefer || "return=representation" },
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export default async function handler(req, res) {
  const out = {};
  // 1) Gemini
  try {
    const modelos = process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let ok = null;
    for (const m of modelos) {
      try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_API_KEY}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Responde breve: ¿Qué horarios tienen Sonriendo Kids?" }] }] }),
        });
        const d = await r.json();
        if (d.error) throw new Error(d.error.message);
        ok = { modelo: m, texto: d.candidates[0].content.parts[0].text.slice(0, 200) };
        break;
      } catch (e) { ok = { errorModelo: m, msg: e.message }; }
    }
    out.gemini = ok;
  } catch (e) { out.gemini = { fatal: e.message }; }

  // 2) Supabase
  try {
    const c = await sb(`citas?select=id&limit=1`);
    out.supabase = { ok: true, filas: (c || []).length };
  } catch (e) { out.supabase = { error: e.message }; }

  // 3) Evolution: probar 3 formatos y reportar cuál funciona
  const tel = "51937685360";
  const formatos = {
    A_plano: { number: tel, text: "prueba", delay: 1000 },
    B_wrapper: { textMessage: { number: tel, text: "prueba", delay: 1000 } },
    C_hibrido: { number: tel, textMessage: { text: "prueba", delay: 1000 } },
  };
  const resultados = {};
  for (const [nombre, body] of Object.entries(formatos)) {
    try {
      const r = await fetch(`${EVOLUTION_URL}/message/sendText/${INSTANCE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: EVOLUTION_API_KEY },
        body: JSON.stringify(body),
      });
      const tb = await r.text();
      resultados[nombre] = { status: r.status, body: tb.slice(0, 150) };
    } catch (e) { resultados[nombre] = { error: e.message }; }
  }
  out.evolution = resultados;

  res.status(200).json(out);
}
