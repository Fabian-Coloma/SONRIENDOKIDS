import { Link } from 'react-router-dom';
import img1 from '../assets/imagen1.jpg';
import img2 from '../assets/imagen2.jpg';
import img3 from '../assets/imagen3.jpg';
import img4 from '../assets/imagen4.jpg';
import img8 from '../assets/imagen8.jpg';

const Sedes = () => {
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
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      {/* ================= HEADER HERO - EXPLORADORES ================= */}
      <div className="relative pt-30 pb-20 bg-gradient-to-br from-[#4a6b53] to-[#2d3b32] overflow-hidden text-center z-10 animate-reveal">
        
        {/* Emojis flotantes interactivos */}
        <div className="absolute top-16 left-[10%] text-8xl opacity-40 animate-swing cursor-default hover:scale-125 transition-transform duration-300">🐒</div>
        <div className="absolute bottom-12 left-[15%] text-8xl opacity-30 animate-float-continuous cursor-default">🗺️</div>
        <div className="absolute bottom-20 right-[10%] text-8xl opacity-30 cursor-default hover:-translate-x-4 hover:scale-110 transition-all duration-300 animate-bounce">🚙</div>
      
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#f4a261] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#eaf4ed] rounded-full mix-blend-overlay opacity-10 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white mb-6 drop-shadow-xl transform transition-all duration-500 hover:scale-105 leading-tight">
            Nuestra Clínica 🏕️
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-bold bg-black/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Link to="/" className="hover:text-[#f4a261] transition-colors">Inicio</Link> 
            <span>/</span> 
            <span className="text-[#f4a261]">La Clínica</span>
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
  <span className="absolute top-1/4 -left-10 text-[25rem] opacity-[0.25] transform -rotate-6 select-none">
    🐅
  </span>
  <span className="absolute top-50 -right-10 text-[20rem] opacity-[0.25] transform rotate-12 select-none">
    🐒
  </span>
</div>

      {/* ================= CONTENIDO DE LA SEDE ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Columna Izquierda: Textos Divertidos */}
          <div className="space-y-8 animate-reveal delay-100">
            <h2 className="text-4xl lg:text-5xl font-black text-[#6b584a] mb-4 flex flex-col gap-2">
              <span className="text-2xl text-[#f4a261] tracking-widest uppercase">Base de Exploración</span>
              Sonriendo Kids <span className="text-[#4a6b53] underline decoration-[#f4a261] decoration-wavy underline-offset-8">Callao</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-bold">
              Diseñada como un verdadero campamento safari, nuestra clínica cuenta con múltiples consultorios equipados con la última tecnología y ambientes creados específicamente para que los niños se sientan súper felices. 🐾
            </p>
            
            {/* Tarjeta de Información Estilo "Pro" FLOTANTE */}
            <div className="animate-float-continuous" style={{ animationDelay: '1s' }}>
              <div className="bg-[#fff5ea] p-8 rounded-[3rem] border-4 border-[#f4a261] shadow-[8px_8px_0_#f4a261] space-y-6 transform hover:-translate-y-2 transition-transform duration-300 relative">
                
                <div className="absolute -top-6 -right-6 text-5xl animate-spin-slow">🧭</div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#f4a261] flex items-center justify-center text-2xl shrink-0 shadow-sm transform -rotate-6">📍</div>
                  <div>
                    <h4 className="font-black text-[#6b584a] text-xl">¿Dónde estamos?</h4>
                    <p className="text-gray-600 font-medium text-lg mt-1">Mz C lote 20 Urb 7 de agosto, Callao</p>
                  </div>
                </div>
                
                <div className="w-full h-[2px] bg-[#f4a261]/30 border-dashed border-t-2"></div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#4a6b53] flex items-center justify-center text-2xl shrink-0 shadow-sm transform rotate-6">⏰</div>
                  <div>
                    <h4 className="font-black text-[#4a6b53] text-xl">Horario de Safari</h4>
                    <p className="text-gray-600 font-medium text-lg mt-1">Lunes a Sábado: 09:00 am - 06:00 pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/reserva" className="inline-flex items-center gap-3 px-8 py-4 bg-[#4a6b53] text-white font-black text-xl rounded-full shadow-[0_8px_0_#2d3b32] hover:translate-y-[4px] hover:shadow-[0_4px_0_#2d3b32] transition-all duration-200">
                ¡Quiero ir al campamento! 🚀
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Collage Polaroid con TODAS las fotos flotantes */}
          <div className="relative h-[650px] mt-10 lg:mt-0">
            {/* Fondo decorativo orgánico */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#eaf4ed] rounded-[4rem] transform rotate-3 opacity-60 -z-10 border-4 border-dashed border-[#4a6b53]/20 animate-pulse"></div>
            
            {/* Foto 1 */}
            <div className="absolute top-[5%] left-[5%] w-[45%] z-20 animate-reveal delay-200">
              <div className="animate-float-continuous" style={{ animationDelay: '0s' }}>
                <div className="bg-white p-3 pb-12 shadow-xl rounded-2xl transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 cursor-pointer relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#ffb3ba] opacity-90 rotate-3"></div>
                  <img src={img1} alt="Recepción" className="w-full h-auto aspect-square object-cover object-[center_60%] rounded-xl" />
                </div>
              </div>
            </div>
            
            {/* Foto 2 */}
            <div className="absolute top-[10%] right-[5%] w-[45%] z-20 animate-reveal delay-300">
              <div className="animate-float-continuous" style={{ animationDelay: '1.2s' }}>
                <div className="bg-white p-3 pb-12 shadow-xl rounded-2xl transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 cursor-pointer relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#baffc9] opacity-90 -rotate-3"></div>
                  <img src={img2} alt="Consultorio principal" className="w-full h-auto aspect-square object-cover object-[center_60%] rounded-xl" />
                </div>
              </div>
            </div>
            
            {/* Foto 3 */}
            <div className="absolute bottom-[10%] left-[5%] w-[45%] z-20 animate-reveal delay-400">
              <div className="animate-float-continuous" style={{ animationDelay: '2.5s' }}>
                <div className="bg-white p-3 pb-12 shadow-xl rounded-2xl transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 cursor-pointer relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#bae1ff] opacity-90 rotate-2"></div>
                  <img src={img3} alt="Área de atención" className="w-full h-auto aspect-square object-cover object-[center_60%] rounded-xl" />
                </div>
              </div>
            </div>
            
            {/* Foto 4 */}
            <div className="absolute bottom-[5%] right-[5%] w-[50%] z-40 animate-reveal delay-500">
              <div className="animate-float-continuous" style={{ animationDelay: '0.8s' }}>
                <div className="bg-white p-3 pb-14 rounded-2xl shadow-[0_20px_40px_rgba(244,162,97,0.3)] border-4 border-[#f4a261] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#f4a261] opacity-90 -rotate-2"></div>
                  <img src={img4} alt="Equipamiento moderno" className="w-full h-auto aspect-square object-cover object-[center_60%] rounded-lg" />
                  <p className="absolute bottom-3 left-0 w-full text-center font-black text-[#6b584a] text-lg font-handwriting">¡Todo listo! 🦒</p>
                </div>
              </div>
            </div>

            {/* Insignia central animada */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full border-4 border-[#4a6b53] shadow-[0_0_30px_rgba(74,107,83,0.3)] z-30 animate-swing">
              <span className="text-5xl">🦷</span>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BANNER FINAL: ZONA DE JUEGOS (AHORA MÁS DELGADO) ================= */}
      {/* Se redujo py-32 a py-16 lg:py-20 para hacer una "franja" limpia */}
      <div className="relative py-16 lg:py-20 overflow-hidden animate-reveal delay-300 border-t-[12px] border-dashed border-[#4a6b53]/20 group">
        
        {/* Imagen de fondo con overlay selvático y efecto zoom intacto */}
        <div className="absolute inset-0 z-0">
          <img src={img8} alt="Niños jugando en la clínica" className="w-full h-full object-cover object-[center_40%] transform transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-[#4a6b53]/70 mix-blend-multiply transition-colors duration-1000 group-hover:bg-[#4a6b53]/60"></div>
          {/* Gradiente extra para que los textos destaquen perfecto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d3b32]/90 to-transparent"></div>
        </div>

        {/* Decoración Safari superpuesta adaptada al nuevo alto */}
        <div className="absolute -bottom-10 -left-5 text-[8rem] opacity-40 animate-swing z-10">🦩</div>
        <div className="absolute top-0 right-5 text-[6rem] opacity-30 animate-pulse z-10">🦜</div>

        {/* Tarjeta central Glassmorphism (Layout Horizontal para PC) */}
        <div className="relative z-20 max-w-5xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md p-6 lg:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 text-center lg:text-left">
              
              {/* Textos a la Izquierda */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 drop-shadow-md flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <div className="p-3 rounded-full  transform -rotate-6 animate-bounce">
                    <span className="text-3xl">🧸</span>
                  </div>
                  <span>Espacios <span className="text-[#f4a261]">para ellos</span> </span>
                </h2>
                <p className="text-lg text-white/95 leading-relaxed font-bold max-w-2xl drop-shadow-sm mt-2">
                  Zonas de juego temáticas que hacen que ir al dentista sea su aventura favorita del mes.
                </p>
              </div>

              {/* Botón a la Derecha */}
              <div className="shrink-0 mt-4 lg:mt-0">
                <Link to="/reserva" className="inline-block px-8 py-4 bg-[#f4a261] text-white font-black text-lg md:text-xl rounded-full shadow-[0_8px_0_#e76f51] hover:translate-y-[4px] hover:shadow-[0_4px_0_#e76f51] transition-all duration-200 whitespace-nowrap">
                  Únete a la Aventura 🚀
                </Link>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sedes;