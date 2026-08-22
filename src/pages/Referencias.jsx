import { Link } from 'react-router-dom';

// IMPORTACIONES EXACTAS SEGÚN TU CAPTURA DE PANTALLA
import m1 from '../assets/m1.jpeg'; 
import m2 from '../assets/m2.jpeg'; // Asumiendo que es jpeg por la captura
import m3 from '../assets/m3.jpeg';
import m4 from '../assets/m4.jpeg';
import m5 from '../assets/m5.jpeg';
import m6 from '../assets/m6.png';
import m7 from '../assets/m7.png';
import m8 from '../assets/m8.png';

const Referencias = () => {
  // Lista de las 8 reseñas visuales con sus colores temáticos Safari
  const testimonios = [
    {
      id: 1,
      foto: m1, 
      colorBorde: "#f4a261",
      washiColor: "#ffb3ba",
      delay: "delay-100",
      floatDelay: "0s"
    },
    {
      id: 2,
      foto: m2, 
      colorBorde: "#4a6b53",
      washiColor: "#bae1ff",
      delay: "delay-200",
      floatDelay: "1s"
    },
    {
      id: 3,
      foto: m3,
      colorBorde: "#e76f51",
      washiColor: "#baffc9",
      delay: "delay-300",
      floatDelay: "2s"
    },
    {
      id: 4,
      foto: m4,
      colorBorde: "#f4a261",
      washiColor: "#ffffba",
      delay: "delay-400",
      floatDelay: "1.5s"
    },
    {
      id: 5,
      foto: m5,
      colorBorde: "#4a6b53",
      washiColor: "#ffdfba",
      delay: "delay-500",
      floatDelay: "0.5s"
    },
    {
      id: 6,
      foto: m6,
      colorBorde: "#e76f51",
      washiColor: "#e3d1c3",
      delay: "delay-600",
      floatDelay: "2.5s"
    },
    {
      id: 7,
      foto: m7,
      colorBorde: "#f4a261",
      washiColor: "#cbaacb",
      delay: "delay-100",
      floatDelay: "0.8s"
    },
    {
      id: 8,
      foto: m8,
      colorBorde: "#4a6b53",
      washiColor: "#ffcfdc",
      delay: "delay-200",
      floatDelay: "1.8s"
    }
  ];

  return (
    <div className="bg-[#fdfbf7] min-h-screen relative overflow-hidden font-sans text-gray-800">
      
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
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
        .delay-600 { animation-delay: 600ms; }
      `}</style>

      {/* ================= ANIMALITOS GIGANTES DE FONDO ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-1/4 -left-10 text-[25rem] opacity-[0.15] transform -rotate-6 select-none">
          🦒
        </span>
        <span className="absolute top-2/3 -right-10 text-[25rem] opacity-[0.15] transform rotate-12 select-none">
          🐘
        </span>
        <span className="absolute top-[85%] -left-10 text-[20rem] opacity-[0.15] transform -rotate-12 select-none">
          🦛
        </span>
      </div>

      {/* ================= HEADER HERO - MURO DE EXPLORADORES ================= */}
      <div className="relative pt-30 pb-24 bg-gradient-to-br from-[#f4a261] to-[#e76f51] overflow-hidden text-center z-10 animate-reveal shadow-md">
        
        {/* Emojis flotantes del Header */}
        <div className="absolute top-16 left-[12%] text-8xl opacity-40 animate-swing cursor-default">⭐</div>
        <div className="absolute bottom-12 left-[20%] text-8xl opacity-30 animate-float-continuous cursor-default">🦁</div>
        <div className="absolute top-30 right-[25%] text-8xl opacity-30 animate-swing" style={{ animationDelay: '1s' }}>📸</div>
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#ffdfba] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-xl transform transition-all duration-500 hover:scale-105 leading-tight">
            Aventureros <span className="text-[#ffe066]">Felices</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-bold bg-black/10 inline-flex px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link> 
            <span>/</span> 
            <span className="text-white">Testimonios</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-[#fdfbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* ================= CONTENIDO: GRID DE RESEÑAS 3D FLOTANTES ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        
        {/* Título de Google Maps */}
        <div className="text-center mb-16 animate-reveal delay-100 flex flex-col items-center justify-center">
          <div className="bg-white px-8 py-4 rounded-full border-4 border-gray-100 shadow-xl inline-flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
            <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="text-xl font-black text-gray-700">Reseñas Verificadas en Google Maps</span>
          </div>
        </div>

        {/* Cuadrícula de Marcos para Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {testimonios.map((item) => (
            <div key={item.id} className={`animate-reveal ${item.delay}`}>
              
              {/* Contenedor con animación flotante continua */}
              <div className="animate-float-continuous h-full" style={{ animationDelay: item.floatDelay }}>
                
                {/* Tarjeta Estilo Marco Safari */}
                <div 
                  className="bg-white rounded-[2rem] p-3 pt-6 relative group h-full flex flex-col justify-center transform hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300"
                  style={{
                    border: `4px solid ${item.colorBorde}`,
                    boxShadow: `8px 8px 0 ${item.colorBorde}`
                  }}
                >
                  
                  {/* Cinta Washi Tape de Papel */}
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 opacity-90 rotate-2 shadow-sm z-20 rounded-sm"
                    style={{ backgroundColor: item.washiColor }}
                  ></div>

                  {/* Imagen de la Reseña */}
                  {item.foto && (
                    <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center h-full">
                      <img 
                        src={item.foto} 
                        alt={`Reseña de Google Maps ${item.id}`} 
                        className="w-full h-auto object-contain transform group-hover:scale-[1.03] transition-transform duration-500" 
                      />
                    </div>
                  )}

                  {/* Huellita Safari decorativa (Flotando en la esquina) */}
                  <div 
                    className="absolute -bottom-5 -right-5 w-12 h-12 bg-white rounded-full border-4 flex items-center justify-center text-xl transform rotate-12 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300 shadow-sm"
                    style={{ borderColor: item.colorBorde }}
                  >
                    🐾
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* ================= BOTÓN FINAL LLAMADA A LA ACCIÓN ================= */}
        <div className="mt-28 text-center animate-reveal delay-600 z-10 relative">
          <div className="bg-[#fff5ea] border-4 border-[#f4a261] rounded-[3rem] p-10 max-w-3xl mx-auto shadow-[8px_8px_0_#f4a261] relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl animate-bounce">⛺</div>
            <h3 className="text-3xl font-black text-[#6b584a] mb-4 mt-2">¿Listo para que tu pequeño viva la misma experiencia?</h3>
            <p className="text-gray-600 font-bold text-lg mb-8">Reserva su cita hoy y forma parte de nuestra gran familia de aventureros.</p>
            <Link to="/reserva" className="inline-flex items-center gap-3 px-10 py-5 bg-[#4a6b53] text-white font-black text-xl rounded-full shadow-[0_8px_0_#2d3b32] hover:translate-y-[4px] hover:shadow-[0_4px_0_#2d3b32] transition-all duration-200">
              ¡Quiero Agendar mi Cita! 🚀
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Referencias;