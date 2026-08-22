import { Link } from 'react-router-dom';
// Reemplaza con la foto real de tu clínica
import imgOrtodoncia from '../assets/imagen1.jpg'; 

const OrtopediaOrtodoncia = () => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen font-sans text-gray-800 overflow-x-hidden relative">
      
      {/* ================= ESTILOS Y ANIMACIONES GLOBALES ================= */}
      <style>{`
        @keyframes reveal {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        @keyframes float-continuous {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-continuous {
          animation: float-continuous 4s ease-in-out infinite;
        }

        @keyframes swing {
          0% { transform: rotate(8deg); }
          50% { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }
        .animate-swing {
          transform-origin: top center;
          animation: swing 5s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* ================= HEADER HERO - ATARDECER SAFARI ================= */}
      <div className="relative pt-30 pb-20 bg-gradient-to-br from-[#f4a261] to-[#e76f51] overflow-hidden text-center z-10 animate-reveal">
        
        {/* Emojis flotantes interactivos */}
        <div className="absolute top-16 left-[10%] text-8xl opacity-40 animate-swing cursor-default hover:scale-125 transition-transform duration-300">🐒</div>
        <div className="absolute bottom-12 left-[20%] text-8xl opacity-30 animate-float-continuous cursor-default">🦷</div>
        <div className="absolute bottom-10 right-[15%] text-9xl opacity-40 cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300 animate-bounce">🦜</div>
     
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#ffdfba] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white mb-6 drop-shadow-xl transform transition-all duration-500 hover:scale-105 leading-tight">
            Ortopedia Maxilar & Ortodoncia
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-bold bg-black/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link> 
            <span>/</span> 
            <span className="text-white">Ortopedia & Ortodoncia</span>
          </div>
        </div>
        
        {/* Curva divisoria estilo ola (SVG) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-[#fdfbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
{/* DECORACIÓN DE FONDO: Animales Safari (Otras Secciones) */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
  <span className="absolute top-1/4 -left-10 text-[20rem] opacity-[0.20] transform -rotate-6 select-none">
    🐅
  </span>
  <span className="absolute top-2/3 -right-10 text-[20rem] opacity-[0.20] transform rotate-12 select-none">
    🐒
  </span>
</div>
      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        
        {/* Bloque Superior: Textos e Imagen Polaroid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Columna Izquierda: Textos con Animación en cascada */}
          <div className="space-y-8 animate-reveal delay-100">
            <h2 className="text-3xl lg:text-4xl font-black text-[#e76f51] mb-6 flex items-center gap-3 bg-white inline-block px-6 py-3 rounded-2xl border-2 border-[#e76f51] shadow-[4px_4px_0_#f4a261] transform -rotate-1">
              <span className="text-4xl animate-bounce">📏</span> Ortopedia Maxilar & Ortodoncia 🦷✨
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed font-bold">
              <span className="float-left bg-[#f4a261] text-white text-5xl font-black rounded-2xl px-5 py-3 mr-4 mb-2 shadow-[4px_4px_0_#e76f51] transform rotate-3 hover:rotate-0 transition-transform">
                ¿
              </span>
              Notas que los dientes de tu pequeño están chuecos, apiñados o que su mordida no encaja bien?
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Evaluamos su crecimiento y desarrollo para guiar la posición de los maxilares y los dientes en el momento adecuado, logrando una sonrisa saludable, funcional y armoniosa.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              ¡Una evaluación a tiempo puede marcar la diferencia! 💙
            </p>

            {/* Viñeta Destacada Estilo "Pro Safari" */}
            <div className="bg-[#fff5ea] p-8 rounded-[3rem] border-4 border-[#f4a261] shadow-[8px_8px_0_#f4a261] transform hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="absolute -top-6 -right-6 text-5xl animate-spin-slow">⭐</div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#f4a261] flex items-center justify-center text-2xl shrink-0 shadow-sm transform -rotate-6">👨‍⚕️</div>
                <p className="text-[#6b584a] font-bold text-lg leading-relaxed">
                  Nuestros <strong className="text-[#f4a261]">ORTODONCISTAS</strong> son dentistas que han cursado una especialidad adicional de 3 años para ser verdaderos expertos en Ortopedia Maxilar.
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Imagen Polaroid Flotante y Animada */}
          <div className="relative h-[500px] mt-10 lg:mt-0 flex justify-center items-center">
            {/* Fondo orgánico animado */}
            <div className="absolute inset-0 bg-[#eaf4ed] rounded-[4rem] transform rotate-6 opacity-100 -z-10 border-4 border-dashed border-[#4a6b53]/30 animate-pulse scale-90"></div>
            
            {/* Wrapper Cascada + Flotar */}
            <div className="absolute w-[80%] z-20 animate-reveal delay-300">
              <div className="animate-float-continuous group">
                <div className="bg-white p-4 pb-16 shadow-[0_20px_50px_rgba(231,111,81,0.3)] rounded-3xl transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 border-4 border-[#e76f51] cursor-pointer relative">
                  
                  {/* Washi tape decorativo */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#4a6b53] opacity-90 rotate-2 shadow-sm"></div>
                  
                  {/* Imagen (ajustada para proteger rostros) */}
                  <img src={imgOrtodoncia} alt="Resultados Increíbles" className="w-full h-auto aspect-[4/5] object-cover object-[center_20%] rounded-xl group-hover:opacity-90 transition-opacity" />
                  
                  <p className="absolute bottom-4 left-0 w-full text-center font-black text-[#6b584a] text-xl font-handwriting">¡Resultados Mágicos! ✨</p>

                  {/* Iconos que salen volando en hover */}
                  <div className="absolute -top-10 -right-6 text-4xl opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-700 z-30">🦷</div>
                  <div className="absolute top-1/2 -left-10 text-5xl opacity-0 transform translate-x-10 group-hover:opacity-100 group-hover:-translate-x-6 transition-all duration-700 z-30 delay-100">✨</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= SECCIÓN 2: DIAGNÓSTICO (ESTILO CRISTAL SAFARI PRO) ================= */}
        <div className="animate-reveal delay-500">
          <div className="bg-[#4a6b53] rounded-[3rem] p-10 lg:p-16 relative overflow-hidden border-[6px] border-[#2d3b32] shadow-[12px_12px_0_#f4a261]">
            
            {/* Elementos decorativos de fondo */}
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute right-5 top-5 text-7xl opacity-20 rotate-12 animate-float-continuous">🔍</div>
            <div className="absolute bottom-10 right-1/4 text-6xl opacity-10 animate-swing">🦒</div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              
              <div className="md:col-span-5 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Diagnóstico <br/>
                  <span className="text-[#f4a261]">Personalizado</span> 🎯
                </h2>
                <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 text-white font-bold transform -rotate-2 shadow-lg">
                  Cada sonrisa es un mundo diferente
                </div>
              </div>
              
              <div className="md:col-span-7 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl space-y-6">
                <p className="text-white/95 text-lg font-bold leading-relaxed">
                  La duración del tratamiento variará según cada paciente. Factores como la edad y la gravedad influirán en cuánto tiempo tendrá los aparatos y los brackets. ⏱️
                </p>
                <div className="w-full h-[2px] bg-white/20 border-dashed border-t"></div>
                <p className="text-white/95 text-lg font-bold leading-relaxed">
                  El tipo de tratamiento exacto dependerá del diagnóstico de nuestro especialista. Utilizamos radiografías especiales, modelos de estudio y fotografías. 📸
                </p>
                
                <div className="pt-4 text-center lg:text-left">
                  <Link to="/reserva" className="inline-block px-10 py-4 bg-[#f4a261] text-white font-black text-xl rounded-full shadow-[0_8px_0_#e76f51] hover:translate-y-[4px] hover:shadow-[0_4px_0_#e76f51] transition-all duration-200">
                    ¡Evaluar mi sonrisa! 😁
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrtopediaOrtodoncia;