import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';

// ¡Regresamos pacientesGuardados a las propiedades!
export default function ModalCita({ isOpen, onClose, onGuardar, datosIniciales, cargando, pacientesGuardados }) {
  const [formData, setFormData] = useState(datosIniciales);
  // Estado para controlar si mostramos el formulario manual o la lista de existentes
  const [tipoPaciente, setTipoPaciente] = useState('nuevo'); 

  useEffect(() => {
    if (isOpen && datosIniciales) {
      setTimeout(() => {
        setFormData(datosIniciales);
        // Si la cita ya tiene un paciente_id, marcamos como existente por defecto
        if (datosIniciales.paciente_id) {
          setTipoPaciente('existente');
        } else {
          setTipoPaciente('nuevo');
        }
      }, 0);
    }
  }, [isOpen, datosIniciales]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para cuando elegimos un paciente de la lista
  const handlePacienteExistenteChange = (e) => {
    const selectedId = e.target.value;
    const paciente = pacientesGuardados.find(p => p.id.toString() === selectedId);

    setFormData(prev => ({
      ...prev,
      paciente_id: selectedId,
      nombre_nino: paciente?.nombre_nino || '',
      nombre_padre: paciente?.nombre_apoderado || '',
      telefono: paciente?.whatsapp || ''
    }));
  };

  // --- NUEVA LÓGICA: PREPARAR EL WHATSAPP ---
  const notificarPorWhatsApp = async (datosCita) => {
    // 1. Validamos que haya un teléfono (Regla estricta: todo va por WhatsApp)
    if (!datosCita.telefono) return;

    // 2. Armamos el mensaje que recibirá el paciente
    // En el futuro, si el estado es 'reprogramado', puedes cambiar este texto dinámicamente
    const mensaje = `🦷 ¡Hola ${datosCita.nombre_padre}! Desde *Sonriendo Kids* te confirmamos la cita para el súper paciente *${datosCita.nombre_nino}*.\n\n📅 Fecha: ${datosCita.fecha}\n⏰ Hora: ${datosCita.hora}\n\n¡Los esperamos con muchas ganas! ✨`;

    console.log("Mensaje preparado para enviar:", mensaje);

    // 3. Llamamos a nuestra Edge Function (que funcionará en cuanto le pongas las llaves de Meta)
    try {
      const { data, error } = await supabase.functions.invoke('enviar-whatsapp', {
        body: {
          telefono: datosCita.telefono,
          mensaje: mensaje
        }
      });

      if (error) throw error;
      console.log("¡WhatsApp enviado con éxito a la cola de mensajes!", data);
    } catch (err) {
      console.error("Error al conectar con el servidor de WhatsApp (Faltan claves de Meta):", err);
    }
  };

  // --- ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Disparamos la función de WhatsApp (aunque falle internamente hoy, no bloqueará la app)
    await notificarPorWhatsApp(formData);

    // Guardamos en la base de datos usando la función que viene del componente padre
    onGuardar(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden">
        
        {/* Cabecera del Modal */}
        <div className="bg-[#003B5C] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">
              {formData.id ? 'edit_calendar' : 'calendar_add_on'}
            </span>
            {formData.id ? 'Editar Cita' : 'Nueva Cita'}
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-400 transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[85vh] space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha</label>
              <input 
                type="date" 
                name="fecha" 
                value={formData.fecha} 
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm font-bold text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hora</label>
              <select 
                name="hora" 
                value={formData.hora} 
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm font-bold text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          {/* === SECCIÓN CONDICIONAL: NUEVO O EXISTENTE === */}
          {!formData.id && ( 
             <div className="space-y-4 border-t border-gray-100 pt-4 mt-2">
               
               {/* Botones de Selección */}
               <div className="flex gap-4 mb-2">
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer">
                   <input 
                     type="radio" 
                     name="tipoPaciente" 
                     value="nuevo" 
                     checked={tipoPaciente === 'nuevo'} 
                     onChange={() => { 
                       setTipoPaciente('nuevo'); 
                       setFormData(prev => ({...prev, paciente_id: null, nombre_nino: '', nombre_padre: '', telefono: ''}));
                     }} 
                     className="accent-[#003B5C]" 
                   />
                   Nuevo Paciente
                 </label>
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer">
                   <input 
                     type="radio" 
                     name="tipoPaciente" 
                     value="existente" 
                     checked={tipoPaciente === 'existente'} 
                     onChange={() => setTipoPaciente('existente')} 
                     className="accent-[#003B5C]" 
                   />
                   Paciente Existente
                 </label>
               </div>

               {tipoPaciente === 'existente' ? (
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Seleccionar Paciente</label>
                   <select
                     value={formData.paciente_id || ''}
                     onChange={handlePacienteExistenteChange}
                     className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm text-gray-700 focus:border-blue-500"
                     required
                   >
                     <option value="">-- Buscar paciente --</option>
                     {pacientesGuardados && pacientesGuardados.map(p => (
                       <option key={p.id} value={p.id}>
                         {p.nombre_nino} - {p.whatsapp}
                       </option>
                     ))}
                   </select>
                 </div>
               ) : (
                 <>
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Niño/a</label>
                     <input 
                       type="text" 
                       name="nombre_nino" 
                       value={formData.nombre_nino} 
                       onChange={handleChange}
                       placeholder="Ej. Juan Pérez"
                       className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm text-gray-700 focus:border-blue-500"
                       required={tipoPaciente === 'nuevo'}
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Apoderado</label>
                     <input 
                       type="text" 
                       name="nombre_padre" 
                       value={formData.nombre_padre} 
                       onChange={handleChange}
                       className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm text-gray-700 focus:border-blue-500"
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp / Teléfono</label>
                     <input 
                       type="tel" 
                       name="telefono" 
                       value={formData.telefono} 
                       onChange={handleChange}
                       className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm text-gray-700 focus:border-blue-500"
                     />
                   </div>
                 </>
               )}
             </div>
          )}

          <div className="border-t border-gray-100 pt-4 mt-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Motivo / Notas</label>
            <textarea 
              name="motivo" 
              value={formData.motivo} 
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none text-sm text-gray-700 focus:border-blue-500 resize-none"
              placeholder="Ej. Limpieza, Evaluación..."
            ></textarea>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
              disabled={cargando}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-[#003B5C] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#002b44] shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
              disabled={cargando}
            >
              {cargando ? (
                <> <span className="material-symbols-outlined animate-spin">sync</span> Guardando... </>
              ) : (
                <> <span className="material-symbols-outlined">save</span> Guardar Cita </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}