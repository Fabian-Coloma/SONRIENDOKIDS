// lidStore.js — Almacén persistente de LID → número real (tabla lid_map en Supabase)
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function sb(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
    },
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function obtenerNumeroPorLid(lid) {
  const r = await sb(`lid_map?select=numero&lid=eq.${lid}`).then((r) => r?.[0]);
  return r?.numero || null;
}

export async function guardarLid(lid, numero) {
  await sb("lid_map", { method: "POST", body: { lid, numero } });
}

export async function actualizarLid(lid, numero) {
  await sb(`lid_map?lid=eq.${lid}`, { method: "PATCH", body: { numero } });
}
