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
    const hoy = new Date().toISOString().split('T')[0];

    // Traemos las citas
    const { data: proximasCitas } = await supabase
      .from('citas')
      .select(`id, fecha, hora, motivo, estado, pacientes ( nombre_nino )`)
      .gte('fecha', hoy) 
      .order('fecha', { ascending: true })
      .limit(50) 

    // EL CEREBRO DE REBECA CON TODOS LOS CAMPOS MAPEADOS
    const systemPrompt = `Eres Rebeca, la asistente virtual proactiva del consultorio odontopediátrico 'Sonriendo Kids'.

    Citas próximas: ${JSON.stringify(proximasCitas)}
    
    INSTRUCCIONES DE COMANDOS (Si el usuario pide una acción, devuelve SOLO un JSON válido, sin texto adicional):

    1. Para confirmar cita: {"comando": "confirmar_cita", "id_cita": "ID", "nombre": "NOMBRE"}
    
    2. Para llenar datos en la historia clínica: 
    {"comando": "llenar_formulario", "campo": "NOMBRE_DEL_CAMPO", "valor": "LO QUE DIJO LA DOCTORA"}
    
    TUS CAMPOS PERMITIDOS PARA LLENAR SON ESTOS (No inventes otros): 
    nombres, fecha_nacimiento, sexo, colegio, apoderado_nombre, apoderado_parentesco, apoderado_dni, apoderado_ocupacion, telefono, email, domicilio, contacto_emergencia, telefono_emergencia, motivo_consulta, historia_enfermedad, medicacion_actual, hospitalizaciones, primera_vez, comportamiento_previo, traumatismos, traumatismos_detalle, lactancia_biberon, succion_no_nutritiva, respiracion, otros_habitos, frecuencia_cepillado, supervision_cepillado, uso_fluor, dieta_azucares, examen_extraoral, examen_intraoral, riesgo_caries, diagnostico_plan, motivo, diagnostico_cie10, tratamiento, medicamentos, indicaciones.

    EJEMPLOS DE COMPORTAMIENTO:
    - Doctora: "Pon sexo masculino" -> Tú devuelves: {"comando": "llenar_formulario", "campo": "sexo", "valor": "Masculino"}
    - Doctora: "En motivo pon dolor de muela" -> Tú devuelves: {"comando": "llenar_formulario", "campo": "motivo_consulta", "valor": "Dolor de muela"}
    - Doctora: "Anota que usa pasta de 1100 ppm" -> Tú devuelves: {"comando": "llenar_formulario", "campo": "uso_fluor", "valor": "Usa pasta de 1100 ppm"}

    Si el usuario no pide acciones, responde de forma amable y servicial como texto normal.`;

    // USAMOS LA URL EXACTA DE GEMINI QUE SÍ TE FUNCIONA
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: pregunta }] }]
      }),
    })

    const aiData = await geminiResponse.json()
    if (aiData.error) throw new Error(aiData.error.message);
    
    let respuestaIA = aiData.candidates[0].content.parts[0].text.trim();
    let comandoEjecutado = null;
    let urlDestino = null;
    let campoExtraido = null;
    let valorExtraido = null;

    try {
      const posibleJson = respuestaIA.replace(/```json/g, '').replace(/```/g, '').trim();
      const datosJson = JSON.parse(posibleJson);

      if (datosJson.comando === 'confirmar_cita') {
        await supabase.from('citas').update({ estado: 'Confirmado' }).eq('id', datosJson.id_cita);
        respuestaIA = `✅ ¡Listo Doctora! He confirmado la cita de ${datosJson.nombre}.`;
        comandoEjecutado = datosJson.comando;
      } 
      else if (datosJson.comando === 'llenar_formulario') {
        respuestaIA = `✍️ Listo, doctora. Lo he anotado en el formulario.`;
        comandoEjecutado = datosJson.comando;
        campoExtraido = datosJson.campo;
        valorExtraido = datosJson.valor;
      }
    } catch (e) {
      // Era texto normal
    }

    return new Response(JSON.stringify({ 
      respuesta: respuestaIA,
      comando: comandoEjecutado,
      url: urlDestino,
      campo: campoExtraido,
      valor: valorExtraido
    }), {
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