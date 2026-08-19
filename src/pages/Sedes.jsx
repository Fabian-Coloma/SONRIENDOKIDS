import { Link } from 'react-router-dom';
import img1 from '../assets/imagen1.jpg';
import img2 from '../assets/imagen2.jpg';
import img3 from '../assets/imagen3.jpg';
import img4 from '../assets/imagen4.jpg';
import img8 from '../assets/imagen8.jpg';

const Sedes = () => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen font-sans text-gray-800 overflow-x-hidden">
      
      {/* HEADER HERO - ESTILO MAPA/EXPEDICIÓN */}
      <div className="relative pt-40 pb-24 bg-[#4a6b53] overflow-hidden text-center z-10 group">
        
        {/* Emojis flotantes interactivos */}
        <div className="absolute top-20 left-[15%] text-5xl opacity-40 animate-bounce cursor-default hover:scale-125 transition-transform duration-300">📍</div>
        <div className="absolute bottom-16 left-[5%] text-4xl opacity-30 animate-pulse cursor-default">🗺️</div>
        <div className="absolute bottom-10 right-[15%] text-6xl opacity-30 cursor-default hover:-translate-x-4 hover:scale-110 transition-all duration-300">🚙</div>
        <div className="absolute top-10 right-[30%] text-4xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>🦒</div>
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#3a5441] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#5c8567] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-sm tracking-widest uppercase mb-4 backdrop-blur-sm border border-white/30">
            Conoce Nuestras Instalaciones
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md transform transition-all duration-500 hover:scale-105">
            Nuestra Clínica
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-medium">
            <Link to="/" className="hover:text-[#f4a261] hover:-translate-y-1 transition-all inline-block">Inicio</Link> 
            <span>/</span> 
            <span className="text-[#f4a261] font-bold">La Clínica</span>
          </div>
        </div>
        
        {/* Curva divisoria estilo ola (SVG) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-[#fdfbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* CONTENIDO DE LA SEDE ÚNICA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Textos - Sede Callao */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#f4a261] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Sede Exclusiva</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#6b584a] mb-4 hover:text-[#4a6b53] transition-colors">
              Sonriendo Kids <span className="text-[#f4a261]">Callao</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Diseñada como un verdadero campamento safari, nuestra clínica cuenta con múltiples consultorios equipados con la última tecnología odontológica y ambientes creados específicamente para que los niños se sientan seguros y felices.
            </p>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#e3d1c3] space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f4f9f5] flex items-center justify-center text-2xl shrink-0">📍</div>
                <div>
                  <h4 className="font-bold text-[#4a6b53] text-lg">Dirección</h4>
                  <p className="text-gray-600">Mz C lote 20 Urb 7 de agosto, Callao<br/><span className="text-sm text-gray-500"></span></p>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-[#e3d1c3]/50"></div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fcf5ef] flex items-center justify-center text-2xl shrink-0">⏰</div>
                <div>
                  <h4 className="font-bold text-[#f4a261] text-lg">Horario de Atención</h4>
                  <p className="text-gray-600">Lunes a Sábado: 09:00 am - 06:00 pm</p>
                </div>
              </div>
            </div>

            <Link to="/reserva" className="inline-block mt-4 px-8 py-4 bg-[#4a6b53] text-white font-bold text-lg rounded-2xl shadow-[0_4px_14px_0_rgba(74,107,83,0.39)] hover:shadow-[0_6px_20px_rgba(74,107,83,0.23)] hover:bg-[#3a5441] hover:-translate-y-1 transition-all duration-300">
              Agendar mi Cita 📅
            </Link>
          </div>

          {/* Mosaico Fotográfico de 4 imágenes - Sede Callao */}
          <div className="relative h-[550px] group mt-10 lg:mt-0">
            {/* Fondo orgánico de decoración */}
            <div className="absolute inset-0 bg-[#e3d1c3] rounded-[3rem] transform rotate-3 opacity-60 -z-10 transition-transform duration-500 group-hover:-rotate-2 scale-105"></div>
            
            {/* Cuadrícula de 4 imágenes */}
            <div className="grid grid-cols-2 gap-4 h-full relative z-10 p-2">
              
              {/* Foto 1 (Arriba Izquierda) */}
              <div className="overflow-hidden rounded-[2rem_0.5rem_0.5rem_0.5rem] shadow-md transform transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl">
                <img src={img1} alt="Recepción" className="w-full h-full object-cover" />
              </div>
              
              {/* Foto 2 (Arriba Derecha - Ligeramente bajada) */}
              <div className="overflow-hidden rounded-[0.5rem_2rem_0.5rem_0.5rem] shadow-md transform translate-y-8 transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl">
                <img src={img2} alt="Consultorio principal" className="w-full h-full object-cover" />
              </div>
              
              {/* Foto 3 (Abajo Izquierda - Ligeramente subida) */}
              <div className="overflow-hidden rounded-[0.5rem_0.5rem_0.5rem_2rem] shadow-md transform -translate-y-8 transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl">
                <img src={img3} alt="Área de atención" className="w-full h-full object-cover" />
              </div>
              
              {/* Foto 4 (Abajo Derecha) */}
              <div className="overflow-hidden rounded-[0.5rem_0.5rem_2rem_0.5rem] shadow-md transform transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl">
                <img src={img4} alt="Equipamiento moderno" className="w-full h-full object-cover" />
              </div>

            </div>

            {/* Insignia Flotante */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl z-30 transform transition-transform duration-500 group-hover:scale-110">
              <span className="text-4xl">🦷</span>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BANNER FINAL: ZONA DE JUEGOS (Imagen 8) ================= */}
      <div className="relative mt-10 py-24 overflow-hidden group">
        {/* Imagen de fondo con overlay oscuro */}
        <div className="absolute inset-0 z-0">
          <img src={img8} alt="Niños jugando en la clínica" className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-[#6b584a]/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="text-5xl mb-6 animate-bounce">🧸</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Espacios diseñados <span className="text-[#f4a261]">para ellos</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
            En nuestra clínica encontrarás zonas de juego temáticas. Queremos que ir al dentista deje de ser una obligación y se convierta en su aventura favorita del mes.
          </p>
          <Link to="/reserva" className="inline-block px-10 py-4 bg-white text-[#6b584a] font-extrabold text-lg rounded-full shadow-2xl hover:bg-[#f4a261] hover:text-white hover:-translate-y-2 transition-all duration-300">
            Únete a la Aventura Hoy 🚀
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Sedes;