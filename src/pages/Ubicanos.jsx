const Ubicanos = () => {
  // Buscamos exactamente el nombre de tu negocio en Google Maps
  const nombreNegocio = "SONRIENDO+dental+kids+Odontología+especializada+Callao";
  const linkGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${nombreNegocio}`;

  return (
    <div className="bg-[#fdfbf7] min-h-screen relative overflow-hidden py-16 lg:py-24 font-sans text-gray-800 z-0">
      
      {/* ================= FONDOS Y ANIMALITOS SAFARI ANIMADOS ================= */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none select-none">
        {/* Manchas de color de fondo */}
        <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-[#eaf4ed] rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#fcf5ef] rounded-full blur-3xl opacity-80"></div>
        
        {/* Animalitos y Naturaleza Flotante */}
        <div className="absolute top-10 left-[8%] text-7xl opacity-15 animate-bounce">🦒</div>
        <div className="absolute bottom-32 left-[4%] text-6xl opacity-10 animate-pulse">🐘</div>
        <div className="absolute top-1/4 right-[5%] text-7xl opacity-15 transform rotate-12 hover:rotate-45 transition-all duration-500">🐒</div>
        <div className="absolute bottom-10 right-[15%] text-6xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🦁</div>
        <div className="absolute top-1/3 left-[45%] text-4xl opacity-20 animate-pulse">🌿</div>
        <div className="absolute top-20 right-[35%] text-5xl opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}>🍃</div>
        <div className="absolute bottom-1/4 left-[35%] text-5xl opacity-10 transform -rotate-12">🦓</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ================= TÍTULO SAFARI ================= */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#4a6b53] font-extrabold text-sm tracking-widest uppercase mb-5 border-2 border-[#eaf4ed] shadow-sm transform hover:scale-105 transition-transform cursor-default">
            <span className="text-lg animate-bounce">🗺️</span> Inicia la Expedición
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#6b584a] leading-tight mb-4">
            Encuentra el camino <br className="hidden lg:block"/>
            hacia <span className="text-[#f4a261]">tu sonrisa</span> 🦁
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0 bg-white/50 backdrop-blur-sm rounded-xl p-2 inline-block">
            Estamos listos para recibirte en un ambiente seguro, divertido y lleno de aventuras para los más pequeños.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* ================= LADO IZQUIERDO: INFORMACIÓN ================= */}
          <div className="space-y-6">
            
            {/* Tarjeta Principal de Información */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-white hover:border-[#eaf4ed] hover:shadow-[0_8px_30px_rgb(74,107,83,0.1)] hover:-translate-y-2 transition-all duration-500 group">
              
              {/* Dirección */}
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 bg-[#eaf4ed] rounded-2xl flex items-center justify-center text-2xl text-[#4a6b53] shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  📍
                </div>
                <div>
                  <h3 className="font-extrabold text-[#6b584a] text-xl mb-1 group-hover:text-[#4a6b53] transition-colors">Nuestra Sede Campamento</h3>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed">
                    Mz C lote 20 Urb 7 de agosto, Callao
                  </p>
                </div>
              </div>

              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6 opacity-50"></div>

              {/* Horario */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#fcf5ef] rounded-2xl flex items-center justify-center text-2xl text-[#f4a261] shrink-0 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  ⏰
                </div>
                <div className="w-full">
                  <h3 className="font-extrabold text-[#6b584a] text-xl mb-3 group-hover:text-[#f4a261] transition-colors">Horario de Atención</h3>
                  <div className="flex justify-between items-center text-gray-600 font-medium mb-2 bg-gray-50/50 p-2 rounded-lg">
                    <span>Lunes a Viernes</span>
                    <span className="text-[#4a6b53] font-black bg-white px-3 py-1 rounded-md shadow-sm">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 font-medium bg-gray-50/50 p-2 rounded-lg">
                    <span>Sábados</span>
                    <span className="text-[#4a6b53] font-black bg-white px-3 py-1 rounded-md shadow-sm">10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón WhatsApp Súper Animado */}
            <a 
              href="https://wa.me/51988988812" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-5 px-6 rounded-[2rem] font-black text-xl shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 overflow-hidden relative group"
            >
              {/* Brillo que pasa por encima en hover */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
              
              <svg className="w-8 h-8 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Conversar por WhatsApp
            </a>

            {/* Redes Sociales Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://instagram.com/pat.odontopediatra" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/80 backdrop-blur-sm px-4 py-4 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-[#C13584] group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </div>
                <span className="font-extrabold text-[#6b584a] group-hover:text-[#C13584] transition-colors">Instagram</span>
              </a>

              <a 
                href="https://tiktok.com/@sonriendo.dental" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/80 backdrop-blur-sm px-4 py-4 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-black group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
                </div>
                <span className="font-extrabold text-[#6b584a] group-hover:text-black transition-colors">TikTok</span>
              </a>
            </div>

          </div>

          {/* ================= LADO DERECHO: MAPA CLICKABLE EXACTO ================= */}
          <div className="relative w-full h-[400px] lg:h-full min-h-[500px] group mt-8 lg:mt-0">
            
            {/* Contenedor principal del Mapa con diseño Safari */}
            <div className="absolute inset-0 bg-white p-3 rounded-[3rem] shadow-[0_20px_50px_rgba(74,107,83,0.15)] border-4 border-white z-10 flex flex-col overflow-hidden group-hover:shadow-[0_30px_60px_rgba(74,107,83,0.25)] transition-shadow duration-500">
              
              {/* CAPA TRANSPARENTE: Convierte todo el mapa en un botón enorme */}
              <a 
                href={linkGoogleMaps}
                target="_blank" 
                rel="noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                title="Abrir Sonriendo Dental Kids en Google Maps"
              >
                {/* Overlay oscuro y botón interactivo que aparece al hacer Hover */}
                <div className="absolute inset-0 bg-[#4a6b53]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] rounded-[2.2rem]">
                  <div className="bg-[#f4a261] text-white px-8 py-4 rounded-full font-black text-xl shadow-2xl flex items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#e7924c] hover:scale-105">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Ver en Google Maps
                  </div>
                </div>
              </a>

              {/* Etiqueta flotante decorativa que resalta el negocio */}
              <div className="absolute top-6 left-6 bg-white/95 px-5 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 border-2 border-white pointer-events-none transform group-hover:scale-105 transition-transform">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full relative z-10 border-2 border-white"></div>
                <div>
                  <p className="font-black text-[#6b584a] text-sm leading-none">Sonriendo Dental Kids</p>
                  <p className="text-xs text-gray-500 font-bold">Odontología especializada</p>
                </div>
              </div>

              {/* EL IFRAME: Apuntando exactamente al nombre de tu negocio en Maps */}
              <iframe 
                src={`https://maps.google.com/maps?q=${nombreNegocio}&t=&z=16&ie=UTF8&iwloc=&output=embed`} 
                className="w-full h-full rounded-[2.2rem] grayscale-[5%] contrast-105"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Sonriendo Kids"
              ></iframe>
            </div>

            {/* Sombras orgánicas de hojas de Safari girando en el fondo */}
            <div className="absolute inset-0 bg-[#f4a261] rounded-[3rem] transform -rotate-3 opacity-20 translate-x-3 translate-y-3 -z-10 transition-transform duration-500 group-hover:-rotate-6 group-hover:translate-x-6 group-hover:translate-y-6"></div>
            <div className="absolute inset-0 bg-[#4a6b53] rounded-[3rem] transform rotate-3 opacity-20 translate-x-2 translate-y-2 -z-20 transition-transform duration-700 group-hover:rotate-6 group-hover:-translate-x-2 group-hover:translate-y-4"></div>
            
          </div>

        </div>
      </div>

      {/* Animación personalizada para el brillo del botón (agrega esto en tu index.css si deseas el efecto shine perfecto, aunque funciona bien sin él) */}
      <style>{`
        @keyframes shine {
          100% { left: 200%; }
        }
      `}</style>
    </div>
  );
};

export default Ubicanos;