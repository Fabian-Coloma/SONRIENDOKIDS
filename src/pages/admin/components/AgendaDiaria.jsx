const AgendaDiaria = ({ citas, onCambiarEstado, onEditar, onEliminar, onVerDetalle }) => {
  const estados = [
    'No confirmado', 'Confirmado por teléfono', 'Confirmado por e-mail',
    'En sala de espera', 'Atendiéndose', 'Atendido', 'No asiste', 'Cancelada'
  ];

  const getColorEstado = (estado) => {
    if (estado?.includes('Confirmado')) return 'text-blue-600 font-semibold';
    if (estado === 'En sala de espera') return 'text-orange-500 font-semibold';
    if (estado === 'Atendiéndose') return 'text-purple-600 font-semibold';
    if (estado === 'Atendido') return 'text-green-600 font-semibold';
    if (estado === 'No asiste' || estado === 'Cancelada') return 'text-red-500 font-semibold';
    return 'text-gray-500';
  };

  const getSituacionFinanciera = (estadoPago) => {
    if (estadoPago === 'Pagado') return { texto: 'Al día', clase: 'bg-green-100 text-green-700' };
    if (estadoPago === 'Debe') return { texto: 'Con Deuda', clase: 'bg-red-100 text-red-700' };
    return { texto: 'Falta Pagar', clase: 'bg-yellow-100 text-yellow-700' };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="px-6 py-4 font-bold">Hora</th>
              <th className="px-6 py-4 font-bold">Paciente</th>
              <th className="px-6 py-4 font-bold">Estado de la cita</th>
              <th className="px-6 py-4 font-bold text-center">Situación</th>
              <th className="px-6 py-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {citas.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-medium">
                  Agenda libre para este día.
                </td>
              </tr>
            ) : (
              citas.map((cita) => {
                const situacion = getSituacionFinanciera(cita.estado_pago);
                
                return (
                  <tr 
                    key={cita.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onVerDetalle) onVerDetalle(cita);
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-bold text-center border border-blue-100 inline-block shadow-sm">
                        {cita.hora.substring(0, 5)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#003B5C] text-base">
                        {cita.paciente?.nombre_nino || cita.nombre_nino || 'Paciente no registrado'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="material-symbols-outlined text-[14px]">person</span> 
                        {cita.paciente?.nombre_apoderado || cita.nombre_padre || '-'}
                        <span className="material-symbols-outlined text-[14px] ml-2">call</span> 
                        {cita.paciente?.whatsapp || cita.telefono || '-'}
                      </div>
                      {cita.motivo && (
                        <p className="text-xs text-gray-400 mt-1 truncate max-w-50" title={cita.motivo}>
                          Motivo: {cita.motivo}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={cita.estado}
                        onChange={(e) => onCambiarEstado(cita.id, e.target.value)}
                        className={`bg-transparent border-b border-gray-300 outline-none text-sm cursor-pointer hover:border-blue-500 py-1 ${getColorEstado(cita.estado)}`}
                      >
                        {estados.map(est => <option key={est} value={est} className="text-gray-800">{est}</option>)}
                      </select>
                     
                      <div className="mt-2 flex gap-2">
                        <button className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-600 transition-colors flex items-center gap-1" title="Próximamente: IA enviará recordatorio automático">
                          <span className="material-symbols-outlined text-[12px]">smart_toy</span> Notificar (IA)
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-md text-xs font-bold border ${situacion.clase} border-opacity-50 inline-block min-w-20`}>
                        {situacion.texto}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => onEditar(cita)} 
                          className="text-gray-400 hover:text-blue-600 bg-white shadow-sm p-1.5 rounded-lg border border-gray-100 transition-all"
                          title="Editar cita"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button 
                          onClick={() => onEliminar(cita.id)} 
                          className="text-gray-400 hover:text-red-600 bg-white shadow-sm p-1.5 rounded-lg border border-gray-100 transition-all"
                          title="Eliminar cita"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgendaDiaria;