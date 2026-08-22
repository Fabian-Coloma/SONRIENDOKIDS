import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';
import { useAsistente } from '../../../context/useAsistente';

export default function AsistenteIA() {
  const navigate = useNavigate();
  const { setDatosFormulario } = useAsistente();
  
  const [isOpen, setIsOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  
  const [historial, setHistorial] = useState(() => {
    const historialGuardado = localStorage.getItem('chatRebeca');
    return historialGuardado ? JSON.parse(historialGuardado) : [
      { role: 'assistant', content: '✨ ¡Hola Doctora Patricia! Soy Rebeca, tu asistente. ¿En qué te puedo ayudar hoy?' }
    ];
  });

  const mensajesFinRef = useRef(null);
  
  useEffect(() => {
    localStorage.setItem('chatRebeca', JSON.stringify(historial));
    mensajesFinRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial, isOpen]);

const procesarMensaje = async (textoAEnviar) => {
    if (!textoAEnviar.trim()) return;

    const textoMin = textoAEnviar.toLowerCase();

    // =======================================================
    // 🚀 SUPER REBECA: MODO LOCAL (0 Costo, 0 Espera)
    // =======================================================

    // --- A. BÚSQUEDA DIRECTA DE PACIENTES EN BASE DE DATOS ---
    let nombreBuscado = null;
    const frasesBusqueda = [
      "historial médico de", "historial medico de", "historia clínica de", 
      "historia clinica de", "historial de", "paciente"
    ];

    // Detectamos si la doctora quiere buscar a un niño en específico
    for (const frase of frasesBusqueda) {
      if (textoMin.includes(frase)) {
        nombreBuscado = textoMin.split(frase)[1].trim();
        // Limpiamos palabras extra que a veces decimos por voz
        nombreBuscado = nombreBuscado.replace(/por favor|ya|ahora/gi, '').trim();
        break;
      }
    }

    if (nombreBuscado) {
      setHistorial(prev => [...prev, { role: 'user', content: textoAEnviar }]);
      setCargando(true);
      
     try {
        // Consultamos tu base de datos Supabase
        const { data: pacienteData, error } = await supabase
          .from('pacientes')
          .select('id, nombre_nino')
          .ilike('nombre_nino', `%${nombreBuscado}%`)
          .limit(1)
          .single();

        // 1. SOLUCIÓN: Usamos la variable 'error' para que el linter no se queje
        if (error) console.error("Supabase no encontró al paciente o hubo un fallo:", error);

        if (pacienteData) {
          setHistorial(prev => [...prev, { role: 'assistant', content: `📂 Encontré a ${pacienteData.nombre_nino}. Abriendo su expediente...` }]);
          navigate(`/admin/pacientes/${pacienteData.id}`);
        } else {
          setHistorial(prev => [...prev, { role: 'assistant', content: `❌ No encontré a ningún paciente llamado "${nombreBuscado}".` }]);
        }
      } catch (e) {
        // 2. SOLUCIÓN: Usamos la variable 'e' imprimiéndola en consola
        console.error("Error al ejecutar la búsqueda local:", e);
        setHistorial(prev => [...prev, { role: 'assistant', content: `❌ Error al buscar en la base de datos.` }]);
      } finally {
        setCargando(false);
      }
      return; // 🛑 SALIMOS AQUÍ. No gastamos saldo de Gemini.
    }

    // --- B. NAVEGACIÓN DE PESTAÑAS Y RUTAS GLOBALES ---
    const intencionNavegar = textoMin.includes("abre") || textoMin.includes("ingresa") || 
                             textoMin.includes("ve a") || textoMin.includes("ir a") || 
                             textoMin.includes("muéstrame") || textoMin.includes("ver ");

    if (intencionNavegar) {
      // 1. Pestañas internas
      const pestañasHistorial = {
        "filiación": "filiacion", "filiacion": "filiacion",
        "anamnesis": "anamnesis", "médico": "anamnesis", "medico": "anamnesis",
        "odontológico": "odontologicos", "odontologico": "odontologicos",
        "hábito": "habitos", "habito": "habitos", "higiene": "habitos",
        "examen": "examen", "clínico": "examen", "clinico": "examen",
        "evolución": "evolucion", "evolucion": "evolucion", "notas": "evolucion"
      };

      for (const [palabra, idTab] of Object.entries(pestañasHistorial)) {
        if (textoMin.includes(palabra)) {
          setHistorial(prev => [...prev, { role: 'user', content: textoAEnviar }]);
          setHistorial(prev => [...prev, { role: 'assistant', content: `✅ Entendido, cambiando a la pestaña de ${palabra}.` }]);
          setDatosFormulario({ accion: 'cambiar_pestana', tab: idTab });
          return; 
        }
      }

      // 2. Rutas globales
      const rutasGlobales = {
        "citas": "/admin/citas", "agenda": "/admin/citas",
        "finanzas": "/admin/finanzas", "caja": "/admin/finanzas",
        "dashboard": "/admin", "resumen": "/admin",
        "pacientes": "/admin/pacientes", "lista": "/admin/pacientes"
      };

      for (const [palabra, ruta] of Object.entries(rutasGlobales)) {
        if (textoMin.includes(palabra)) {
          setHistorial(prev => [...prev, { role: 'user', content: textoAEnviar }]);
          setHistorial(prev => [...prev, { role: 'assistant', content: `✅ Navegando a ${palabra}.` }]);
          navigate(ruta);
          return; 
        }
      }
    }

    // --- 3. SI ES UNA ORDEN COMPLEJA (Llenar formulario o conversar), USAMOS GEMINI ---
    setMensaje(''); 
    setHistorial(prev => [...prev, { role: 'user', content: textoAEnviar }]);
    setCargando(true);

    try {
      const { data, error } = await supabase.functions.invoke('asistente-ia', {
        body: { pregunta: textoAEnviar }
      });

      if (error) throw error;
      setHistorial(prev => [...prev, { role: 'assistant', content: data.respuesta }]);
      
      if (data.comando === 'llenar_formulario' && data.campo && data.valor) {
        setDatosFormulario({ campo: data.campo, valor: data.valor });
      }

    } catch (error) {
      console.error("Error al consultar a Rebeca:", error);
      setHistorial(prev => [...prev, { role: 'assistant', content: 'Estoy procesando mucha información. ¿Esperamos un momento y me lo repites?' }]);
    } finally {
      setCargando(false);
    }
  };
  // --- LÓGICA DE RECONOCIMIENTO DE VOZ ---
  const iniciarEscucha = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta el reconocimiento de voz. Usa Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-PE'; 
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setEscuchando(true);
    
    recognition.onresult = (event) => {
      const transcripcion = event.results[0][0].transcript;
      procesarMensaje(transcripcion);
    };

    recognition.onend = () => setEscuchando(false);
    recognition.onerror = () => setEscuchando(false);

    recognition.start();
  };

  const manejarSubmitManual = (e) => {
    e.preventDefault();
    procesarMensaje(mensaje);
  };

  const limpiarChat = () => {
    const chatInicial = [{ role: 'assistant', content: '✨ ¡Chat limpio! ¿En qué te ayudo?' }];
    setHistorial(chatInicial);
    localStorage.setItem('chatRebeca', JSON.stringify(chatInicial));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl mb-4 overflow-hidden border border-gray-100 flex flex-col h-[500px] animate-fade-in">
          
          <div className="bg-[#003B5C] px-4 py-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-xl shadow-sm border border-white/30">
                👩🏻‍💼
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">Rebeca</h3>
                <p className="text-blue-200 text-xs">Asistente Virtual</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={limpiarChat} className="text-white/70 hover:text-white transition-colors" title="Limpiar historial">
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-300 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {historial.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-[#003B5C] text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {cargando && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={mensajesFinRef} />
          </div>

          <form onSubmit={manejarSubmitManual} className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2 relative items-center">
              
              <button 
                type="button" 
                onClick={iniciarEscucha}
                className={`p-2 rounded-full transition-colors flex shrink-0 ${escuchando ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                title="Dictar y Enviar Automáticamente"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>

              <input 
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder={escuchando ? "Te escucho..." : "Escribe aquí..."}
                className="w-full bg-gray-100 text-sm px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#003B5C]/20 transition-all text-gray-700 font-medium"
                disabled={cargando || escuchando}
              />
              <button 
                type="submit" 
                disabled={!mensaje.trim() || cargando}
                className="bg-[#003B5C] w-10 h-10 flex shrink-0 items-center justify-center rounded-full text-white hover:bg-[#002b44] transition-colors disabled:bg-gray-300"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-red-500 text-white' : 'bg-[#003B5C] text-white hover:bg-[#002b44]'
        }`}
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-3xl">close</span>
        ) : (
          <span className="text-3xl">👩🏻‍💼</span>
        )}
      </button>
    </div>
  );
}