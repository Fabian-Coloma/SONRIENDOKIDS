import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Configuración de CORS para permitir peticiones desde tu frontend en React (Vite)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  // Manejo de la petición "preflight" de los navegadores
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Obtenemos la API Key desde los secretos de Supabase (la configuraremos en el siguiente paso)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    // Extraemos los datos que nos enviará tu frontend
    const { to, subject, html } = await req.json();
    // Llamada a la API de Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sonriendo Kids <onboarding@resend.dev>',
        to: [
          to
        ],
        subject: subject,
        html: html
      })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 400
    });
  }
});
