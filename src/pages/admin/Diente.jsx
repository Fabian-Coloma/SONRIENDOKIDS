
export default function Diente({ numero, tratamientos, onClickCara, posicion = 'superior' }) {
  const obtenerColor = (cara) => {
    const tratamiento = tratamientos.find(t => t.cara === cara);
    if (!tratamiento) return 'bg-white'; 
    if (tratamiento.procedimiento.includes('Caries')) return 'bg-red-500 border-red-700'; 
    if (tratamiento.procedimiento === 'Sellante') return 'bg-blue-500 border-blue-700';
    if (tratamiento.procedimiento === 'Extracción') return 'bg-black border-black';
    return 'bg-amber-500 border-amber-700'; 
  };

  const baseClasses = "absolute w-[15px] h-[15px] border border-gray-400 cursor-pointer transition-colors duration-200 hover:bg-gray-200";

  return (
    <div className="flex flex-col items-center group relative w-[45px] shrink-0">
      <span className={`text-[10px] font-black text-[#003B5C] ${posicion === 'superior' ? 'order-1 mb-1' : 'order-3 mt-1'}`}>
        {numero}
      </span>

      <div className={`relative ${posicion === 'superior' ? 'order-2 mb-3' : 'order-2 mt-3'}`}>
        <img 
          src={`/dientes/${numero}.png`} 
          alt={`Pieza ${numero}`}
          className="w-6 h-8 object-contain transition-all duration-300 ease-out relative z-10
                     group-hover:scale-[2.5] group-hover:drop-shadow-lg
                     bg-gray-100 rounded text-[8px] text-center text-gray-400 pointer-events-none"
        />
      </div>

      <div className={`relative w-[45px] h-[45px] z-30 ${posicion === 'superior' ? 'order-3' : 'order-1'}`}>
        <div onClick={() => onClickCara(numero, 'arriba')} className={`${baseClasses} top-0 left-[15px] ${obtenerColor('arriba')}`} />
        <div onClick={() => onClickCara(numero, 'izquierda')} className={`${baseClasses} top-[15px] left-0 ${obtenerColor('izquierda')}`} />
        <div onClick={() => onClickCara(numero, 'centro')} className={`${baseClasses} top-[15px] left-[15px] z-40 ${obtenerColor('centro')}`} />
        <div onClick={() => onClickCara(numero, 'derecha')} className={`${baseClasses} top-[15px] left-[30px] ${obtenerColor('derecha')}`} />
        <div onClick={() => onClickCara(numero, 'abajo')} className={`${baseClasses} top-[30px] left-[15px] ${obtenerColor('abajo')}`} />
      </div>
    </div>
  );
}