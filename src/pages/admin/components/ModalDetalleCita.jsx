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
  const fechaNac = cita.paciente?.fecha_nacimiento || historia?.fecha_nacimiento || '';
  const edad = cita.paciente?.edad ?? historia?.edad ?? '';

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

  // Índice para animación escalonada de tarjetas
  const cardDelay = ['animation-delay:0ms','animation-delay:90ms','animation-delay:180ms','animation-delay:270ms'];

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-50 to-gray-100 animate-fade-in">
      {/* Barra de título con borde degradado fluido */}
      <div className="relative bg-[#003B5C] px-6 py-4 flex justify-between items-center sticky top-0 z-10 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,#00b4d8,#00f5d4,#00b4d8,#0077b6)] bg-[length:200%_100%] animate-gradient-border"></div>
        <h2 className="text-white text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">event_note</span>
          Detalles de la Cita
        </h2>
        <button onClick={onClose} className="text-white hover:text-red-400 hover:rotate-90 transition-all duration-300" title="Cerrar">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Fila 1: Paciente + Detalle de Cita */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Resumen de Paciente */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] border border-white/60 p-6 flex flex-col items-center text-center animate-slide-in" style={{animationDelay:'0ms'}}>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-full text-[#003B5C] mb-3 shadow-inner">
              <span className="material-symbols-outlined text-5xl block">face</span>
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
              className="text-xl font-black text-[#003B5C] hover:text-blue-600 hover:underline cursor-pointer transition-all break-words"
            >
              {nombrePaciente}
            </h3>
            <p className="text-gray-400 text-sm mt-1 animate-clip-reveal" style={{animationDelay:'200ms'}}>{edad ? `${edad} años` : ''}</p>
            <div className="mt-4 w-full space-y-1 text-left text-sm">
              <p className="text-gray-500 animate-clip-reveal" style={{animationDelay:'320ms'}}><span className="font-bold text-gray-400">Apoderado:</span> <span className="text-gray-700">{apoderado}</span></p>
              {fechaNac && <p className="text-gray-500 animate-clip-reveal" style={{animationDelay:'420ms'}}><span className="font-bold text-gray-400">Nacimiento:</span> <span className="text-gray-700">{fechaNac}</span></p>}
              {telefono && <p className="text-gray-500 animate-clip-reveal" style={{animationDelay:'520ms'}}><span className="font-bold text-gray-400">Teléfono:</span> <span className="text-gray-700">{telefono}</span></p>}
            </div>
          </div>

          {/* Detalle de la Cita Actual */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] border border-white/60 p-6 lg:col-span-2 flex flex-col justify-center animate-slide-in" style={{animationDelay:'120ms'}}>
            <h3 className="text-3xl font-black text-gray-800 mb-4 animate-clip-reveal" style={{animationDelay:'300ms'}}>{nombrePaciente}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="animate-clip-reveal" style={{animationDelay:'420ms'}}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Fecha y Hora</p>
                <div className="flex items-center gap-2 text-gray-800 font-bold bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-[#003B5C]">schedule</span>
                  {cita.fecha} | {cita.hora}
                </div>
              </div>
              <div className="animate-clip-reveal" style={{animationDelay:'520ms'}}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tratamiento / Motivo</p>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-gray-700 font-medium">
                  {cita.motivo || 'No especificado'}
                </div>
              </div>
            </div>
            {wsppUrl ? (
              <a
                href={wsppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 justify-center shadow-md hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 filter brightness-0 invert" />
                Enviar mensaje por WhatsApp
              </a>
            ) : (
              <p className="mt-5 text-gray-400 italic text-sm p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                No hay número registrado
              </p>
            )}
          </div>
        </div>

        {/* Fila 2: Estado de Pago + Notas Clínicas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] border border-white/60 p-6 animate-slide-in" style={{animationDelay:'240ms'}}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estado de Pago</h4>
              {cita.monto_total > 0 && (
                <span className="font-black text-[#003B5C] bg-gray-50 px-3 py-1 rounded-xl border border-gray-200 animate-pulse-glow">
                  Total: S/ {cita.monto_total}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onUpdateEstadoPago(cita.id, 'Pagado')} className={btnPagoClasses('Pagado') + ' hover:scale-105 transition-transform duration-200'}>
                <span className="material-symbols-outlined text-lg">check_circle</span> Pagado
              </button>
              <button onClick={() => onUpdateEstadoPago(cita.id, 'Falta')} className={btnPagoClasses('Falta') + ' hover:scale-105 transition-transform duration-200'}>
                <span className="material-symbols-outlined text-lg">pending</span> Falta
              </button>
              <button onClick={() => onUpdateEstadoPago(cita.id, 'Debe')} className={btnPagoClasses('Debe') + ' hover:scale-105 transition-transform duration-200'}>
                <span className="material-symbols-outlined text-lg">cancel</span> Debe
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] border border-white/60 p-6 lg:col-span-2 animate-slide-in" style={{animationDelay:'320ms'}}>
            <h4 className="text-xs font-bold text-[#003B5C] uppercase tracking-wider mb-4 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">medical_information</span>
              Último Resumen Clínico / Notas
            </h4>
            {cargandoHistoria ? (
              <p className="text-gray-500 text-sm animate-pulse">Cargando datos clínicos...</p>
            ) : !historia ? (
              <div className="flex flex-col items-center justify-center text-center opacity-60 py-6">
                <span className="material-symbols-outlined text-4xl mb-2 text-gray-400">history_toggle_off</span>
                <p className="text-sm italic text-gray-500">Aún no tiene historia clínica registrada.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Riesgo de Caries</p>
                  {historia.riesgo_caries === 'Bajo' && <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse-glow">🟢 Bajo Riesgo</span>}
                  {historia.riesgo_caries === 'Medio' && <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse-glow">🟡 Riesgo Medio</span>}
                  {historia.riesgo_caries === 'Alto' && <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse-glow">🔴 Alto Riesgo</span>}
                  {!historia.riesgo_caries && <span className="text-gray-400 text-sm italic">No evaluado</span>}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Diagnóstico / Plan de Tratamiento</p>
                  <p className="text-sm text-gray-700 font-medium bg-gray-50 p-3 rounded-xl border border-blue-50">
                    {historia.diagnostico_plan || <span className="italic text-gray-400">Sin diagnóstico registrado.</span>}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] border border-white/60 p-6 animate-slide-in" style={{animationDelay:'400ms'}}>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Acciones</h4>
          <div className="flex flex-wrap gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-[#003B5C] text-white font-bold shadow-md hover:shadow-lg hover:shadow-[#003B5C]/40 hover:-translate-y-0.5 hover:ring-2 hover:ring-[#00b4d8] transition-all duration-300">
              Volver a la Agenda
            </button>
            <button
              onClick={() => { if (cita.paciente_id) { onClose(); navigate(`/admin/pacientes/${cita.paciente_id}`); } }}
              className="px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 hover:border-[#00b4d8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Ver Historia Clínica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}