import { Link } from 'react-router-dom';
import foto1 from '../assets/foto1.jpeg'; 

const Profesional = () => {
  return (
    <div className="min-h-screen bg-[#f4f9f5] py-16 px-4 sm:px-6 relative overflow-hidden">
      
      {/* 🍃 FONDO SAFARI SUTIL (Opcional, para mantener coherencia con el Home) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute top-10 left-10 text-7xl opacity-[0.04] transform -rotate-12">🦒</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-[0.04] transform rotate-12">🐘</div>
        <div className="absolute top-1/3 right-20 text-6xl opacity-[0.05] transform rotate-45">🐒</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#e3d1c3]/30 text-[#6b584a] font-bold text-sm tracking-widest uppercase mb-4 border border-[#e3d1c3]">
            La mente detrás de las sonrisas
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4a6b53] mb-4">
            Conoce a nuestra <span className="text-[#f4a261]">Especialista</span> 👩🏻‍⚕️
          </h1>
        </div>

        {/* TARJETA PRINCIPAL DEL PROFESIONAL */}
        <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-center relative">
          
          {/* LADO IZQUIERDO: Fotografía y adornos */}
          <div className="lg:w-1/2 relative group w-full max-w-md mx-auto">
            {/* Fondo decorativo que se asoma detrás de la foto */}
            <div className="absolute inset-0 bg-[#f4a261] rounded-[2.5rem] transform -rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-0"></div>
            <div className="absolute inset-0 bg-[#4a6b53] rounded-[2.5rem] transform rotate-2 scale-105 opacity-50 transition-transform duration-500 group-hover:rotate-0"></div>
            
            {/* La Fotografía */}
            <img 
              src={foto1} 
              alt="Doctora Especialista" 
              className="relative z-10 w-full h-[500px] object-cover rounded-[2rem] shadow-lg border-8 border-white transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Insignia Flotante (Diploma) */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-4 rounded-3xl shadow-xl z-20 flex items-center gap-4 animate-bounce border-2 border-[#f4f9f5]">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-2xl">
                🎓
              </div>
              <div>
                <p className="font-extrabold text-[#4a6b53] text-sm leading-tight">Egresada de<br/>Excelencia</p>
                <p className="text-xs text-gray-500 font-medium">UPCH</p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: Copywriting y perfil */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#6b584a] mb-2">
                Dra. Patty Mora
              </h2>
              <h3 className="text-xl text-[#f4a261] font-bold">
                Odontopediatra & Especialista en Ortodoncia
              </h3>
            </div>

            <div className="space-y-4 text-gray-600 font-medium text-lg leading-relaxed">
              <p>
                Con una profunda vocación por la salud bucal infantil, nuestra doctora se formó en la prestigiosa <strong className="text-[#4a6b53]">Universidad Peruana Cayetano Heredia (UPCH)</strong>, destacando por su compromiso y excelencia clínica.
              </p>
              <p>
                Su filosofía es simple: <span className="italic text-[#6b584a]">"Toda visita al dentista debe ser una aventura libre de lágrimas."</span> Gracias a su infinita paciencia y técnicas de manejo de conducta, logra que hasta los pacientitos más nerviosos salgan del consultorio con una gran sonrisa y un premio en la mano.
              </p>
            </div>

            {/* Viñetas de habilidades */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e3d1c3]/50">
              <li className="flex items-center gap-3 text-[#6b584a] font-semibold">
                <span className="w-10 h-10 bg-[#4a6b53]/10 rounded-xl flex items-center justify-center text-xl">🧸</span>
                Manejo de ansiedad
              </li>
              <li className="flex items-center gap-3 text-[#6b584a] font-semibold">
                <span className="w-10 h-10 bg-[#4a6b53]/10 rounded-xl flex items-center justify-center text-xl">🦷</span>
                Ortodoncia preventiva
              </li>
              <li className="flex items-center gap-3 text-[#6b584a] font-semibold">
                <span className="w-10 h-10 bg-[#4a6b53]/10 rounded-xl flex items-center justify-center text-xl">✨</span>
                Odontología sin dolor
              </li>
              <li className="flex items-center gap-3 text-[#6b584a] font-semibold">
                <span className="w-10 h-10 bg-[#4a6b53]/10 rounded-xl flex items-center justify-center text-xl">🏆</span>
                Atención altamente calificada
              </li>
            </ul>

            <div className="pt-6">
              <Link 
                to="/reserva"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#f4a261] text-[#5c4a3d] font-extrabold text-lg rounded-2xl shadow-lg hover:bg-[#e7924c] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                Agenda una cita con ella 📅
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profesional;