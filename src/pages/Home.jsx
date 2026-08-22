import { Link } from 'react-router-dom';

// Tus 10 fotos importadas
import paty2 from '../assets/paty2.jpeg';
import paty3 from '../assets/paty3.jpeg';
import paty4 from '../assets/paty4.jpeg';
import paty5 from '../assets/paty5.jpeg';
import paty6 from '../assets/paty6.jpeg';
import paty7 from '../assets/paty7.jpeg';
import paty8 from '../assets/paty8.jpeg';
import paty9 from '../assets/paty9.jpeg';
import paty10 from '../assets/paty10.jpeg';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans overflow-x-hidden relative">
      
      <style>{`
        /* ================= ANIMACIÓN DE ENTRADA ================= */
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.95) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Efecto de entrada "Reveal" con desplazamiento y fade */
        @keyframes reveal {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0; 
        }

        /* Clases de retraso para el efecto cascada */
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }

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
          animation: swing 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* ================= SELVA DE FONDO ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-between">
          <span className="absolute top-50 -left-10 md:-left-20 text-[15rem] md:text-[25rem] opacity-[0.10] transform -rotate-12 select-none">🦒</span>
          <span className="absolute -bottom-20 -right-10 md:-right-20 text-[15rem] md:text-[30rem] opacity-[0.10] transform rotate-12 select-none">🦁</span>
        </div>
        <div className="absolute top-[-1%] left-[-1%] text-[10rem] opacity-30 animate-swing">🌴</div>
        <div className="absolute top-[20%] right-[-5%] text-[12rem] opacity-20">🌳</div>
        <div className="absolute bottom-[10%] left-[-5%] text-[10rem] opacity-30 animate-swing" style={{animationDelay: '1s'}}>🌴</div>
      
        <div className="absolute top-[15%] right-[5%] text-[6rem] opacity-80 animate-bounce">🦏</div>
        <div className="absolute top-[60%] left-[2%] text-[7rem] opacity-70 transform -rotate-12">🐘</div>
        <div className="absolute bottom-[2%] right-[10%] text-[6rem] opacity-80 transform rotate-12">🦓</div>
  
        <div className="absolute top-[5%] left-[20%] w-[400px] h-[400px] bg-[#eaf4ed] rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#fff5ea] rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* ================= HERO SECTION (ARRIBA) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10 animate-scale-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LADO IZQUIERDO */}
          <div className="space-y-8 relative z-20 bg-white/40 backdrop-blur-sm p-6 rounded-3xl border-2 border-white lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none animate-reveal delay-100">
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-[#6b584a] leading-[1.1]">
              Pequeñas <span className="text-[#4a6b53]">Sonrisas,</span> 🐆<br />
              Grandes <span className="text-[#f4a261]">Inspiraciones</span> 
            </h1>
            <p className="text-xl text-gray-600 font-bold max-w-lg">
              🐾 Olvídate del miedo. Aquí venir al dentista es como ir de safari. Jugamos, aprendemos y cuidamos tus dientes para que seas el rey de la selva.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Link to="/reserva" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#4a6b53] text-white font-black text-xl rounded-full shadow-[0_8px_0_#2d3b32] hover:translate-y-[4px] hover:shadow-[0_4px_0_#2d3b32] transition-all duration-200">
                ¡Agendar Cita! 🚀
              </Link>
              <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-md font-bold text-[#6b584a] transform rotate-3">
                📍 Callao
              </div>
            </div>
          </div>

          {/* LADO DERECHO: Collage con Fotos */}
          <div className="relative w-full h-[550px] sm:h-[650px] lg:h-[700px] mt-10 lg:mt-0 animate-reveal delay-300">
            
            {/* Foto 1 */}
            <div className="absolute top-[0%] left-[0%] w-[42%] z-10 hover:z-[70]">
              <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/8 w-12 h-6 bg-[#ffb3ba] opacity-90 rotate-3"></div>
                <img src={paty7} alt="Aventura 1" className="w-full h-auto aspect-[4/3] object-cover object-[center_20%] rounded-lg" />
              </div>
            </div>

            {/* Foto 2 */}
            <div className="absolute top-[5%] right-[0%] w-[42%] z-20 hover:z-[70]">
              <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/8 w-12 h-6 bg-[#baffc9] opacity-90 -rotate-3"></div>
                <img src={paty2} alt="Aventura 2" className="w-full h-auto aspect-[4/3] object-cover object-top rounded-lg" />
              </div>
            </div>

            {/* Foto 3 */}
            <div className="absolute bottom-[5%] left-[2%] w-[42%] z-30 hover:z-[70]">
              <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/8 w-12 h-6 bg-[#bae1ff] opacity-90 rotate-2"></div>
                <img src={paty3} alt="Aventura 3" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
              </div>
            </div>

            {/* Foto 4 */}
            <div className="absolute bottom-[5%] right-[2%] w-[42%] z-10 hover:z-[70]">
              <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/8 w-12 h-6 bg-[#ffffba] opacity-90 -rotate-2"></div>
                <img src={paty4} alt="Aventura 4" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
              </div>
            </div>

            {/* Foto 5 (Centro) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] z-50 hover:z-[70]">
              <div className="animate-float-continuous w-full h-full">
                <div className="bg-white p-4 pb-16 shadow-[0_25px_60px_rgba(244,162,97,0.4)] rounded-2xl transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 border-4 border-[#f4a261] cursor-pointer relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#f4a261] opacity-90 -rotate-1 shadow-sm"></div>
                  <img src={paty5} alt="Aventura Principal" className="w-full h-auto aspect-[4/3] object-cover object-top rounded-xl" />
                  <p className="absolute bottom-3 left-0 w-full text-center font-black text-[#6b584a] text-lg sm:text-xl font-handwriting">¡Cero Lágrimas! 💙</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

     {/* ================= SECCIÓN DE SERVICIOS Y EXPERIENCIA ================= */}
      <div className="relative py-20 bg-[#eaf4ed] z-10 border-y-[12px] border-dashed border-[#4a6b53]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-20 relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-8xl animate-bounce">🦍</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#6b584a] bg-white inline-block px-10 py-6 rounded-[2rem] border-4 border-[#6b584a] shadow-[8px_8px_0_#f4a261] transform -rotate-1">
              4 años de experiencia <br className="hidden md:block"/>
              tratando a más de <span className="text-[#4a6b53]">3,500 pacientitos</span> 🐾
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="animate-float-continuous" style={{ animationDelay: '0s' }}>
              <div className="bg-[#fffbf7] h-full p-8 rounded-[3rem] border-4 border-[#4a6b53] shadow-[8px_8px_0_#4a6b53] hover:-translate-y-2 transition-transform duration-300 text-center relative group flex flex-col justify-between transform md:-translate-y-6">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🦷</div>
                  <h3 className="text-2xl font-black text-[#4a6b53] mb-4">Odontopediatría</h3>
                  <p className="text-gray-600 font-bold mb-6 text-sm leading-relaxed">
                    Cuidamos su sonrisa desde los primeros dientecitos con prevención y tratamientos pensados para cada etapa. ¡Prevenir hoy es sonreír toda la vida!
                  </p>
                </div>
                <div>
                  <Link to="/odontopediatria" className="inline-block px-6 py-3 bg-[#4a6b53] text-white font-black rounded-full hover:bg-[#f4a261] transition-colors">¡Quiero ver! 👀</Link>
                </div>
              </div>
            </div>

            <div className="animate-float-continuous" style={{ animationDelay: '1.5s' }}>
              <div className="bg-[#fffbf7] h-full p-8 rounded-[3rem] border-4 border-[#6b584a] shadow-[8px_8px_0_#6b584a] hover:-translate-y-2 transition-transform duration-300 text-center relative group flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">📏</div>
                  <h3 className="text-2xl font-black text-[#6b584a] mb-4">Ortopedia & Ortodoncia</h3>
                  <p className="text-gray-600 font-bold mb-6 text-sm leading-relaxed">
                    Evaluamos su desarrollo para guiar la posición de los maxilares y dientes en el momento ideal, logrando una sonrisa saludable y funcional.
                  </p>
                </div>
                <div>
                  <Link to="/ortopedia-ortodoncia" className="inline-block px-6 py-3 bg-[#6b584a] text-white font-black rounded-full hover:bg-[#f4a261] transition-colors">¡Quiero ver! 👀</Link>
                </div>
              </div>
            </div>

            <div className="animate-float-continuous" style={{ animationDelay: '3s' }}>
              <div className="bg-[#fffbf7] h-full p-8 rounded-[3rem] border-4 border-[#f4a261] shadow-[8px_8px_0_#f4a261] hover:-translate-y-2 transition-transform duration-300 text-center relative group flex flex-col justify-between transform md:-translate-y-6">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">💤</div>
                  <h3 className="text-2xl font-black text-[#f4a261] mb-4">Sedaciones</h3>
                  <p className="text-gray-600 font-bold mb-6 text-sm leading-relaxed">
                    ¿Mucho miedo al dentista? Contamos con opciones de sedación consciente e intermedia seguras para que su experiencia sea súper cómoda y sin lágrimas.
                  </p>
                </div>
                <div>
                  <Link to="/sedaciones" className="inline-block px-6 py-3 bg-[#f4a261] text-white font-black rounded-full hover:bg-[#6b584a] transition-colors">¡Quiero ver! 👀</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SECCIÓN DE VISIÓN (NUEVO TEXTO "QUIÉNES SOMOS") ================= */}
      <div className="relative py-24 lg:py-32 bg-[#fdfbf7] overflow-hidden z-10 border-t-8 border-dashed border-[#4a6b53]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-between">
              <span className="absolute top-10 -left-10 md:-left-20 text-[15rem] md:text-[25rem] opacity-[0.20] transform -rotate-12 select-none">🦒</span>
              <span className="absolute -bottom-20 -right-10 md:-right-20 text-[15rem] md:text-[30rem] opacity-[0.20] transform rotate-12 select-none">🦁</span>
            </div>
            
            {/* TEXTOS (Izquierda) */}
            <div className="lg:col-span-5 space-y-8 relative">
              <div className="absolute -top-12 -left-10 text-6xl opacity-30 animate-swing">🐒</div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#6b584a] leading-tight">
                ¿Quiénes <br/>
                <span className="text-[#4a6b53]">somos?</span> 💙
              </h2>
              
              <div className="space-y-8 text-gray-600 text-lg font-bold leading-relaxed">
                <p>
                  En <strong className="text-[#4a6b53] text-2xl font-black">Sonriendo Dental Kids</strong> cuidamos la sonrisa de cada niño con odontopediatría, ortopedia maxilar y ortodoncia, brindando atención personalizada, preventiva y especializada.
                </p>
                
                {/* Tarjeta destacada para el segundo párrafo */}
                <div className="bg-[#fff5ea] p-6 sm:p-8 rounded-[2rem] border-4 border-[#f4a261] transform transition-all duration-300 hover:-translate-y-2 hover:rotate-1 shadow-[8px_8px_0_#f4a261]">
                  <p className="text-[#6b584a] font-black text-xl sm:text-2xl leading-tight">
                    Creamos <span className="text-[#f4a261]">experiencias positivas</span> en el dentista, acompañando a cada pequeño en cada etapa de su crecimiento. 🦷✨
                  </p>
                </div>
              </div>
            </div>

            {/* COLLAGE GIGANTE (Derecha) - Animación principal en el contenedor */}
            <div className="lg:col-span-7 relative w-full h-[550px] sm:h-[650px] lg:h-[750px] animate-reveal delay-300">
              
              <div className="absolute top-[0%] left-[0%] w-[42%] z-10 hover:z-[70]">
                <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#ffdfba] opacity-90 rotate-2"></div>
                  <img src={paty6} alt="Cuidado dental" className="w-full h-auto aspect-[4/3] object-cover object-top rounded-lg" />
                </div>
              </div>

              <div className="absolute top-[0%] right-[0%] w-[42%] z-20 hover:z-[70]">
                <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#eaf4ed] opacity-90 -rotate-3"></div>
                  <img src={paty7} alt="Doctora y niños" className="w-full h-auto aspect-[4/3] object-cover object-top rounded-lg" />
                </div>
              </div>

              <div className="absolute bottom-[0%] left-[2%] w-[42%] z-30 hover:z-[70]">
                <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#f4f9f5] opacity-90 rotate-4"></div>
                  <img src={paty8} alt="Niño jugando" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
                </div>
              </div>

              <div className="absolute bottom-[0%] right-[2%] w-[42%] z-40 hover:z-[70]">
                <div className="bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 border border-gray-200 relative cursor-pointer group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#fff5ea] opacity-90 -rotate-2"></div>
                  <img src={paty9} alt="Tratamiento feliz" className="w-full h-auto aspect-[4/3] object-cover object-top rounded-lg" />
                  <div className="absolute -bottom-6 -right-6 text-6xl animate-bounce">🐊</div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] z-50 hover:z-[70]">
                <div className="animate-float-continuous w-full h-full" style={{animationDelay: '1s'}}>
                  <div className="bg-white p-4 pb-16 shadow-[0_25px_60px_rgba(244,162,97,0.4)] rounded-2xl border-4 border-sonriendo-yellow transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-sonriendo-yellow opacity-90 rotate-1 shadow-sm"></div>
                    <img src={paty10} alt="Centro de diversión" className="w-full h-auto aspect-[4/3] object-cover object-top rounded-xl" />
                    
                    <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 text-5xl sm:text-6xl animate-swing origin-top-right">🐒</div>
                    <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-white px-4 py-2 sm:px-6 rounded-full border-4 border-sonriendo-yellow shadow-lg font-black text-[#6b584a] whitespace-nowrap text-xs sm:text-base">
                      ¡Diversión Asegurada! ⭐
                    </div>
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

export default Home;