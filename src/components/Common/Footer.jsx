import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2d3b32] text-[#fdfbf7] relative overflow-hidden border-t-[12px] border-dashed border-[#f4a261] pt-24 pb-8 z-10 font-sans">
      
      {/* ================= ELEMENTOS SAFARI DE FONDO (MARCA DE AGUA) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-5">
        <div className="absolute top-0 left-[-5%] text-[15rem] transform -rotate-12">🌴</div>
        <div className="absolute bottom-[-10%] right-[-5%] text-[20rem] transform rotate-6">🐘</div>
        <div className="absolute top-[20%] right-[25%] text-[8rem] transform rotate-45">🐾</div>
        <div className="absolute top-[50%] left-[30%] text-[6rem] transform -rotate-12">🍃</div>
      </div>

      {/* Monito colgado del borde superior */}
      <div className="absolute top-0 left-[10%] lg:left-[20%] text-5xl origin-top animate-swing cursor-default">
        🐒
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ================= CONTENIDO PRINCIPAL DEL FOOTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* COLUMNA 1: Marca y Redes (Ocupa 4 columnas) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <h2 className="text-4xl font-black text-white flex items-center gap-2">
                Sonriendo<span className="text-[#f4a261]">Kids</span>
                <span className="group-hover:animate-bounce transition-transform">🦁</span>
              </h2>
            </Link>
            <p className="text-[#eaf4ed]/70 font-medium leading-relaxed max-w-sm">
              Transformamos la visita al dentista en una expedición mágica y divertida. Especialistas en hacer sonreír a los más pequeños del Callao.
            </p>
            
            {/* Redes Sociales Pro */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://instagram.com/pat.odontopediatra" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-[#3a5441] flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f4a261] hover:to-[#C13584] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a 
                href="https://tiktok.com/@sonriendo.dental" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-[#3a5441] flex items-center justify-center text-white hover:bg-black hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
              </a>
              <a 
                href="https://wa.me/51988988812" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-[#3a5441] flex items-center justify-center text-white hover:bg-[#25D366] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: Enlaces Rápidos (Ocupa 2 columnas) */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-[#4a6b53] pb-2 inline-block">Rutas de Expedición</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-[#eaf4ed]/80 hover:text-[#f4a261] font-medium flex items-center gap-2 group transition-colors">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">🐾</span> Inicio
                </Link>
              </li>
              <li>
                <Link to="/sedes" className="text-[#eaf4ed]/80 hover:text-[#f4a261] font-medium flex items-center gap-2 group transition-colors">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">🐾</span> La Clínica
                </Link>
              </li>
              <li>
                <Link to="/ortodoncia" className="text-[#eaf4ed]/80 hover:text-[#f4a261] font-medium flex items-center gap-2 group transition-colors">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">🐾</span> Ortodoncia Fija
                </Link>
              </li>
              <li>
                <Link to="/odontopediatria" className="text-[#eaf4ed]/80 hover:text-[#f4a261] font-medium flex items-center gap-2 group transition-colors">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">🐾</span> Odontopediatría
                </Link>
              </li>
              <li>
                <Link to="/sedacion" className="text-[#eaf4ed]/80 hover:text-[#f4a261] font-medium flex items-center gap-2 group transition-colors">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">🐾</span> Sedación Consciente
                </Link>
              </li>
              <li>
                <Link to="/ubicanos" className="text-[#eaf4ed]/80 hover:text-[#f4a261] font-medium flex items-center gap-2 group transition-colors">
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">🐾</span> Ubícanos
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: Base de Contacto (Ocupa 3 columnas) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-[#4a6b53] pb-2 inline-block">Base de Contacto</h3>
            
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#3a5441] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:bg-[#f4a261] transition-all">
                📍
              </div>
              <div>
                <p className="font-bold text-white mb-1">Visítanos</p>
                <p className="text-[#eaf4ed]/70 text-sm leading-relaxed">Mz C lote 20 Urb 7 de agosto, <br/> Callao</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#3a5441] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:bg-[#f4a261] transition-all">
                📞
              </div>
              <div>
                <p className="font-bold text-white mb-1">Llámanos</p>
                <p className="text-[#eaf4ed]/70 text-sm hover:text-white transition-colors cursor-pointer">+51 988 988 812</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#3a5441] flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:bg-[#f4a261] transition-all">
                ✉️
              </div>
              <div>
                <p className="font-bold text-white mb-1">Escríbenos</p>
                <p className="text-[#eaf4ed]/70 text-sm hover:text-white transition-colors cursor-pointer">contacto@sonriendokids.pe</p>
              </div>
            </div>
          </div>

          {/* COLUMNA 4: Horarios (Ocupa 3 columnas) */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-[#4a6b53] pb-2 inline-block">Horarios del Safari</h3>
            <div className="bg-[#3a5441]/50 p-6 rounded-2xl border border-[#4a6b53] space-y-4">
              
              <div className="flex justify-between items-center border-b border-[#4a6b53] pb-3">
                <span className="text-[#eaf4ed] font-medium flex items-center gap-2">Lunes a Viernes</span>
                <span className="text-white font-bold text-sm bg-[#4a6b53] px-3 py-1 rounded-lg">09:00 - 18:00</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-[#4a6b53] pb-3">
                <span className="text-[#eaf4ed] font-medium flex items-center gap-2">Sábados</span>
                <span className="text-white font-bold text-sm bg-[#4a6b53] px-3 py-1 rounded-lg">10:00 - 14:00</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[#f4a261] font-bold">Domingos</span>
                <span className="text-[#f4a261] font-black text-sm flex items-center gap-2">
                  Cerrado <span className="text-lg animate-pulse">💤</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= BARRA INFERIOR (COPYRIGHT) ================= */}
        <div className="border-t border-[#4a6b53] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#eaf4ed]/60">
          <p className="font-medium text-center md:text-left">
            © 2026 Sonriendo Kids. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 font-medium">
            <Link to="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link to="#" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;