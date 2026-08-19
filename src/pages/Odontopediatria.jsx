import imgOdonto1 from '../assets/imagen3.jpg'; // Asegúrate de tener estas imágenes
import imgOdonto2 from '../assets/imagen4.jpg';

const Odontopediatria = () => {
  return (
    <div className="bg-[#f8fcf9] min-h-screen font-sans text-gray-800 overflow-x-hidden">

      {/* HEADER HERO - ESTILO SAFARI */}
      <div className="relative pt-40 pb-24 bg-[#4a6b53] overflow-hidden text-center z-10">
        {/* Elementos flotantes interactivos */}
        <div className="absolute top-20 left-[10%] text-5xl opacity-40 animate-float cursor-default hover:scale-125 transition-transform duration-300">🍃</div>
        <div className="absolute bottom-10 left-[20%] text-6xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>🦒</div>
        <div className="absolute top-16 right-[15%] text-5xl opacity-40 animate-float" style={{ animationDelay: '2s' }}>🧚‍♀️</div>
        
        {/* Forma orgánica de fondo */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3a5441] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10"></div>
        <div className="absolute top-0 -right-24 w-80 h-80 bg-[#5c8567] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10"></div>

        <div className="relative z-20 opacity-0 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
            Odontopediatría
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-medium">
            <a href="/" className="hover:text-sonriendo-yellow transition-colors">Inicio</a> 
            <span>/</span> 
            <span className="text-sonriendo-yellow font-bold">Odontopediatría</span>
          </div>
        </div>
        
        {/* Curva divisoria estilo ola (SVG) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-[#f8fcf9]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* CONTENIDO INTERACTIVO */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        
        {/* Sección 1: Texto e Imagen (Zig-Zag) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-extrabold text-[#4a6b53] flex items-center gap-3">
              <span className="text-4xl">✨</span> Prevención y Magia
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              <span className="float-left bg-sonriendo-yellow text-[#4a6b53] text-4xl font-extrabold rounded-2xl px-5 py-3 mr-5 mb-2 shadow-lg transform -rotate-3">
                L
              </span>
              a Odontopediatría es la rama de la odontología dedicada a cuidar las sonrisas de los más pequeños, desde los bebés hasta los adolescentes. En nuestra clínica, transformamos el miedo a lo desconocido en una aventura divertida.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nos enfocamos en la <strong>prevención</strong> de enfermedades orales (como las caries) y en educar a los niños y papás sobre la higiene correcta. Diagnosticamos y tratamos todo tipo de condiciones, asegurando que sus dientes de leche y definitivos crezcan sanos y fuertes.
            </p>
          </div>

          {/* Collage dinámico de 2 fotos */}
          <div className="relative h-[400px] opacity-0 animate-pop-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute top-0 right-10 w-64 h-80 bg-white p-3 shadow-xl rounded-2xl transform rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 border border-gray-100 z-20">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-sonriendo-mint/80 -rotate-3"></div>
               <img src={imgOdonto1} alt="Niño feliz" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute bottom-0 left-0 w-72 h-64 bg-white p-3 shadow-2xl rounded-2xl transform -rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 border border-gray-100 z-10">
               <img src={imgOdonto2} alt="Tratamiento" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Sección 2: Especialistas */}
        <div className="bg-[#eaf4ed] rounded-[3rem] p-10 md:p-16 relative overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-sonriendo-mint rounded-full opacity-30"></div>
          
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 relative z-10">¿Qué hace a nuestro Odontopediatra diferente?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="flex gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl group-hover:bg-[#4a6b53] transition-colors duration-300">🛡️</div>
              <div>
                <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-[#4a6b53] transition-colors">Entrenamiento Especializado</h4>
                <p className="text-gray-600">Años de estudio adicionales enfocados 100% en el manejo del comportamiento infantil y desarrollo maxilar.</p>
              </div>
            </div>
            
            <div className="flex gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl group-hover:bg-sonriendo-yellow transition-colors duration-300">🎨</div>
              <div>
                <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-sonriendo-yellow transition-colors">Psicología Infantil</h4>
                <p className="text-gray-600">Usamos juegos, recompensas y mucha empatía para que los niños participen felices y sin miedos.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Odontopediatria;