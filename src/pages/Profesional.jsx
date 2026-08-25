import { Link } from 'react-router-dom';
import foto1 from '../assets/foto1.jpeg'; 

const Profesional = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] relative overflow-hidden font-sans">
      
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
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      {/* ================= HEADER HERO - SAFARI ================= */}
      <div className="relative pt-30 pb-24 bg-gradient-to-br from-[#4a6b53] to-[#2d3b32] overflow-hidden text-center z-10 animate-reveal">
        
        {/* Emojis flotantes interactivos */}
        <div className="absolute top-16 left-[10%] text-8xl opacity-40 animate-swing cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300">👩🏻‍⚕️</div>
        <div className="absolute bottom-12 left-[20%] text-8xl opacity-30 cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300 animate-float-continuous cursor-default">🦒</div>
        <div className="absolute bottom-20 right-[15%] text-8xl opacity-40 cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300">🐘</div>
        
        
        
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#f4a261] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#eaf4ed] rounded-full mix-blend-overlay opacity-10 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl transform transition-all duration-500 hover:scale-105 leading-tight">
            Nuestra Especialista
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-bold bg-black/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Link to="/" className="hover:text-[#f4a261] transition-colors">Inicio</Link> 
            <span>/</span> 
            <span className="text-[#f4a261]">Profesional</span>
          </div>
        </div>
        
        {/* Curva divisoria estilo ola (SVG) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-[#fdfbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>


{/* DECORACIÓN DE FONDO: Animales Safari (Especialista) */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
  {/* Cebra arriba a la derecha */}
  <span className="absolute top-40 -right-10 text-[18rem] md:text-[28rem] opacity-[0.20] transform rotate-12 select-none">
    🦓
  </span>
  {/* Elefante abajo a la izquierda */}
  <span className="absolute -bottom-10 -left-10 text-[18rem] md:text-[28rem] opacity-[0.20] transform -rotate-12 select-none">
    🐊
  </span>
</div>


      {/* ================= CONTENIDO DE LA DOCTORA ================= */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        
        {/* TARJETA PRINCIPAL DEL PROFESIONAL (Glassmorphism Safari) */}
        <div className="animate-reveal delay-200">
          <div className="bg-[#fff5ea] rounded-[4rem] shadow-[12px_12px_0_#f4a261] border-4 border-[#f4a261] overflow-hidden p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-center relative transform hover:-translate-y-2 transition-transform duration-500">
            
            {/* LADO IZQUIERDO: Fotografía Flotante Animada */}
            <div className="lg:w-1/2 relative group w-full max-w-md mx-auto">
              
              <div className="animate-float-continuous">
                {/* Fondo decorativo orgánico detrás de la foto */}
                <div className="absolute inset-0 bg-[#4a6b53] rounded-[3rem] transform rotate-6 scale-105 opacity-80 -z-10 transition-transform duration-500 group-hover:rotate-3 border-4 border-dashed border-white/40"></div>
                
                {/* Polaroid de la Doctora */}
                <div className="bg-white p-3 pb-16 shadow-[0_20px_50px_rgba(74,107,83,0.3)] rounded-3xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-[#4a6b53] cursor-pointer relative">
                  
                  {/* Washi tape decorativo */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#f4a261] opacity-90 rotate-2 shadow-sm"></div>
                  
                  {/* Foto centrada y protegiendo el rostro (object-top) */}
                  <img 
                    src={foto1} 
                    alt="Dra. Patty Mora" 
                    className="w-full h-[400px] object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <p className="absolute bottom-4 left-0 w-full text-center font-black text-[#6b584a] text-2xl font-handwriting">
                    ¡Sonrisas felices! ✨
                  </p>
                </div>

                {/* Insignia Flotante UPCH - Animación Independiente */}
                <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-4 rounded-3xl shadow-xl z-30 flex items-center gap-4 animate-bounce border-4 border-[#f4a261]">
                  <div className="w-12 h-12 bg-[#fff5ea] rounded-full flex items-center justify-center text-3xl">
                    🎓
                  </div>
                  <div>
                    <p className="font-black text-[#6b584a] text-sm leading-tight">Egresada de<br/><span className="text-[#f4a261]">Excelencia</span></p>
                    <p className="text-xs text-[#4a6b53] font-bold">UPCH</p>
                  </div>
                </div>

              </div>
            </div>

            {/* LADO DERECHO: Copywriting y Perfil */}
            <div className="lg:w-1/2 space-y-8">
              
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-[#6b584a] mb-2 text-center">
                  Dra. Patty Mora <span className="animate-swing origin-bottom inline-block">👋</span>
                </h2>
                <div className="text-center">
                  <h3 className="text-xl lg:text-2xl text-[#4a6b53] font-black inline-block bg-white px-5 py-2 rounded-full border-2 border-[#4a6b53] shadow-sm transform -rotate-1">
                    Odontopediatra
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-gray-600 font-bold text-lg leading-relaxed">
                <p>
                  Con una profunda vocación por la salud bucal infantil, nuestra doctora se formó en la prestigiosa <strong className="text-[#f4a261]">Universidad Peruana Cayetano Heredia (UPCH)</strong>, destacando por su enorme compromiso y excelencia clínica.
                </p>
                <div className="bg-white p-5 rounded-2xl border-l-4 border-[#f4a261] shadow-sm transform hover:translate-x-2 transition-transform duration-300">
                  <p className="italic text-[#6b584a]">
                    "Toda visita al dentista debe ser una aventura libre de lágrimas." 🦁
                  </p>
                </div>
                <p>
                  Gracias a su infinita paciencia y técnicas avanzadas de manejo de conducta, logra que hasta los pacientitos más nerviosos salgan del consultorio con una gran sonrisa y un premio en la mano.
                </p>
              </div>

              {/* Viñetas de habilidades (Grid Interactivo) */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-[3px] border-dashed border-[#f4a261]/30">
                <li className="flex items-center gap-3 text-[#6b584a] font-black group cursor-default">
                  <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl border-2 border-[#eaf4ed] group-hover:scale-110 group-hover:border-[#4a6b53] transition-all shadow-sm">🧸</span>
                  Manejo de ansiedad
                </li>
                <li className="flex items-center gap-3 text-[#6b584a] font-black group cursor-default">
                  <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl border-2 border-[#eaf4ed] group-hover:scale-110 group-hover:border-[#4a6b53] transition-all shadow-sm">🦷</span>
                  Diagnóstico de ortodoncia preventiva
                </li>
                <li className="flex items-center gap-3 text-[#6b584a] font-black group cursor-default">
                  <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl border-2 border-[#eaf4ed] group-hover:scale-110 group-hover:border-[#4a6b53] transition-all shadow-sm">✨</span>
                  Odontología sin dolor
                </li>
                <li className="flex items-center gap-3 text-[#6b584a] font-black group cursor-default">
                  <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl border-2 border-[#eaf4ed] group-hover:scale-110 group-hover:border-[#4a6b53] transition-all shadow-sm">🏆</span>
                  Atención de excelencia
                </li>
              </ul>

              <div className="pt-8">
                <Link 
                  to="/reserva"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#4a6b53] text-white font-black text-xl rounded-full shadow-[0_8px_0_#2d3b32] hover:translate-y-[4px] hover:shadow-[0_4px_0_#2d3b32] transition-all duration-200 w-full sm:w-auto"
                >
                  Agenda una cita con ella 📅
                </Link>

                
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profesional;