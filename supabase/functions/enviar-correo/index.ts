import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { pregunta } = await req.json()

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // 1. Obtenemos la fecha de hoy para filtrar
    const hoy = new Date().toISOString().split('T')[0];

    // 2. Traemos 50 citas desde hoy en adelante
    const { data: proximasCitas, error } = await supabase
      .from('citas')
      .select(`fecha, hora, motivo, estado, pacientes ( nombre_nino )`)
      .gte('fecha', hoy) 
      .order('fecha', { ascending: true })
      .limit(50) 

    if (error) throw error;

    // 3. Reglas estrictas de formato
    const systemPrompt = `Eres un asistente virtual profesional, empático y muy útil para el consultorio odontopediátrico 'Sonriendo Kids'.
    Tu jefa es la Doctora Patricia. Respóndele de manera clara, resumida y directa.
    - Para llenar datos: {"comando": "llenar_formulario", "campo": "nombre_del_campo", "valor": "informacion_a_escribir"}
    
    Aquí tienes la información en tiempo real de las próximas citas en tu base de datos:
    ${JSON.stringify(proximasCitas)}
    
    REGLAS DE FORMATO OBLIGATORIAS:
    - NO uses Markdown. NO uses asteriscos (**) ni numerales (###). Escribe en texto plano.
    - Usa saltos de línea normales para separar cada cita de la lista.
    - Usa guiones (-) para las viñetas.
    
    Si te pregunta por citas o pacientes, revisa los datos. Si no encuentras los datos, dile amablemente que no tienes esa información.`;

    else if (datosJson.comando === 'llenar_formulario') {
        respuestaIA = `✍️ Anotado en ${datosJson.campo}: "${datosJson.valor}"`;
        comandoEjecutado = datosJson.comando;
        // Aquí pasamos los datos al frontend
      }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { 
          parts: [{ text: systemPrompt }]
        },
        contents: [{
          parts: [{ text: pregunta }]
        }]
      }),
    })

    const aiData = await geminiResponse.json()

    if (aiData.error) {
      throw new Error(aiData.error.message);
    }
    
    const respuestaIA = aiData.candidates[0].content.parts[0].text

    return new Response(JSON.stringify({ respuesta: respuestaIA }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})