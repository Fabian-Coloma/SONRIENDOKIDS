import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 1. Esto nos dirá en la consola si Vercel las está leyendo o no
console.log("Vercel leyó la URL:", supabaseUrl);
console.log("Vercel leyó la Key:", supabaseAnonKey ? "Sí (oculta)" : "UNDEFINED");

// 2. Le ponemos un 'salvavidas' (texto falso) por si llegan vacías, para que la página NO explote y podamos verla
const urlSegura = supabaseUrl || 'https://URL-FALSA-PARA-EVITAR-PANTALLA-BLANCA.supabase.co';
const keySegura = supabaseAnonKey || 'CLAVE-FALSA';

export const supabase = createClient(urlSegura, keySegura);