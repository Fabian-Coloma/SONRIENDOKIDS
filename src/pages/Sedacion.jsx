import imgSedacion from '../assets/imagen8.jpg'; 

const Sedacion = () => {
  return (
    <div className="bg-[#fffbf7] min-h-screen font-sans text-gray-800 overflow-x-hidden">
      
      {/* HEADER HERO - ESTILO CALIDEZ SAFARI (MÁS ANIMADO) */}
      <div className="relative pt-40 pb-24 bg-[#a67b5b] overflow-hidden text-center z-10 group">
        
        {/* Emojis flotantes con movimiento continuo */}
        <div className="absolute top-20 left-[15%] text-5xl opacity-40 animate-bounce cursor-default hover:scale-125 transition-transform duration-300">💤</div>
        <div className="absolute bottom-16 left-[5%] text-4xl opacity-30 animate-pulse cursor-default">🌙</div>
        <div className="absolute bottom-10 right-[15%] text-6xl opacity-30 cursor-default hover:-translate-y-4 hover:scale-110 transition-all duration-300">🐨</div>
        <div className="absolute top-10 right-[30%] text-4xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-24 right-[10%] text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>☁️</div>
        
        {/* Formas de fondo latiendo (Pulse) */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#8a6347] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-[#c79873] rounded-full mix-blend-multiply opacity-50 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md transform transition-all duration-500 hover:scale-105">
            Sedación Consciente
          </h1>
          <div className="flex items-center justify-center gap-3 text-white/90 font-medium">
            <a href="/" className="hover:text-sonriendo-yellow hover:-translate-y-1 transition-all inline-block">Inicio</a> 
            <span>/</span> 
            <span className="text-sonriendo-yellow font-bold">Sedación Consciente</span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-[#fffbf7]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* CONTENIDO INTERACTIVO */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        
        {/* Bloque Superior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* IMAGEN SÚPER INTERACTIVA */}
          <div className="relative order-2 lg:order-1 group cursor-pointer mt-8 lg:mt-0">
             
             {/* Marco orgánico que gira y crece en hover */}
             <div className="absolute inset-0 bg-sonriendo-yellow rounded-[4rem_1rem_4rem_1rem] transform -rotate-3 scale-105 opacity-50 -z-10 transition-all duration-700 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-[#f4a261]"></div>
             
             {/* Foto que flota */}
             <img src={imgSedacion} alt="Niño relajado" className="w-full h-auto rounded-[3rem_1rem_3rem_1rem] shadow-xl border-4 border-white object-cover transform transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-2xl" />
             
             {/* Badge flotante que rebota en hover */}
             <div className="absolute -bottom-6 -right-6 bg-white px-6 py-4 rounded-3xl shadow-xl flex items-center gap-3 border border-gray-50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-translate-y-2">
                <span className="text-3xl animate-pulse">🛡️</span>
                <span className="font-extrabold text-[#a67b5b] leading-tight">100%<br/>Seguro</span>
             </div>

             {/* Letras 'Zzz' escondidas que flotan hacia arriba al pasar el mouse */}
             <div className="absolute -top-10 left-10 text-4xl text-sonriendo-yellow opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-700 font-bold delay-100 pointer-events-none">z</div>
             <div className="absolute -top-16 left-20 text-5xl text-sonriendo-mint opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:-translate-y-8 transition-all duration-700 font-bold delay-300 pointer-events-none">Z</div>
          </div>

          {/* Textos Interactivos */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#a67b5b] mb-6 transition-transform duration-300 hover:translate-x-2">
              Tratamientos sin lágrimas
            </h2>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-sonriendo-yellow hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-gray-600 text-lg leading-relaxed">
                <span className="float-left bg-sonriendo-yellow text-white text-4xl font-extrabold rounded-full w-16 h-16 flex items-center justify-center mr-5 mb-2 shadow-md animate-pulse">
                  C
                </span>
                uando los niños son temerosos, ansiosos, muy pequeñitos o tienen habilidades especiales, forzarlos puede generarles un trauma. La <strong>Sedación Consciente</strong> es la alternativa perfecta.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-sonriendo-mint hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-100">
              <p className="text-gray-600 text-lg leading-relaxed">
                Consiste en la administración de analgésicos que permiten al paciente relajarse por completo. A diferencia de la anestesia general, <strong>el niño no se duerme del todo</strong>: permanece despierto, respirando por sí mismo y puede seguir nuestras instrucciones, pero sin sentir miedo, ansiedad ni dolor.
              </p>
            </div>
          </div>
        </div>

        {/* Tarjetas de Beneficios (Grid Súper Interactivo) */}
        <h3 className="text-center text-3xl font-extrabold text-gray-800 mb-12 hover:scale-105 transition-transform duration-300 cursor-default">¿Qué ventajas se obtienen?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border-b-4 border-sonriendo-yellow group cursor-default">
            <div className="w-16 h-16 bg-[#f3e5d8] rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">😌</div>
            <h4 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#a67b5b] transition-colors">Tranquilidad Total</h4>
            <p className="text-gray-600">Elimina la ansiedad y el miedo en el paciente, haciendo que el tratamiento sea una experiencia positiva.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border-b-4 border-sonriendo-mint group cursor-default">
            <div className="w-16 h-16 bg-[#eaf4ed] rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-125 group-hover:animate-pulse transition-all duration-300">⏱️</div>
            <h4 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-sonriendo-mint transition-colors">Mayor Eficiencia</h4>
            <p className="text-gray-600">Al estar el niño relajado, el odontopediatra puede trabajar más rápido y realizar procedimientos complejos en una sola cita.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border-b-4 border-[#a67b5b] group cursor-default">
            <div className="w-16 h-16 bg-[#f3e5d8] rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:-rotate-12 group-hover:-translate-y-2 transition-all duration-300">🚀</div>
            <h4 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#a67b5b] transition-colors">Recuperación Rápida</h4>
            <p className="text-gray-600">Los efectos del medicamento desaparecen rápidamente, permitiendo que el niño vuelva a su rutina habitual casi de inmediato.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Sedacion;