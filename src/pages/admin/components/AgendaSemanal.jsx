
// IMPORTANTE: Asegúrate de pasar 'onCambiarFecha' desde tu componente padre (AdminCitas)
const AgendaSemanal = ({ citas, fechaBase, onCambiarFecha, onAgendarClick, onVerDetalle, onMoverCita }) => {
  const horas = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  
  // Solución de zona horaria: Agregamos T00:00:00 para que JavaScript no desface el día en LATAM
  const baseDateStr = fechaBase.includes('T') ? fechaBase : `${fechaBase}T00:00:00`;

  const generarDiasSemana = () => {
    const base = new Date(baseDateStr);
    const diaSemana = base.getDay(); 
    const diferencia = diaSemana === 0 ? -6 : 1 - diaSemana; 
    
    const dias = [];
    for (let i = 0; i < 6; i++) {
      const fecha = new Date(base);
      fecha.setDate(base.getDate() + diferencia + i);
      dias.push({
        nombre: fecha.toLocaleDateString('es-ES', { weekday: 'short' }),
        fechaCorta: fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
        fechaISO: fecha.toISOString().split('T')[0]
      });
    }
    return dias;
  };

  const diasSemana = generarDiasSemana();

  // --- NUEVAS FUNCIONES PARA LOS BOTONES ---
  const retrocederSemana = () => {
    const nuevaFecha = new Date(baseDateStr);
    nuevaFecha.setDate(nuevaFecha.getDate() - 7);
    if (onCambiarFecha) onCambiarFecha(nuevaFecha.toISOString().split('T')[0]);
  };

  const avanzarSemana = () => {
    const nuevaFecha = new Date(baseDateStr);
    nuevaFecha.setDate(nuevaFecha.getDate() + 7);
    if (onCambiarFecha) onCambiarFecha(nuevaFecha.toISOString().split('T')[0]);
  };

  // Formato para mostrar en el centro de los botones
  const fechaMostrar = new Date(baseDateStr).toLocaleDateString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  const getCitaEnCelda = (fechaISO, hora) => {
    return citas.find(c => c.fecha === fechaISO && c.hora.substring(0, 5) === hora && c.estado !== 'Cancelada');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* CABECERA CON NAVEGACIÓN DE SEMANAS */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
        <h3 className="text-[#003B5C] font-bold text-lg capitalize">
          Semana del {diasSemana[0]?.fechaCorta} al {diasSemana[5]?.fechaCorta}
        </h3>
        
        {/* Botones de Navegación */}
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={retrocederSemana}
            className="p-2 px-3 hover:bg-gray-50 transition-colors border-r border-gray-200 text-gray-600 hover:text-[#003B5C]"
            title="Semana anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div className="px-4 py-2 font-medium text-gray-700 text-sm min-w-[110px] text-center">
             {fechaMostrar}
          </div>

          <button 
            onClick={avanzarSemana}
            className="p-2 px-3 hover:bg-gray-50 transition-colors border-l border-gray-200 text-gray-600 hover:text-[#003B5C]"
            title="Siguiente semana"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* TABLA DE AGENDA */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="border p-3 bg-gray-50 text-gray-500 font-bold w-20">Hora</th>
              {diasSemana.map((dia, idx) => (
                <th key={idx} className="border p-3 bg-gray-50 text-[#003B5C] font-bold capitalize">
                  {dia.nombre} {dia.fechaCorta}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map(hora => (
              <tr key={hora}>
                <td className="border p-2 text-xs font-bold text-gray-500 bg-gray-50">{hora}</td>
                {diasSemana.map(dia => {
                  const cita = getCitaEnCelda(dia.fechaISO, hora);
                  return (
                    <td 
                      key={`${dia.fechaISO}-${hora}`} 
                      className="border p-1 relative h-16 transition-colors min-w-[120px]"
                      // --- EVENTOS DRAG & DROP ---
                      onDragOver={(e) => {
                        e.preventDefault(); 
                        e.currentTarget.classList.add('bg-blue-50'); 
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove('bg-blue-50');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('bg-blue-50');
                        const citaId = e.dataTransfer.getData('citaId');
                        if (citaId && onMoverCita && !cita) { 
                          onMoverCita(citaId, dia.fechaISO, hora);
                        }
                      }}
                    >
                      {cita ? (
                        <div 
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData('citaId', cita.id);
                          }}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if(onVerDetalle) onVerDetalle(cita); 
                          }}
                          className="bg-blue-100 border border-blue-300 text-blue-800 rounded p-2 h-full flex flex-col justify-center items-start text-left shadow-sm cursor-grab active:cursor-grabbing hover:bg-blue-200 relative"
                        >
                          <span className="text-xs font-bold truncate w-full">
                            {cita.paciente?.nombre_nino || cita.nombre_nino || 'Sin paciente'}
                          </span>
                          <span className="text-[10px] truncate w-full text-gray-600">
                            {cita.motivo || cita.estado}
                          </span>

                          {cita.estado_pago === 'Debe' && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm" title="Debe"></div>}
                          {cita.estado_pago === 'Falta pagar' && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-sm" title="Falta pagar"></div>}
                          {cita.estado_pago === 'Pagado' && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm" title="Pagado"></div>}
                        </div>
                      ) : (
                        <div 
                          onClick={() => onAgendarClick(dia.fechaISO, hora)}
                          className="w-full h-full flex items-center justify-center bg-green-50/30 hover:bg-green-100 cursor-pointer group rounded"
                        >
                          <span className="material-symbols-outlined text-green-500 opacity-0 group-hover:opacity-100">add_circle</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgendaSemanal;