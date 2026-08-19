import { Link } from 'react-router-dom';

// Tus 10 fotos importadas
import paty1 from '../assets/paty1.jpeg';
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
      
      {/* ================= ANIMACIONES SAFARI CONTINUAS ================= */}
      <style>{`
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
      `}</style>

      {/* ================= SELVA DE FONDO (Animales y Hojas) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-[-5%] left-[-2%] text-[10rem] opacity-30 animate-swing">🌴</div>
        <div className="absolute top-[20%] right-[-5%] text-[12rem] opacity-20">🌳</div>
        <div className="absolute bottom-[10%] left-[-5%] text-[10rem] opacity-30 animate-swing" style={{animationDelay: '1s'}}>🌴</div>
        
        <div className="absolute top-[12%] right-[5%] text-[6rem] opacity-80 animate-bounce">🦒</div>
        <div className="absolute top-[60%] left-[2%] text-[7rem] opacity-70 transform -rotate-12">🐘</div>
        <div className="absolute bottom-[2%] right-[10%] text-[6rem] opacity-80 transform rotate-12">🦓</div>
        
        <div className="absolute top-[5%] left-[20%] w-[400px] h-[400px] bg-[#eaf4ed] rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#fff5ea] rounded-full blur-[80px] opacity-70"></div>
      </div>

      {/* ================= HERO SECTION (ARRIBA) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LADO IZQUIERDO: Textos Divertidos */}
          <div className="space-y-8 relative z-20 bg-white/40 backdrop-blur-sm p-6 rounded-3xl border-2 border-white lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f4a261] text-white font-black text-sm tracking-widest uppercase shadow-lg transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
              <span className="text-xl animate-spin-slow">🧭</span> ¡Odontopediatría de Aventura!
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-[#6b584a] leading-[1.1]">
              Pequeñas <span className="text-[#4a6b53]">Sonrisas,</span> <br />
              Grandes <span className="text-[#f4a261]">Inspiraciones</span> 🦖
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

          {/* LADO DERECHO: Collage con Fotos Grandes y Visibles */}
          <div className="relative w-full h-[550px] sm:h-[650px] lg:h-[700px] mt-10 lg:mt-0">
            
            {/* Foto 1 - Atrás Izquierda (Más grande: 42%) */}
            <div className="absolute top-[0%] left-[0%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-10 border border-gray-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#ffb3ba] opacity-90 rotate-3"></div>
              <img src={paty1} alt="Aventura 1" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
            </div>

            {/* Foto 2 - Atrás Derecha (Más grande: 42%) */}
            <div className="absolute top-[5%] right-[0%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-6 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-20 border border-gray-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#baffc9] opacity-90 -rotate-3"></div>
              <img src={paty2} alt="Aventura 2" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
            </div>

            {/* Foto 3 - Abajo Izquierda (Más grande: 42%) */}
            <div className="absolute bottom-[5%] left-[2%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-3 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-30 border border-gray-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#bae1ff] opacity-90 rotate-2"></div>
              <img src={paty3} alt="Aventura 3" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
            </div>

            {/* Foto 4 - Abajo Derecha (Más grande: 42%) */}
            <div className="absolute bottom-[5%] right-[2%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-40 border border-gray-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#ffffba] opacity-90 -rotate-2"></div>
              <img src={paty4} alt="Aventura 4" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
            </div>

            {/* Foto 5 - CENTRO EXACTO (Grande (52%) y con animación flotante continua garantizada) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] z-50 animate-float-continuous">
              <div className="bg-white p-4 pb-16 shadow-[0_25px_60px_rgba(244,162,97,0.4)] rounded-2xl transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 border-4 border-[#f4a261] cursor-pointer relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#f4a261] opacity-90 -rotate-1 shadow-sm"></div>
                <img src={paty5} alt="Aventura Principal" className="w-full h-auto aspect-[4/3] object-cover rounded-xl" />
                <p className="absolute bottom-3 left-0 w-full text-center font-black text-[#6b584a] text-lg sm:text-xl font-handwriting">¡Cero Lágrimas! 💙</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SECCIÓN DE SERVICIOS Y EXPERIENCIA ================= */}
      <div className="relative py-20 bg-[#eaf4ed] z-10 border-y-[12px] border-dashed border-[#4a6b53]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-20 relative">
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 text-6xl animate-bounce">🦒</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#6b584a] bg-white inline-block px-10 py-6 rounded-[2rem] border-4 border-[#6b584a] shadow-[8px_8px_0_#f4a261] transform -rotate-1">
              4 años de experiencia <br className="hidden md:block"/>
              tratando a más de <span className="text-[#4a6b53]">3,500 pacientitos</span> 🐾
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Ortodoncia */}
            <div className="animate-float-continuous" style={{ animationDelay: '0s' }}>
              <div className="bg-[#fffbf7] h-full p-8 rounded-[3rem] border-4 border-[#6b584a] shadow-[8px_8px_0_#6b584a] hover:-translate-y-2 transition-transform duration-300 text-center relative group flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">📏</div>
                  <h3 className="text-2xl font-black text-[#6b584a] mb-4">Ortodoncia Fija</h3>
                  <p className="text-gray-600 font-bold mb-6 text-sm leading-relaxed">
                    Alineamos la sonrisa de los más pequeños. Con el uso de brackets, corregimos la postura dental para devolverles una masticación perfecta y una estética natural y hermosa.
                  </p>
                </div>
                <div>
                  <Link to="/ortodoncia" className="inline-block px-6 py-3 bg-[#6b584a] text-white font-black rounded-full hover:bg-[#f4a261] transition-colors">¡Quiero ver! 👀</Link>
                </div>
              </div>
            </div>

            {/* Odontopediatría */}
            <div className="animate-float-continuous" style={{ animationDelay: '1.5s' }}>
              <div className="bg-[#fffbf7] h-full p-8 rounded-[3rem] border-4 border-[#4a6b53] shadow-[8px_8px_0_#4a6b53] hover:-translate-y-2 transition-transform duration-300 text-center relative group transform md:-translate-y-6 flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">🦷</div>
                  <h3 className="text-2xl font-black text-[#4a6b53] mb-4">Odontopediatría</h3>
                  <p className="text-gray-600 font-bold mb-6 text-sm leading-relaxed">
                    Protegemos su salud bucal desde el primer diente. Ofrecemos curaciones, sellantes y limpiezas en un ambiente lleno de juegos para que le pierdan el miedo al dentista.
                  </p>
                </div>
                <div>
                  <Link to="/odontopediatria" className="inline-block px-6 py-3 bg-[#4a6b53] text-white font-black rounded-full hover:bg-sonriendo-yellow transition-colors">¡Quiero ver! 👀</Link>
                </div>
              </div>
            </div>

            {/* Sedación Consciente */}
            <div className="animate-float-continuous" style={{ animationDelay: '3s' }}>
              <div className="bg-[#fffbf7] h-full p-8 rounded-[3rem] border-4 border-[#f4a261] shadow-[8px_8px_0_#f4a261] hover:-translate-y-2 transition-transform duration-300 text-center relative group flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">💤</div>
                  <h3 className="text-2xl font-black text-[#f4a261] mb-4">Sedación Consciente</h3>
                  <p className="text-gray-600 font-bold mb-6 text-sm leading-relaxed">
                    Para los niños más ansiosos, brindamos alternativas seguras de relajación. Así logramos que reciban su tratamiento de forma tranquila, sin dolor y sin lágrimas.
                  </p>
                </div>
                <div>
                  <Link to="/sedacion" className="inline-block px-6 py-3 bg-[#f4a261] text-white font-black rounded-full hover:bg-[#6b584a] transition-colors">¡Quiero ver! 👀</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SECCIÓN DE VISIÓN ================= */}
      <div className="relative py-24 lg:py-32 bg-[#fdfbf7] overflow-hidden z-10 border-t-8 border-dashed border-[#4a6b53]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* TEXTOS (Izquierda) */}
            <div className="lg:col-span-5 space-y-8 relative">
              <div className="absolute -top-12 -left-10 text-6xl opacity-30 animate-swing">🐒</div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#6b584a] leading-tight">
                Dibujamos sonrisas <br/>
                <span className="text-[#4a6b53]">valientes</span> para toda la vida 🏕️
              </h2>
              
              <div className="space-y-4 text-gray-600 text-lg font-bold leading-relaxed">
                <p>
                  En <strong className="text-[#4a6b53] text-xl">Sonriendo Dental Kids</strong> somos una clínica especializada en Odontopediatría y Ortodoncia, dedicada a cuidar la salud bucal de bebés, niños y adolescentes, acompañándolos en cada etapa de su crecimiento.
                </p>
                <p>
                  Creemos que una visita al dentista debe ser una experiencia <strong className="text-[#f4a261]">positiva, segura y libre de miedo</strong>. Por eso, brindamos una atención personalizada, enfocada no solo en tratar problemas dentales, sino también en prevenirlos y enseñar buenos hábitos desde pequeños.
                </p>
                <p>
                  Contamos con profesionales especializados y tecnología pensada para ofrecer una atención moderna, cuidadosa y adaptada a las necesidades de cada paciente.
                </p>
              </div>

              {/* Tarjeta de Misión destacada */}
              <div className="bg-[#fff5ea] p-6 rounded-[2rem] border-4 border-[#f4a261] transform transition-all duration-300 hover:rotate-2 shadow-[6px_6px_0_#f4a261]">
                <div className="flex gap-4 items-center">
                  <span className="text-5xl animate-bounce">💙</span>
                  <p className="font-black text-[#6b584a] text-xl leading-tight">
                    Nuestro objetivo es que cada niño se sienta seguro, escuchado y feliz de venir al dentista.
                  </p>
                </div>
              </div>
            </div>

            {/* COLLAGE GIGANTE (Derecha) - Fotos 6 a 10 Grandes y Visibles */}
            <div className="lg:col-span-7 relative w-full h-[550px] sm:h-[650px] lg:h-[750px]">
              
              {/* Foto 6 */}
              <div className="absolute top-[0%] left-[0%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-3 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-10 border border-gray-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#ffdfba] opacity-90 rotate-2"></div>
                <img src={paty6} alt="Cuidado dental" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
              </div>

              {/* Foto 7 */}
              <div className="absolute top-[0%] right-[0%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-6 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-20 border border-gray-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#eaf4ed] opacity-90 -rotate-3"></div>
                <img src={paty7} alt="Doctora y niños" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
              </div>

              {/* Foto 8 */}
              <div className="absolute bottom-[0%] left-[2%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform rotate-3 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-30 border border-gray-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#f4f9f5] opacity-90 rotate-4"></div>
                <img src={paty8} alt="Niño jugando" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
              </div>

              {/* Foto 9 */}
              <div className="absolute bottom-[0%] right-[2%] w-[42%] bg-white p-3 pb-12 shadow-xl rounded-xl transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-[60] transition-all duration-300 z-40 border border-gray-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#fff5ea] opacity-90 -rotate-2"></div>
                <img src={paty9} alt="Tratamiento feliz" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
                <div className="absolute -bottom-6 -right-6 text-6xl animate-bounce">🐊</div>
              </div>

              {/* Foto 10 - CENTRO ANIMADO GRANDE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] z-50 animate-float-continuous" style={{animationDelay: '1s'}}>
                <div className="bg-white p-4 pb-16 shadow-[0_25px_60px_rgba(244,162,97,0.4)] rounded-2xl border-4 border-sonriendo-yellow transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-sonriendo-yellow opacity-90 rotate-1 shadow-sm"></div>
                  <img src={paty10} alt="Centro de diversión" className="w-full h-auto aspect-[4/3] object-cover rounded-xl" />
                  
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
  );
};

export default Home;