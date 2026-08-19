// Reemplaza con la foto real de tu clínica (la de la doctora con la niña)
import imgOrtodoncia from '../assets/imagen1.jpg'; 

const Ortodoncia = () => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen font-sans text-gray-800 overflow-x-hidden">
      
      {/* HEADER HERO - ESTILO TERRACOTA SAFARI */}
      <div className="relative pt-40 pb-24 bg-[#d08c60] overflow-hidden text-center z-10">
        {/* Elementos flotantes interactivos */}
        <div className="absolute top-20 left-[12%] text-5xl opacity-40 animate-float cursor-default hover:scale-125 transition-transform duration-300">🦕</div>
        <div className="absolute bottom-10 right-[18%] text-6xl opacity-30 animate-float" style={{ animationDelay: '1.2s' }}>🦷</div>
        <div className="absolute top-12 right-[25%] text-4xl opacity-40 animate-float" style={{ animationDelay: '2.5s' }}>✨</div>
        
        {/* Formas orgánicas de fondo */}
        <div className="absolute -bottom-20 -left-10 w-96 h-96 bg-[#b87850] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#e09e73] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10"></div>

        <div className="relative z-20 opacity-0 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
            Ortodoncia Fija
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-medium">
            <a href="/" className="hover:text-[#f3e5d8] transition-colors">Inicio</a> 
            <span>/</span> 
            <span className="text-[#f3e5d8] font-bold">Ortodoncia Fija</span>
          </div>
        </div>
        
        {/* Curva divisoria estilo ola (SVG) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-[#fdfbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* CONTENIDO INTERACTIVO */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Columna Izquierda: Textos con animación */}
          <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-extrabold text-[#c07a4f] flex items-center gap-3 mb-6">
              <span className="text-4xl">📏</span> Alineando Sonrisas
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              <span className="float-left bg-[#d08c60] text-white text-4xl font-extrabold rounded-[1rem_0.5rem_1rem_0.5rem] px-5 py-3 mr-5 mb-2 shadow-lg transform rotate-3">
                L
              </span>
              a <strong>ORTODONCIA</strong> y los <strong>BRACKETS</strong> comprenden la corrección de las irregularidades y malposiciones dentales (dientes chuecos). Estos brackets se usan para lograr una condición estética y funcional más favorable. También corrigen cuando el maxilar superior e inferior no encajan adecuadamente.
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Los tratamientos pueden iniciarse desde la dentición de leche, pasando por la mixta y los dientes permanentes. Las causas principales de estos problemas suelen ser la herencia o malos hábitos, como respirar por la boca o chuparse el dedo.
            </p>

            {/* Viñeta destacada */}
            <div className="bg-[#f3e5d8] p-6 rounded-2xl border-l-4 border-[#d08c60] shadow-sm transform hover:translate-x-2 transition-transform duration-300">
              <p className="text-[#6b584a] font-medium">
                Nuestros <strong>ORTODONCISTAS</strong> son dentistas que han cursado la especialidad por 3 años adicionales para convertirse en expertos en Ortodoncia y Ortopedia Maxilar.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Imagen Polaroid Interactiva */}
          <div className="relative opacity-0 animate-pop-in" style={{ animationDelay: '0.4s' }}>
             {/* Marco decorativo orgánico detrás de la foto */}
             <div className="absolute inset-0 bg-[#e3d1c3] rounded-[2rem_4rem_2rem_4rem] transform rotate-6 scale-105 opacity-70 -z-10 transition-transform duration-500 hover:rotate-0"></div>
             
             <div className="bg-white p-4 pb-16 rounded-[2rem_3rem_2rem_3rem] shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500 relative">
               <img 
                 src={imgOrtodoncia} 
                 alt="Doctora y paciente feliz" 
                 className="w-full h-auto rounded-2xl object-cover aspect-[4/5]"
               />
               {/* "Washi tape" decorativo */}
               <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-20 h-8 bg-sonriendo-mint/70 -rotate-3 backdrop-blur-sm shadow-sm"></div>
               <p className="absolute bottom-5 left-0 w-full text-center font-bold text-[#c07a4f] text-xl font-handwriting">
                 ¡Resultados Increíbles! ✨
               </p>
             </div>
          </div>

        </div>

        {/* Sección 2: Diagnóstico (Destacada) */}
        <div className="bg-[#5c4a3d] rounded-[3rem] p-10 md:p-16 relative overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* Elementos decorativos de fondo */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#7a6454] rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute right-10 top-10 text-6xl opacity-10 rotate-12">🔍</div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            <div className="md:col-span-1 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-white mb-4">Diagnóstico Personalizado</h2>
              <p className="text-[#e3d1c3] font-medium text-lg">
                Cada sonrisa es un mundo diferente.
              </p>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <p className="text-white/90 text-lg leading-relaxed">
                La duración del tratamiento variará según cada paciente. Factores como la edad y la gravedad influirán en cuánto tiempo tendrá los aparatos y los brackets. 
              </p>
              <p className="text-white/90 text-lg leading-relaxed">
                El tipo de tratamiento exacto dependerá del diagnóstico de nuestro especialista. Para lograr un resultado perfecto, utilizamos radiografías especiales, modelos de estudio (impresiones de los dientes) y fotografías clínicas.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ortodoncia;