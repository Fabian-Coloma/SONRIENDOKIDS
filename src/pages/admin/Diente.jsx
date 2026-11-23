// Diente.jsx — icono de diente SVG + cuadrícula de caras con estado pendiente vs. realizado

export default function Diente({ numero, tratamientos, onClickCara, posicion = 'superior' }) {
  const esDeciduo = numero >= 50 && numero <= 85;

  const obtenerEstiloCara = (cara) => {
    const tratamiento = tratamientos.find(t => t.cara === cara);
    if (!tratamiento) return { clase: 'bg-white', titulo: `Pieza ${numero} (${cara})` };

    const proc = tratamiento.procedimiento.toLowerCase();
    let colorBase = 'bg-gray-400 border-gray-600';

    if (proc.includes('caries') || proc.includes('curación')) colorBase = 'bg-red-500 border-red-700';
    else if (proc.includes('sellante')) colorBase = 'bg-blue-600 border-blue-800';
    else if (proc.includes('exodoncia') || proc.includes('extracción')) colorBase = 'bg-black border-black';
    else if (proc.includes('radiografía') || proc.includes('rayos')) colorBase = 'bg-purple-500 border-purple-700';
    else if (proc.includes('flúor') || proc.includes('fluor')) colorBase = 'bg-green-500 border-green-700';
    else if (proc.includes('profilaxis') || proc.includes('destartraje') || proc.includes('limpieza')) colorBase = 'bg-teal-400 border-teal-600';
    else if (proc.includes('pulpectomía') || proc.includes('pulpotomía') || proc.includes('pulpar')) colorBase = 'bg-orange-500 border-orange-700';
    else if (proc.includes('corona')) colorBase = 'bg-yellow-400 border-yellow-600';
    else if (proc.includes('sedación') || proc.includes('oxido')) colorBase = 'bg-pink-400 border-pink-600';

    const estadoTexto = tratamiento.realizado ? 'REALIZADO' : 'PENDIENTE';
    const marcaRealizado = tratamiento.realizado ? 'ring-2 ring-inset ring-emerald-300 opacity-90' : '';

    return {
      clase: `${colorBase} ${marcaRealizado}`,
      titulo: `Pieza ${numero} (${cara}): ${tratamiento.procedimiento} [${estadoTexto}]`
    };
  };

  const caras = [
    { nombre: 'arriba',    celda: 'col-start-2 row-start-1 rounded-t-lg' },
    { nombre: 'izquierda', celda: 'col-start-1 row-start-2 rounded-l-lg' },
    { nombre: 'centro',    celda: 'col-start-2 row-start-2' },
    { nombre: 'derecha',   celda: 'col-start-3 row-start-2 rounded-r-lg' },
    { nombre: 'abajo',     celda: 'col-start-2 row-start-3 rounded-b-lg' },
  ];

  return (
    <div className="flex flex-col items-center group relative w-[30px] xs:w-[38px] sm:w-[46px]">
      <span className={`text-[10px] font-black text-[#003B5C] ${posicion === 'superior' ? 'order-1 mb-1' : 'order-3 mt-1'}`}>
        {numero}
      </span>

      <div className={`order-2 flex justify-center overflow-visible ${posicion === 'superior' ? 'mb-2' : 'mt-2'} transition-transform duration-300 ease-out group-hover:scale-125 relative z-10`}>
        <svg width="24" height="26" viewBox="0 0 24 32" className="drop-shadow-sm">
          <path
            d="M12 1 C7 1 3.5 3.5 3.5 8 C3.5 11 4.5 13 5.5 15 C6.6 17.2 6.8 20 7.2 23.5 C7.5 26.5 8.2 31 10 31 C11.8 31 11.2 25.5 12 25.5 C12.8 25.5 12.2 31 14 31 C15.8 31 16.5 26.5 16.8 23.5 C17.2 20 17.4 17.2 18.5 15 C19.5 13 20.5 11 20.5 8 C20.5 3.5 17 1 12 1 Z"
            fill={esDeciduo ? '#CBEAF5' : '#FDFDFD'}
            stroke={esDeciduo ? '#5FB4D9' : '#94A3B8'}
            strokeWidth="1.6"
          />
          <ellipse cx="8.2" cy="7" rx="1.6" ry="2.6" fill="#FFFFFF" opacity="0.85" transform="rotate(-20 8.2 7)" />
        </svg>
      </div>

      <div className={`grid grid-cols-3 z-30 w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] ${posicion === 'superior' ? 'order-3' : 'order-1'}`}>
        {caras.map(c => {
          const estilo = obtenerEstiloCara(c.nombre);
          return (
            <div
              key={c.nombre}
              title={estilo.titulo}
              onClick={() => onClickCara(numero, c.nombre)}
              className={`w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] border border-gray-400 cursor-pointer transition-colors duration-200 hover:bg-blue-200 ${estilo.clase} ${c.celda}`}
            />
          );
        })}
      </div>
    </div>
  );
}