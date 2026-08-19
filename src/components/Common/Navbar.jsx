import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Efecto para detectar el Scroll y aplicar el estilo de "Cristal" (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    {
      name: 'Servicios',
      path: '#',
      dropdown: [
        { name: 'Ortodoncia Fija', path: '/ortodoncia', emoji: '📏' },
        { name: 'Odontopediatría', path: '/odontopediatria', emoji: '🦷' },
        { name: 'Sedación Consciente', path: '/sedacion', emoji: '💤' },
      ]
    },
    {
      name: 'La Clínica',
      path: '#',
      dropdown: [
        { name: 'Nuestro Profesional', path: '/profesional', emoji: '👩‍⚕️' },
        { name: 'Nuestras Sedes', path: '/sedes', emoji: '📍' },
      ]
    },
    { name: 'Ubícanos', path: '/ubicanos' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-md shadow-[0_10px_30px_rgba(74,107,83,0.08)] py-3 border-b border-gray-100' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* ================= LOGO INTERACTIVO ================= */}
          <Link to="/" className="flex items-center gap-1 group z-50">
            <span className="text-3xl lg:text-4xl font-black tracking-tight text-[#4a6b53] group-hover:scale-105 transition-transform duration-300">
              Sonriendo<span className="text-[#f4a261]">Kids</span>
            </span>
            <span className="text-3xl lg:text-4xl transform origin-bottom group-hover:animate-swing">🦁</span>
          </Link>

          {/* ================= NAVEGACIÓN DESKTOP ================= */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link, index) => (
              <div 
                key={index}
                className="relative group px-3 py-2"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={link.path} 
                  className={`relative font-bold text-[15px] transition-colors duration-300 flex items-center gap-1.5 ${
                    location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                      ? 'text-[#f4a261]' 
                      : 'text-[#6b584a] hover:text-[#4a6b53]'
                  }`}
                >
                  {/* Huellita animada en hover */}
                  <span className="absolute -left-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm">
                    🐾
                  </span>
                  
                  {link.name}

                  {/* Flechita para los dropdowns */}
                  {link.dropdown && (
                    <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-[#f4a261]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                  )}

                  {/* Línea animada inferior */}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#f4a261] rounded-full transition-all duration-300 group-hover:w-full"></span>
                </Link>

                {/* ================= DROPDOWNS MAGICOS ================= */}
                {link.dropdown && (
                  <div 
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(74,107,83,0.15)] border-2 border-[#eaf4ed] p-3 transition-all duration-300 origin-top-center ${
                      activeDropdown === link.name 
                        ? 'opacity-100 visible translate-y-0 scale-100' 
                        : 'opacity-0 invisible translate-y-4 scale-95'
                    }`}
                  >
                    {/* Flechita apuntando hacia arriba (Triangle) */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-[#eaf4ed] transform rotate-45"></div>
                    
                    <div className="flex flex-col gap-1 relative z-10">
                      {link.dropdown.map((item, idx) => (
                        <Link 
                          key={idx} 
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#f4f9f5] text-[#6b584a] hover:text-[#4a6b53] font-bold transition-all duration-200 group/item"
                        >
                          <span className="text-2xl transform group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform duration-300">{item.emoji}</span>
                          <span className="group-hover/item:translate-x-1 transition-transform duration-300">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ================= BOTÓN MENÚ MÓVIL (Hamburguesa animada) ================= */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6b584a] hover:text-[#f4a261] focus:outline-none bg-[#eaf4ed] p-3 rounded-full transition-colors"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span className={`h-1 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2.5' : 'w-6'}`}></span>
                <span className={`h-1 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`h-1 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2.5' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MENÚ MÓVIL (Slide-in) ================= */}
      <div 
        className={`md:hidden fixed inset-0 bg-[#fdfbf7] z-40 transition-transform duration-500 ease-in-out pt-28 px-6 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto h-full pb-20">
          {navLinks.map((link, index) => (
            <div key={index} className="flex flex-col">
              
              {/* Link Principal Móvil */}
              <div 
                className="flex justify-between items-center pb-2 border-b-2 border-gray-100"
                onClick={() => link.dropdown ? setActiveDropdown(activeDropdown === link.name ? null : link.name) : null}
              >
                <Link 
                  to={link.dropdown ? '#' : link.path} 
                  className={`text-2xl font-black ${
                    location.pathname === link.path ? 'text-[#f4a261]' : 'text-[#6b584a]'
                  }`}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <span className={`text-2xl text-[#f4a261] transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`}>
                    ⬇️
                  </span>
                )}
              </div>

              {/* Dropdown Móvil */}
              {link.dropdown && (
                <div className={`flex flex-col gap-2 mt-4 pl-4 overflow-hidden transition-all duration-300 ${activeDropdown === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {link.dropdown.map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={item.path}
                      className="flex items-center gap-4 py-3 text-xl font-bold text-gray-600 hover:text-[#4a6b53]"
                    >
                      <span>{item.emoji}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Decoración extra en menú móvil */}
          <div className="mt-10 flex justify-center opacity-50 text-6xl gap-4">
            <span>🌴</span>
            <span>🦒</span>
            <span>🦓</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;