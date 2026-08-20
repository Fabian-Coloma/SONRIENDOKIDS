import { Link } from 'react-router-dom';
import imgSedacion from '../assets/imagen8.jpg'; 

const Sedacion = () => {
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

      {/* ================= HEADER HERO - CIELO ESTRELLADO SAFARI ================= */}
      <div className="relative pt-15 pb-20 bg-gradient-to-br from-[#a67b5b] to-[#8a6347] overflow-hidden text-center z-10 animate-reveal">
        
        {/* Emojis flotantes interactivos y relajantes */}
        <div className="absolute top-16 left-[10%] text-6xl opacity-40 animate-swing cursor-default hover:scale-125 transition-transform duration-300">💤</div>
        <div className="absolute bottom-12 left-[20%] text-5xl opacity-30 animate-float-continuous cursor-default">🌙</div>
        <div className="absolute bottom-10 right-[15%] text-6xl opacity-40 cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300 animate-bounce">🐨</div>
        <div className="absolute top-10 right-[25%] text-5xl opacity-30 animate-swing" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-24 left-[30%] text-5xl opacity-20 animate-float-continuous" style={{ animationDelay: '1.5s' }}>☁️</div>
        
        {/* Formas orgánicas de fondo (Nubes/Sueño) */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-10 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#f4a261] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          <div className="inline-block px-5 py-2 rounded-full bg-white/10 text-[#fdfbf7] font-black text-sm tracking-widest uppercase mb-4 backdrop-blur-md border border-white/20 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
            🛡️ 100% Seguro y Relajante
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl transform transition-all duration-500 hover:scale-105 leading-tight">
            Sedación Consciente
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-bold bg-black/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Link to="/" className="hover:text-[#f4a261] transition-colors">Inicio</Link> 
            <span>/</span> 
            <span className="text-[#f4a261]">Sedación Consciente</span>
          </div>
        </div>
        
        {/* Curva divisoria estilo ola (SVG) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-[#fdfbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        
        {/* Bloque Superior: Textos e Imagen Polaroid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Columna Izquierda: Textos con Animación en cascada */}
          <div className="space-y-6 animate-reveal delay-100">
            <h2 className="text-3xl lg:text-4xl font-black text-[#a67b5b] mb-6 flex items-center gap-3 bg-white inline-block px-6 py-3 rounded-2xl border-2 border-[#a67b5b] shadow-[4px_4px_0_#f4a261] transform -rotate-1">
              <span className="text-4xl animate-bounce">😌</span> Sin Miedos, Sin Lágrimas
            </h2>
            
            <div className="bg-[#fff5ea] p-6 rounded-[2rem] border-4 border-[#f4a261] shadow-[6px_6px_0_#f4a261] transform hover:-translate-y-2 transition-transform duration-300">
              <p className="text-gray-600 text-lg leading-relaxed font-bold">
                <span className="float-left bg-[#f4a261] text-white text-5xl font-black rounded-2xl px-5 py-3 mr-4 mb-2 shadow-[4px_4px_0_#a67b5b] transform rotate-3 hover:rotate-0 transition-transform">
                  C
                </span>
                uando los niños son temerosos, ansiosos, muy pequeñitos o tienen habilidades especiales, forzarlos puede generarles un trauma. La <strong className="text-[#a67b5b]">Sedación Consciente</strong> es la alternativa perfecta y segura.
              </p>
            </div>

            <div className="bg-[#eaf4ed] p-6 rounded-[2rem] border-4 border-[#4a6b53] shadow-[6px_6px_0_#4a6b53] transform hover:-translate-y-2 transition-transform duration-300">
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Consiste en la administración de analgésicos que permiten al paciente relajarse por completo. A diferencia de la anestesia general, <strong className="text-[#4a6b53]">el niño no se duerme del todo</strong>: permanece despierto, respirando por sí mismo y sin sentir ansiedad ni dolor. 🌬️
              </p>
            </div>
          </div>

          {/* Columna Derecha: Imagen Polaroid Flotante y Animada */}
          <div className="relative h-[450px] lg:h-[500px] mt-10 lg:mt-0 flex justify-center items-center">
            {/* Fondo orgánico animado (Nube/Sueño) */}
            <div className="absolute inset-0 bg-[#f4a261]/10 rounded-[4rem] transform -rotate-6 opacity-100 -z-10 border-4 border-dashed border-[#a67b5b]/30 animate-pulse scale-90"></div>
            
            {/* Wrapper Cascada + Flotar */}
            <div className="absolute w-[75%] z-20 animate-reveal delay-300">
              <div className="animate-float-continuous group">
                <div className="bg-white p-4 pb-16 shadow-[0_20px_50px_rgba(166,123,91,0.3)] rounded-3xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 border-4 border-[#a67b5b] cursor-pointer relative">
                  
                  {/* Washi tape decorativo */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#f4a261] opacity-90 -rotate-2 shadow-sm"></div>
                  
                  <img src={imgSedacion} alt="Niño relajado" className="w-full h-auto aspect-[4/5] object-cover object-[center_40%] rounded-xl group-hover:opacity-90 transition-opacity" />
                  
                  <p className="absolute bottom-4 left-0 w-full text-center font-black text-[#6b584a] text-xl font-handwriting">¡Dulces sueños! 🌙</p>

                  {/* Efecto 'Zzz' al pasar el mouse (Hover) */}
                  <div className="absolute -top-10 -right-6 text-4xl text-[#f4a261] opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-700 font-black z-30">Z</div>
                  <div className="absolute -top-16 -right-0 text-5xl text-[#4a6b53] opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:-translate-y-8 transition-all duration-700 font-black z-30 delay-100">z</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= SECCIÓN 2: BENEFICIOS (Tarjetas 3D) ================= */}
        <div className="mt-16">
          <div className="text-center mb-12 animate-reveal delay-200">
            <h3 className="inline-block text-3xl md:text-4xl font-black text-[#6b584a] bg-white px-8 py-4 rounded-full border-4 border-[#6b584a] shadow-[6px_6px_0_#f4a261] transform -rotate-1 hover:rotate-1 transition-transform cursor-default">
              ¿Qué ventajas se obtienen? ⭐
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Ventaja 1 */}
            <div className="animate-reveal delay-300">
              <div className="bg-white p-8 rounded-[2.5rem] border-4 border-[#a67b5b] shadow-[8px_8px_0_#a67b5b] hover:-translate-y-3 transition-transform duration-300 group h-full flex flex-col">
                <div className="w-20 h-20 bg-[#fff5ea] rounded-full border-2 border-[#a67b5b] flex items-center justify-center text-4xl mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-sm mx-auto">
                  😌
                </div>
                <h4 className="font-black text-2xl text-[#a67b5b] mb-3 text-center">Tranquilidad Total</h4>
                <p className="text-gray-600 font-medium text-lg leading-relaxed text-center">
                  Elimina la ansiedad y el miedo en el paciente, haciendo que el tratamiento sea una experiencia positiva y calmada.
                </p>
              </div>
            </div>

            {/* Ventaja 2 */}
            <div className="animate-reveal delay-400">
              <div className="bg-white p-8 rounded-[2.5rem] border-4 border-[#4a6b53] shadow-[8px_8px_0_#4a6b53] hover:-translate-y-3 transition-transform duration-300 group h-full flex flex-col">
                <div className="w-20 h-20 bg-[#eaf4ed] rounded-full border-2 border-[#4a6b53] flex items-center justify-center text-4xl mb-6 transform group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300 shadow-sm mx-auto">
                  ⏱️
                </div>
                <h4 className="font-black text-2xl text-[#4a6b53] mb-3 text-center">Mayor Eficiencia</h4>
                <p className="text-gray-600 font-medium text-lg leading-relaxed text-center">
                  Al estar el niño relajado, el odontopediatra puede trabajar más rápido y realizar procedimientos complejos en una sola cita.
                </p>
              </div>
            </div>

            {/* Ventaja 3 */}
            <div className="animate-reveal delay-500">
              <div className="bg-white p-8 rounded-[2.5rem] border-4 border-[#f4a261] shadow-[8px_8px_0_#f4a261] hover:-translate-y-3 transition-transform duration-300 group h-full flex flex-col">
                <div className="w-20 h-20 bg-[#fff5ea] rounded-full border-2 border-[#f4a261] flex items-center justify-center text-4xl mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-sm mx-auto">
                  🚀
                </div>
                <h4 className="font-black text-2xl text-[#f4a261] mb-3 text-center">Recuperación Rápida</h4>
                <p className="text-gray-600 font-medium text-lg leading-relaxed text-center">
                  Los efectos del medicamento desaparecen rápidamente, permitiendo que el niño vuelva a su rutina habitual casi de inmediato.
                </p>
              </div>
            </div>

          </div>

          {/* Botón de Llamada a la Acción Final */}
          <div className="mt-16 text-center animate-reveal delay-600">
            <Link to="/reserva" className="inline-flex items-center gap-3 px-10 py-5 bg-[#4a6b53] text-white font-black text-xl rounded-full shadow-[0_8px_0_#2d3b32] hover:translate-y-[4px] hover:shadow-[0_4px_0_#2d3b32] transition-all duration-200">
              ¡Quiero más información! 💬
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Sedacion;