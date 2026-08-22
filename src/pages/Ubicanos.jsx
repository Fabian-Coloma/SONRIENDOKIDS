const Ubicanos = () => {
  // Buscamos exactamente el nombre de tu negocio en Google Maps
  const nombreNegocio = "SONRIENDO+dental+kids+Odontología+especializada+Callao";
  const linkGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${nombreNegocio}`;

  return (
    <div className="bg-[#fdfbf7] min-h-screen relative overflow-hidden pt-32 pb-24 font-sans text-gray-800 z-0">
      
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

        @keyframes shine {
          100% { left: 200%; }
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>

      {/* ================= FONDOS Y ANIMALITOS SAFARI ANIMADOS ================= */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none select-none">
        <div className="absolute -top-10 -left-10 w-[400px] h-[400px] bg-[#eaf4ed] rounded-full blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fff5ea] rounded-full blur-3xl opacity-80 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-1 left-[3%] text-[20rem] opacity-20 animate-swing">🦒</div>
        <div className="absolute bottom-32 left-[4%] text-[20rem] opacity-15 animate-float-continuous">🐘</div>
        <div className="absolute top-150 right-[2%] text-[20rem] opacity-20 transform rotate-12 animate-swing" style={{ animationDelay: '1s' }}>🐒</div>
        <div className="absolute top-20 right-[25%] text-[20rem] opacity-20 animate-swing">🍃</div>
        
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ================= TÍTULO SAFARI ================= */}
        <div className="mb-16 text-center lg:text-left animate-reveal">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#4a6b53] font-black text-sm tracking-widest uppercase mb-6 border-2 border-[#eaf4ed] shadow-md transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
            <span className="text-xl animate-bounce">🗺️</span> Inicia la Expedición
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#6b584a] leading-tight mb-6 drop-shadow-sm">
            Encuentra el camino <br className="hidden lg:block"/>
            hacia <span className="text-[#f4a261]">tu sonrisa</span> 🦁
          </h1>
          <p className="text-xl text-gray-600 font-bold max-w-2xl mx-auto lg:mx-0 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-sm">
            Estamos listos para recibirte en un ambiente seguro, divertido y lleno de aventuras para los más pequeños.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ================= LADO IZQUIERDO: INFORMACIÓN ================= */}
          <div className="space-y-8 animate-reveal delay-200">
            
            {/* TARJETA CON EFECTO 3D Y FLOTACIÓN SIMULTÁNEA */}
            <div className="animate-float-continuous" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[8px_8px_0_#4a6b53] border-4 border-[#4a6b53] transform hover:-translate-y-2 hover:shadow-[12px_12px_0_#4a6b53] transition-all duration-300 relative group">
                
                <div className="absolute -top-6 -right-6 text-5xl animate-spin-slow">🧭</div>

                {/* Dirección */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 bg-[#eaf4ed] border-2 border-[#4a6b53] rounded-2xl flex items-center justify-center text-2xl text-[#4a6b53] shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-sm">
                    📍
                  </div>
                  <div>
                    <h3 className="font-black text-[#4a6b53] text-xl mb-1">Nuestra Sede Campamento</h3>
                    <p className="text-gray-600 font-bold text-lg leading-relaxed">
                      Mz C lote 20 Urb 7 de agosto, Callao
                    </p>
                  </div>
                </div>

                <div className="w-full h-[2px] bg-[#4a6b53]/20 border-dashed border-t-2 mb-6"></div>

                {/* Horario */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#fff5ea] border-2 border-[#f4a261] rounded-2xl flex items-center justify-center text-2xl text-[#f4a261] shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                    ⏰
                  </div>
                  <div className="w-full">
                    <h3 className="font-black text-[#f4a261] text-xl mb-3">Horario de Atención</h3>
                    <div className="flex justify-between items-center text-gray-600 font-bold mb-2 bg-[#fdfbf7] p-3 rounded-xl border border-gray-100">
                      <span>Lunes a Viernes</span>
                      <span className="text-[#4a6b53] font-black bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 font-bold bg-[#fdfbf7] p-3 rounded-xl border border-gray-100">
                      <span>Sábados</span>
                      <span className="text-[#4a6b53] font-black bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociales y WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <a 
                href="https://wa.me/51904104511" 
                target="_blank" 
                rel="noreferrer"
                className="sm:col-span-8 flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-5 px-6 rounded-[2rem] border-4 border-[#128C7E] font-black text-xl shadow-[6px_6px_0_#128C7E] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#128C7E] transition-all duration-200 overflow-hidden relative group"
              >
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/30 skew-x-12 group-hover:animate-[shine_1s_ease-in-out]"></div>
                <svg className="w-8 h-8 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Conversar por WhatsApp
              </a>

              <a 
                href="https://instagram.com/pat.odontopediatra" 
                target="_blank" 
                rel="noreferrer"
                className="sm:col-span-2 bg-white border-4 border-[#C13584] shadow-[4px_4px_0_#C13584] rounded-[1.5rem] flex items-center justify-center p-4 hover:translate-y-[2px] hover:shadow-[2px_2px_0_#C13584] transition-all duration-200 group"
                aria-label="Instagram"
              >
                <div className="text-[#C13584] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </div>
              </a>

              <a 
                href="https://tiktok.com/@sonriendo.dental" 
                target="_blank" 
                rel="noreferrer"
                className="sm:col-span-2 bg-white border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] flex items-center justify-center p-4 hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all duration-200 group"
                aria-label="TikTok"
              >
                <div className="text-black group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
                </div>
              </a>
            </div>
          </div>

          {/* ================= LADO DERECHO: MAPA CLICKABLE GIGANTE ================= */}
          <div className="w-full mt-8 lg:mt-0 animate-reveal delay-400">
            
            <div className="animate-float-continuous w-full">
              
              {/* ALTURA FIJA DIRECTA EN LA CAJA VISIBLE PARA QUE NO SE APLASTE NUNCA */}
              <div className="relative w-full h-[450px] lg:h-[600px] bg-white p-3 rounded-[3rem] shadow-[12px_12px_0_#f4a261] border-4 border-[#f4a261] z-10 flex flex-col group hover:-translate-y-2 hover:shadow-[16px_16px_0_#f4a261] transition-all duration-500 cursor-pointer overflow-hidden">
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#4a6b53] opacity-90 rotate-2 shadow-sm z-40"></div>

                <a 
                  href={linkGoogleMaps}
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute inset-0 z-30 cursor-pointer"
                  title="Abrir Sonriendo Dental Kids en Google Maps"
                >
                  <div className="absolute inset-0 bg-[#4a6b53]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] rounded-[2.2rem]">
                    <div className="bg-[#f4a261] text-white px-8 py-4 rounded-full font-black text-xl shadow-[0_8px_0_#e76f51] flex items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      Ver en Google Maps
                    </div>
                  </div>
                </a>

                <div className="absolute top-6 left-6 bg-white px-5 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 border-2 border-[#eaf4ed] pointer-events-none transform group-hover:scale-105 transition-transform">
                  <div className="w-4 h-4 bg-[#f4a261] rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-[#f4a261] rounded-full relative z-10 border-2 border-white"></div>
                  <div>
                    <p className="font-black text-[#6b584a] text-sm leading-none">Sonriendo Dental Kids</p>
                    <p className="text-xs text-[#4a6b53] font-bold">Odontopediatría Integral</p>
                  </div>
                </div>

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
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Ubicanos;