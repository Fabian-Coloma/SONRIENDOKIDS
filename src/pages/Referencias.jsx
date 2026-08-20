import { Link } from 'react-router-dom';

// IMPORTACIÓN DE LAS FOTOS REALES EN FORMATO JPEG
import foto1 from '../assets/paty1.jpeg'; 
import foto2 from '../assets/paty2.jpeg';
import foto3 from '../assets/paty3.jpeg';
import foto6 from '../assets/paty6.jpeg';
import foto7 from '../assets/paty7.jpeg';
import foto10 from '../assets/paty10.jpeg';

const Referencias = () => {
  // Lista de reseñas con las 6 fotos asignadas y colores temáticos Safari
  const testimonios = [
    {
      id: 1,
      nombre: "María Fernanda P.",
      estrellas: "⭐⭐⭐⭐⭐",
      texto: "¡La Dra. Patty es un ángel! Mi pequeño le tenía terror al dentista y ahora pregunta cuándo vamos a volver al 'campamento'. Tratamiento sin dolor y con muchísimo amor.",
      foto: foto1, 
      colorBorde: "#f4a261",
      washiColor: "#ffb3ba",
      delay: "delay-100",
      floatDelay: "0s"
    },
    {
      id: 2,
      nombre: "Carlos Ruiz",
      estrellas: "⭐⭐⭐⭐⭐",
      texto: "Excelente servicio. Las instalaciones son hermosas y la paciencia que tienen con los niños de verdad vale oro. Explican todo súper bien. 100% recomendados.",
      foto: foto2, 
      colorBorde: "#4a6b53",
      washiColor: "#bae1ff",
      delay: "delay-200",
      floatDelay: "1s"
    },
    {
      id: 3,
      nombre: "Lucía Gómez",
      estrellas: "⭐⭐⭐⭐⭐",
      texto: "Llevé a mi niña para ortodoncia y el resultado es mágico. El lugar está diseñado para que no se aburran. ¡La mejor clínica pediátrica del Callao!",
      foto: foto3,
      colorBorde: "#e76f51",
      washiColor: "#baffc9",
      delay: "delay-300",
      floatDelay: "2s"
    },
    {
      id: 4,
      nombre: "Familia Torres",
      estrellas: "⭐⭐⭐⭐⭐",
      texto: "La sedación consciente fue un éxito total. Mi hijo ni se enteró del tratamiento. Mucha profesionalidad y calidez humana. Estamos muy agradecidos.",
      foto: foto6,
      colorBorde: "#f4a261",
      washiColor: "#ffffba",
      delay: "delay-400",
      floatDelay: "1.5s"
    },
    {
      id: 5,
      nombre: "Andrea V.",
      estrellas: "⭐⭐⭐⭐⭐",
      texto: "Increíble experiencia. Desde que entras la atención es A1. A mi hija le regalaron un globito al terminar. ¡Cero lágrimas!",
      foto: foto7,
      colorBorde: "#4a6b53",
      washiColor: "#ffdfba",
      delay: "delay-500",
      floatDelay: "0.5s"
    },
    {
      id: 6,
      nombre: "Roberto Mendoza",
      estrellas: "⭐⭐⭐⭐⭐",
      texto: "Buscaba un lugar especializado en niños y superaron mis expectativas. Todo súper limpio, lúdico y la doctora transmite muchísima paz.",
      foto: foto10,
      colorBorde: "#e76f51",
      washiColor: "#e3d1c3",
      delay: "delay-600",
      floatDelay: "2.5s"
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

      {/* ================= ANIMALITOS Y NATURALEZA FLOTANTE DE FONDO ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-32 left-[5%] text-7xl opacity-20 animate-swing">🦒</div>
        <div className="absolute top-1/3 right-[4%] text-8xl opacity-15 animate-float-continuous" style={{ animationDelay: '1s' }}>🐘</div>
        <div className="absolute bottom-1/4 left-[3%] text-7xl opacity-20 animate-bounce">🐒</div>
        <div className="absolute bottom-20 right-[8%] text-7xl opacity-25 animate-swing" style={{ animationDelay: '2s' }}>🦁</div>
        <div className="absolute top-1/2 left-[50%] text-5xl opacity-15 animate-pulse">🌿</div>
        <div className="absolute top-20 right-[30%] text-6xl opacity-15 animate-float-continuous">🍃</div>
      </div>

      {/* ================= HEADER HERO - MURO DE EXPLORADORES ================= */}
      <div className="relative pt-32 pb-24 bg-gradient-to-br from-[#f4a261] to-[#e76f51] overflow-hidden text-center z-10 animate-reveal shadow-md">
        
        {/* Emojis flotantes del Header */}
        <div className="absolute top-16 left-[12%] text-6xl opacity-40 animate-swing cursor-default">⭐</div>
        <div className="absolute bottom-12 left-[20%] text-5xl opacity-30 animate-float-continuous cursor-default">🦁</div>
        <div className="absolute bottom-10 right-[15%] text-6xl opacity-40 animate-bounce">💖</div>
        <div className="absolute top-10 right-[25%] text-5xl opacity-30 animate-swing" style={{ animationDelay: '1s' }}>📸</div>
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#ffdfba] rounded-full mix-blend-overlay opacity-20 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          <div className="inline-block px-5 py-2 rounded-full bg-white/20 text-[#fdfbf7] font-black text-sm tracking-widest uppercase mb-4 backdrop-blur-md border border-white/30 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform">
            💬 Lo que dicen nuestros papás
          </div>
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

        {/* Cuadrícula de Testimonios con Animación Constante */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {testimonios.map((item) => (
            <div key={item.id} className={`animate-reveal ${item.delay}`}>
              
              {/* Contenedor con animación flotante continua */}
              <div className="animate-float-continuous" style={{ animationDelay: item.floatDelay }}>
                
                {/* Tarjeta Estilo 3D Safari */}
                <div 
                  className="bg-white rounded-[2.5rem] p-8 relative group h-full flex flex-col justify-between transform hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300"
                  style={{
                    border: `4px solid ${item.colorBorde}`,
                    boxShadow: `10px 10px 0 ${item.colorBorde}`
                  }}
                >
                  
                  {/* Cinta Washi Tape de Papel */}
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 opacity-90 rotate-2 shadow-sm z-20 rounded-sm"
                    style={{ backgroundColor: item.washiColor }}
                  ></div>

                  {/* Foto estilo Polaroid */}
                  {item.foto && (
                    <div className="mb-6 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md group-hover:shadow-xl transition-all">
                      <img src={item.foto} alt={`Paciente ${item.nombre}`} className="w-full h-52 object-cover object-[center_25%] transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}

                  {/* Información del autor y estrellas */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white uppercase shrink-0 shadow-sm transform -rotate-3"
                        style={{ backgroundColor: item.colorBorde }}
                      >
                        {item.nombre.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-black text-gray-800 text-xl leading-tight">{item.nombre}</h3>
                        <p className="text-sm tracking-widest mt-1">{item.estrellas}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 font-bold text-lg leading-relaxed italic relative mt-2">
                      <span className="text-5xl text-gray-200 absolute -top-5 -left-2 select-none">"</span>
                      <span className="relative z-10">{item.texto}</span>
                      <span className="text-5xl text-gray-200 absolute -bottom-8 -right-2 select-none">"</span>
                    </p>
                  </div>

                  {/* Huellita Safari decorativa */}
                  <div className="absolute bottom-4 right-6 opacity-20 text-3xl transform -rotate-12 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                    🐾
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* ================= BOTÓN FINAL LLAMADA A LA ACCIÓN ================= */}
        <div className="mt-28 text-center animate-reveal delay-600">
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