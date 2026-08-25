// Diente.jsx — icono de diente SVG (sin imágenes externas) + cuadrícula de caras sin overflow

export default function Diente({ numero, tratamientos, onClickCara, posicion = 'superior' }) {
  const esDeciduo = numero >= 50 && numero <= 85; // piezas de leche (51-65, 71-85)

  const obtenerColor = (cara) => {
    const tratamiento = tratamientos.find(t => t.cara === cara);
    if (!tratamiento) return 'bg-white';
    if (tratamiento.procedimiento.toLowerCase().includes('caries') || tratamiento.procedimiento.toLowerCase().includes('curación')) return 'bg-red-500 border-red-700';
    if (tratamiento.procedimiento.toLowerCase().includes('sellante')) return 'bg-blue-500 border-blue-700';
    if (tratamiento.procedimiento.toLowerCase().includes('exodoncia') || tratamiento.procedimiento.toLowerCase().includes('extracción')) return 'bg-black border-black';
    return 'bg-amber-500 border-amber-700';
  };

  // Cuadrícula 3x3 con grid CSS: imposible que se desborde
  const caras = [
    { nombre: 'arriba',    celda: 'col-start-2 row-start-1 rounded-t-lg' },
    { nombre: 'izquierda', celda: 'col-start-1 row-start-2 rounded-l-lg' },
    { nombre: 'centro',    celda: 'col-start-2 row-start-2' },
    { nombre: 'derecha',   celda: 'col-start-3 row-start-2 rounded-r-lg' },
    { nombre: 'abajo',     celda: 'col-start-2 row-start-3 rounded-b-lg' },
  ];

  return (
    <div className="flex flex-col items-center group relative w-[46px] shrink-0">
      <span className={`text-[10px] font-black text-[#003B5C] ${posicion === 'superior' ? 'order-1 mb-1' : 'order-3 mt-1'}`}>
        {numero}
      </span>

      {/* Dientito SVG — contenido dentro del flujo, sin solaparse con la cuadrícula */}
      <div className={`order-2 flex justify-center overflow-visible ${posicion === 'superior' ? 'mb-2' : 'mt-2'} transition-transform duration-300 ease-out group-hover:scale-125 relative z-10`}>
        <svg width="24" height="26" viewBox="0 0 24 32" className="drop-shadow-sm">
          {/* corona */}
          <path
            d="M12 1 C7 1 3.5 3.5 3.5 8 C3.5 11 4.5 13 5.5 15 C6.6 17.2 6.8 20 7.2 23.5 C7.5 26.5 8.2 31 10 31 C11.8 31 11.2 25.5 12 25.5 C12.8 25.5 12.2 31 14 31 C15.8 31 16.5 26.5 16.8 23.5 C17.2 20 17.4 17.2 18.5 15 C19.5 13 20.5 11 20.5 8 C20.5 3.5 17 1 12 1 Z"
            fill={esDeciduo ? '#CBEAF5' : '#FDFDFD'}
            stroke={esDeciduo ? '#5FB4D9' : '#94A3B8'}
            strokeWidth="1.6"
          />
          {/* brillito */}
          <ellipse cx="8.2" cy="7" rx="1.6" ry="2.6" fill="#FFFFFF" opacity="0.85" transform="rotate(-20 8.2 7)" />
        </svg>
      </div>

      {/* Cuadrícula de caras: grid 3x3 de 15px, bordes incluidos, sin overflow */}
      <div className={`grid grid-cols-3 z-30 ${posicion === 'superior' ? 'order-3' : 'order-1'}`}
           style={{ width: '45px', height: '45px' }}>
        {caras.map(c => (
          <div key={c.nombre}
            onClick={() => onClickCara(numero, c.nombre)}
            className={`w-[15px] h-[15px] border border-gray-400 cursor-pointer transition-colors duration-200 hover:bg-blue-200 ${obtenerColor(c.nombre)} ${c.celda}`}
          />
        ))}
      </div>
    </div>
  );
}
