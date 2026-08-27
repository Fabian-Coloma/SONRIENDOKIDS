// Memoria de conversación por número (últimos 10 turnos)
// Suficiente para el flujo de agendamiento. Para escala, mover a Supabase.
const memoria = new Map();

export function getHistorial(telefono) {
  if (!memoria.has(telefono)) memoria.set(telefono, []);
  return memoria.get(telefono);
}

export function agregar(telefono, role, text) {
  const h = getHistorial(telefono);
  h.push({ role, text });
  while (h.length > 10) h.shift();
}

export function limpiar(telefono) {
  memoria.delete(telefono);
}
