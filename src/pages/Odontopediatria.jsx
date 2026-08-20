import { Link } from 'react-router-dom';
import imgOdonto1 from '../assets/imagen3.jpg'; 
import imgOdonto2 from '../assets/imagen4.jpg';

const Odontopediatria = () => {
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

      {/* ================= HEADER HERO - BOSQUE MÁGICO ================= */}
      <div className="relative pt-15 pb-20 bg-gradient-to-br from-[#4a6b53] to-[#2d3b32] overflow-hidden text-center z-10 animate-reveal">
        
        {/* Emojis flotantes interactivos */}
        <div className="absolute top-16 left-[10%] text-6xl opacity-40 animate-swing cursor-default hover:scale-125 transition-transform duration-300">🍃</div>
        <div className="absolute bottom-12 left-[20%] text-5xl opacity-30 animate-float-continuous cursor-default">🦒</div>
        <div className="absolute bottom-10 right-[15%] text-6xl opacity-30 cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300 animate-bounce">🧚‍♀️</div>
        <div className="absolute top-10 right-[25%] text-5xl opacity-40 animate-swing" style={{ animationDelay: '1s' }}>✨</div>
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#f4a261] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-white rounded-full mix-blend-overlay opacity-10 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          <div className="inline-block px-5 py-2 rounded-full bg-white/10 text-[#fdfbf7] font-black text-sm tracking-widest uppercase mb-4 backdrop-blur-md border border-white/20 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
            🦷 Magia para los más pequeños
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl transform transition-all duration-500 hover:scale-105 leading-tight">
            Odontopediatría
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-bold bg-black/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Link to="/" className="hover:text-[#f4a261] transition-colors">Inicio</Link> 
            <span>/</span> 
            <span className="text-[#f4a261]">Odontopediatría</span>
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
        
        {/* Sección 1: Textos y Collage de Polaroids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Columna Izquierda: Textos con Animación en cascada */}
          <div className="space-y-6 animate-reveal delay-100">
            <h2 className="text-3xl lg:text-4xl font-black text-[#4a6b53] mb-6 flex items-center gap-3 bg-white inline-block px-6 py-3 rounded-2xl border-2 border-[#4a6b53] shadow-[4px_4px_0_#f4a261] transform -rotate-1">
              <span className="text-4xl animate-bounce">✨</span> Prevención y Magia
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed font-bold">
              <span className="float-left bg-[#f4a261] text-white text-5xl font-black rounded-2xl px-5 py-3 mr-4 mb-2 shadow-[4px_4px_0_#4a6b53] transform rotate-3 hover:rotate-0 transition-transform">
                L
              </span>
              a Odontopediatría es la rama dedicada a cuidar las sonrisas de los más pequeños. En nuestra clínica, transformamos el miedo a lo desconocido en una <strong className="text-[#f4a261]">aventura divertida.</strong>
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Nos enfocamos en la prevención de enfermedades orales y en educar a los niños y papás sobre la higiene correcta, asegurando que sus dientes de leche y definitivos crezcan sanos y fuertes. 🦁
            </p>

            <div className="pt-6">
              <Link to="/reserva" className="inline-flex items-center gap-3 px-8 py-4 bg-[#f4a261] text-white font-black text-xl rounded-full shadow-[0_8px_0_#e76f51] hover:translate-y-[4px] hover:shadow-[0_4px_0_#e76f51] transition-all duration-200">
                ¡Agendar Aventura! 🗺️
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Collage de 2 Fotos Flotantes */}
          <div className="relative h-[450px] lg:h-[500px] mt-10 lg:mt-0 flex justify-center items-center">
            {/* Fondo orgánico animado */}
            <div className="absolute inset-0 bg-[#fff5ea] rounded-full transform rotate-12 opacity-60 -z-10 border-4 border-dashed border-[#f4a261]/30 animate-pulse scale-90"></div>
            
            {/* Foto 1 (Arriba Derecha) - Cascada + Flotar */}
            <div className="absolute top-[5%] right-[5%] w-[55%] z-20 animate-reveal delay-300">
              <div className="animate-float-continuous" style={{ animationDelay: '0s' }}>
                <div className="bg-white p-3 pb-14 shadow-[0_15px_30px_rgba(74,107,83,0.2)] rounded-2xl transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 border-2 border-[#4a6b53] cursor-pointer relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#f4a261] opacity-90 -rotate-3 shadow-sm"></div>
                  <img src={imgOdonto1} alt="Niño feliz" className="w-full h-auto aspect-[4/5] object-cover object-[center_30%] rounded-xl" />
                  <p className="absolute bottom-3 left-0 w-full text-center font-black text-[#6b584a] text-lg font-handwriting">¡Cero miedos!</p>
                </div>
              </div>
            </div>

            {/* Foto 2 (Abajo Izquierda) - Cascada + Flotar */}
            <div className="absolute bottom-[5%] left-[5%] w-[55%] z-30 animate-reveal delay-400">
              <div className="animate-float-continuous" style={{ animationDelay: '1.5s' }}>
                <div className="bg-white p-3 pb-14 shadow-[0_20px_40px_rgba(244,162,97,0.3)] rounded-2xl transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 border-4 border-[#f4a261] cursor-pointer relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#4a6b53] opacity-90 rotate-2 shadow-sm"></div>
                  <img src={imgOdonto2} alt="Tratamiento" className="w-full h-auto aspect-[4/5] object-cover object-[center_30%] rounded-xl" />
                  <p className="absolute bottom-3 left-0 w-full text-center font-black text-[#6b584a] text-lg font-handwriting">Sonrisas sanas 💙</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* ================= SECCIÓN 2: DIFERENCIADORES (Diseño Premium) ================= */}
        <div className="animate-reveal delay-500">
          <div className="bg-[#fff5ea] rounded-[3rem] p-10 lg:p-16 relative overflow-hidden border-4 border-[#f4a261] shadow-[12px_12px_0_#f4a261]">
            
            {/* Decoraciones de fondo */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute bottom-5 left-5 text-6xl opacity-20 animate-swing">🦷</div>
            
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#6b584a]">
                ¿Qué hace a nuestro Odontopediatra <span className="text-[#4a6b53]">diferente?</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Tarjeta 1 */}
              <div className="bg-white p-8 rounded-3xl border-2 border-[#4a6b53] shadow-[6px_6px_0_#4a6b53] transform hover:-translate-y-2 transition-transform duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#eaf4ed] border-2 border-[#4a6b53] flex items-center justify-center text-3xl group-hover:bg-[#4a6b53] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <span className="group-hover:animate-bounce">🛡️</span>
                  </div>
                  <div>
                    <h4 className="font-black text-2xl text-[#4a6b53] mb-3">Entrenamiento Especializado</h4>
                    <p className="text-gray-600 font-bold text-lg leading-relaxed">
                      Años de estudio adicionales enfocados 100% en el manejo del comportamiento infantil y desarrollo maxilar temprano.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Tarjeta 2 */}
              <div className="bg-white p-8 rounded-3xl border-2 border-[#f4a261] shadow-[6px_6px_0_#f4a261] transform hover:-translate-y-2 transition-transform duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#fff5ea] border-2 border-[#f4a261] flex items-center justify-center text-3xl group-hover:bg-[#f4a261] group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <span className="group-hover:animate-bounce">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-black text-2xl text-[#f4a261] mb-3">Psicología Infantil</h4>
                    <p className="text-gray-600 font-bold text-lg leading-relaxed">
                      Usamos juegos, recompensas visuales y mucha empatía para que los niños participen felices y eliminen sus miedos al sillón dental.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Odontopediatria;