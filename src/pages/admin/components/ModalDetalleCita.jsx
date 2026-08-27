import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. AÑADE ESTO
import { supabase } from '../../../supabase';

export default function ModalDetalleCita({ isOpen, onClose, cita, onUpdateEstadoPago }) {
 const navigate = useNavigate(); // <--- 2. AÑADE ESTO
  const [historia, setHistoria] = useState(null);
  const [cargandoHistoria, setCargandoHistoria] = useState(false);

  useEffect(() => {
    const cargarHistoriaClinica = async () => {
      setCargandoHistoria(true);
      try {
        const { data, error } = await supabase
          .from('historias_clinicas')
          .select('*')
          .eq('paciente_id', cita.paciente_id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Error al cargar historia:", error);
        } else {
          setHistoria(data);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      } finally {
        setCargandoHistoria(false);
      }
    };

    if (isOpen && cita?.paciente_id) {
      cargarHistoriaClinica();
    } else {
      setTimeout(() => {
        setHistoria(null);
      }, 0);
    }
  }, [isOpen, cita]);

  if (!isOpen || !cita) return null;

  // Buscamos primero en el objeto 'paciente' (singular) y sus columnas correctas en BD
  const nombrePaciente = cita.paciente?.nombre_nino || cita.nombre_nino || historia?.nombres || 'Paciente sin nombre';
  const apoderado = cita.paciente?.nombre_apoderado || historia?.apoderado_nombre || 'No registrado';
  const telefono = cita.paciente?.whatsapp || historia?.telefono || '';

  const numeroLimpio = telefono.replace(/\D/g, '');
  const numeroWspp = numeroLimpio.startsWith('51') ? numeroLimpio : (numeroLimpio ? `51${numeroLimpio}` : null);
  const wsppUrl = numeroWspp ? `https://wa.me/${numeroWspp}` : null;

  const btnPagoClasses = (estadoEsperado) => {
    const activo = cita.estado_pago === estadoEsperado;
    let base = "flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1 transition-all border ";
    
    if (estadoEsperado === 'Pagado') {
      return base + (activo ? "bg-green-100 text-green-700 border-green-300" : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-green-50");
    }
    if (estadoEsperado === 'Falta') {
      return base + (activo ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-yellow-50");
    }
    if (estadoEsperado === 'Debe') {
      return base + (activo ? "bg-red-100 text-red-700 border-red-300" : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-red-50");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 pt-28 pb-6 px-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] shadow-2xl flex flex-col overflow-hidden mx-auto">
        
        <div className="bg-[#003B5C] px-6 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">event_note</span>
            Detalles de la Cita
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-400 transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          
          {/* Cabecera del paciente: centrada, sin cortes */}
          <div className="flex flex-col items-center gap-3 mb-6 border-b pb-6 border-gray-100 text-center">
            <div className="bg-blue-50 p-4 rounded-full text-[#003B5C]">
              <span className="material-symbols-outlined text-4xl block">face</span>
            </div>
            <h3 
              onClick={() => {
                if (cita.paciente_id) {
                  onClose();
                  navigate(`/admin/pacientes/${cita.paciente_id}`); 
                } else {
                  alert("Este paciente no está registrado en la base de datos aún.");
                }
              }}
              title="Ver historial completo"
              className="text-2xl font-black text-[#003B5C] hover:text-blue-600 hover:underline cursor-pointer transition-all flex items-center gap-2 group break-words text-center"
            >
              {nombrePaciente}
              {cita.paciente_id && (
                <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  open_in_new
                </span>
              )}
            </h3>
            <p className="text-gray-500 font-medium">Apoderado: <span className="text-gray-700">{apoderado}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fecha y Hora</h4>
                <div className="flex items-center gap-2 text-gray-800 font-bold bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="material-symbols-outlined text-[#003B5C]">schedule</span>
                  {cita.fecha} | {cita.hora}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Motivo de Consulta</h4>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-700 font-medium whitespace-pre-wrap">
                  {cita.motivo || 'No especificado'}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contacto</h4>
                {wsppUrl ? (
                  <a 
                    href={wsppUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full justify-center shadow-sm"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 filter brightness-0 invert" />
                    Enviar mensaje por WhatsApp
                  </a>
                ) : (
                  <p className="text-gray-400 italic text-sm p-3 bg-gray-50 rounded-lg border border-gray-100">
                    No hay número registrado
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 h-full flex flex-col">
                <h4 className="text-xs font-bold text-[#003B5C] uppercase tracking-wider mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">medical_information</span>
                  Último Resumen Clínico
                </h4>

                {cargandoHistoria ? (
                  <p className="text-gray-500 text-sm animate-pulse">Cargando datos clínicos...</p>
                ) : !historia ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-center opacity-60">
                    <span className="material-symbols-outlined text-4xl mb-2 text-gray-400">history_toggle_off</span>
                    <p className="text-sm italic text-gray-500">Aún no tiene historia clínica registrada.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Riesgo de Caries</p>
                      {historia.riesgo_caries === 'Bajo' && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">🟢 Bajo Riesgo</span>}
                      {historia.riesgo_caries === 'Medio' && <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">🟡 Riesgo Medio</span>}
                      {historia.riesgo_caries === 'Alto' && <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">🔴 Alto Riesgo</span>}
                      {!historia.riesgo_caries && <span className="text-gray-400 text-sm italic">No evaluado</span>}
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Diagnóstico / Plan de Tratamiento</p>
                      <p className="text-sm text-gray-700 font-medium bg-white p-3 rounded-lg border border-blue-50 line-clamp-4">
                        {historia.diagnostico_plan || <span className="italic text-gray-400">Sin diagnóstico registrado.</span>}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estado de Pago</h4>
                  {cita.monto_total > 0 && (
                    <span className="font-black text-[#003B5C] bg-white px-3 py-1 rounded-lg border border-gray-200">
                      Total: S/ {cita.monto_total}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => onUpdateEstadoPago(cita.id, 'Pagado')} className={btnPagoClasses('Pagado')}>
                    <span className="material-symbols-outlined text-lg">check_circle</span> Pagado
                  </button>
                  <button onClick={() => onUpdateEstadoPago(cita.id, 'Falta')} className={btnPagoClasses('Falta')}>
                    <span className="material-symbols-outlined text-lg">pending</span> Falta
                  </button>
                  <button onClick={() => onUpdateEstadoPago(cita.id, 'Debe')} className={btnPagoClasses('Debe')}>
                    <span className="material-symbols-outlined text-lg">cancel</span> Debe
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}