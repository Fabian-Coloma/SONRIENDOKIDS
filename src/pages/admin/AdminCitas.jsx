import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabase';
import AgendaDiaria from './components/AgendaDiaria';
import AgendaSemanal from './components/AgendaSemanal';
import ModalCita from './components/ModalCita';
import ModalDetalleCita from './components/ModalDetalleCita';

const AdminCitas = () => {
  const dateObj = new Date();
  const hoy = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  
  // 1. ESTADO ÚNICO Y SINCRONIZADO PARA LA FECHA
  const [fecha, setFecha] = useState(hoy); 
  
  const [vistaActiva, setVistaActiva] = useState('diaria'); 
  const [citas, setCitas] = useState([]);
  const [pacientesBD, setPacientesBD] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  const [datosCita, setDatosCita] = useState({ 
    id: null, nombre_nino: '', nombre_padre: '', telefono: '', 
    fecha: hoy, hora: '09:00', estado: 'No confirmado', motivo: '', paciente_id: null 
  });

  // Estados para el Modal de Detalles
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [citaParaDetalle, setCitaParaDetalle] = useState(null);
  
 const cargarDatosPrincipales = useCallback(async () => {
    // 1. Cargamos las citas JUNTO con los datos del paciente (JOIN relacional)
    const { data: dataCitas, error: errorCitas } = await supabase
      .from('citas')
      .select(`
        *,
        pacientes (
          nombre_nino,
          nombre_apoderado,
          whatsapp
        )
      `)
      .order('hora', { ascending: true });

    if (errorCitas) {
      console.error("Error cargando citas:", errorCitas);
    } else if (dataCitas) {
      // Adaptamos la respuesta para que tus componentes sigan leyendo "cita.paciente" 
      // (en singular) justo como lo tenías antes.
      const citasFormateadas = dataCitas.map(cita => ({
        ...cita,
        paciente: cita.pacientes || null 
      }));
      setCitas(citasFormateadas);
    }

    // 2. Mantenemos tu carga de pacientes independiente intacta
    const { data: dataPacientes, error: errorPacientes } = await supabase
      .from('pacientes')
      .select('*');

    if (errorPacientes) {
      console.error("Error cargando pacientes:", errorPacientes);
    } else if (dataPacientes) {
      setPacientesBD(dataPacientes);
    }
}, []);

  useEffect(() => {
    const iniciar = async () => {
      await cargarDatosPrincipales();
    };
    iniciar();
  }, [cargarDatosPrincipales]);

  // COMBINAR DATOS: Unimos la información del paciente a cada cita
  const citasCompletas = citas.map(cita => ({
    ...cita,
    paciente: pacientesBD.find(p => p.id === cita.paciente_id) || null
  }));

  // Usamos el estado único 'fecha' para filtrar
  const citasDelDia = citasCompletas.filter(c => c.fecha === fecha);

 const handleCambiarEstado = async (id, nuevoEstado) => {
  try {
    // Aquí hacemos un UPDATE en lugar de un SELECT, y usamos el 'id'
    const { error } = await supabase
      .from('citas')
      .update({ estado: nuevoEstado })
      .eq('id', id); 

    if (error) throw error;
    
    // Si sale bien, recargamos la lista para ver el cambio
    cargarDatosPrincipales(); 
  } catch (err) {
    console.error('Error al cambiar estado:', err);
  }
};

  const handleEliminar = async (id) => {
    if(window.confirm("¿Seguro que deseas anular y borrar esta cita?")) {
      const { error } = await supabase.from('citas').delete().eq('id', id);
      if (error) {
        alert("Error al eliminar la cita.");
        console.error(error);
      } else {
        cargarDatosPrincipales();
      }
    }
  };

  // Función unificada para crear una nueva cita (sincronizada con la fecha)
  const abrirModalNuevo = (fechaSeleccionada = fecha, hora = '09:00') => {
    setDatosCita({ 
      id: null, 
      nombre_nino: '', 
      nombre_padre: '', 
      telefono: '', 
      fecha: fechaSeleccionada, 
      hora, 
      estado: 'No confirmado', 
      motivo: '', 
      paciente_id: null 
    });
    setModalAbierto(true);
  };

  // NUEVA FUNCIÓN: Para editar una cita existente desde Agenda Diaria
  const abrirModalEditar = (cita) => {
    setDatosCita({
      id: cita.id,
      nombre_nino: cita.paciente?.nombre_nino || cita.nombre_nino || '',
      nombre_padre: cita.paciente?.nombre_apoderado || cita.nombre_padre || '',
      telefono: cita.paciente?.whatsapp || cita.telefono || '',
      fecha: cita.fecha,
      hora: cita.hora.substring(0, 5),
      estado: cita.estado,
      motivo: cita.motivo || '',
      paciente_id: cita.paciente_id || null
    });
    setModalAbierto(true);
  };

  // FUNCIÓN PARA EL DRAG & DROP
  const handleMoverCita = (citaId, nuevaFecha, nuevaHora) => {
    const citaMovida = citasCompletas.find(c => c.id.toString() === citaId.toString());
    
    if (citaMovida) {
      setDatosCita({
        id: citaMovida.id,
        nombre_nino: citaMovida.paciente?.nombre_nino || '',
        nombre_padre: citaMovida.paciente?.nombre_apoderado || '',
        telefono: citaMovida.paciente?.whatsapp || '',
        fecha: nuevaFecha, 
        hora: nuevaHora,   
        estado: citaMovida.estado || 'No confirmado',
        motivo: citaMovida.motivo || '',
        paciente_id: citaMovida.paciente_id || null
      });
      setModalAbierto(true);
    }
  };

  // Abre el modal de lectura detallada
  const abrirDetalle = (cita) => {
    setCitaParaDetalle(cita);
    setModalDetalleAbierto(true);
  };

  const handleGuardarCita = async (formData) => {
    setCargando(true);
    try {
      const { data: cruce, error: errorCruce } = await supabase.from('citas')
        .select('id').eq('fecha', formData.fecha).eq('hora', formData.hora).neq('estado', 'Cancelada');
      
      if (errorCruce) throw errorCruce;
      
      if (cruce && cruce.some(c => c.id !== formData.id)) {
        alert("⚠️ Horario ocupado. Selecciona otra hora.");
        setCargando(false);
        return;
      }

      let pacienteIdFinal = formData.paciente_id;

      if (!pacienteIdFinal && !formData.id) {
        const { data: nuevoPaciente, error: errorPaciente } = await supabase.from('pacientes').insert([{ 
          nombre_nino: formData.nombre_nino, 
          nombre_apoderado: formData.nombre_padre, 
          whatsapp: formData.telefono 
        }]).select('id').single(); 

        if (errorPaciente) throw errorPaciente;
        pacienteIdFinal = nuevoPaciente.id; 
      }

      const citaData = {
        fecha: formData.fecha, 
        hora: formData.hora, 
        motivo: formData.motivo,
        estado: formData.estado || 'No confirmado',
        paciente_id: pacienteIdFinal 
      };

      if (formData.id) {
        const { error: errorUpdate } = await supabase.from('citas').update(citaData).eq('id', formData.id);
        if (errorUpdate) throw errorUpdate;
      } else {
        const { error: errorInsert } = await supabase.from('citas').insert([citaData]);
        if (errorInsert) throw errorInsert;
      }

      setModalAbierto(false);
      await cargarDatosPrincipales();
      
    } catch (err) {
      console.error("Error completo de Supabase:", err);
      alert(`Error al guardar: ${err.message || 'Verifica la consola para más detalles.'}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setVistaActiva('diaria')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${vistaActiva === 'diaria' ? 'bg-white shadow text-[#003B5C]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-base">view_list</span> Diaria
          </button>
          <button 
            onClick={() => setVistaActiva('semanal')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${vistaActiva === 'semanal' ? 'bg-white shadow text-[#003B5C]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="material-symbols-outlined text-base">calendar_view_week</span> Semanal
          </button>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          {/* Selector de fecha general de la página SINCRONIZADO */}
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#003B5C] font-semibold outline-none focus:border-sonriendo-teal cursor-pointer"
          />
          <button 
            onClick={() => abrirModalNuevo(fecha)}
            className="bg-[#003B5C] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#002b44] shadow-md transition-colors"
          >
            Dar Cita
          </button>
        </div>
      </div>

      {vistaActiva === 'diaria' ? (
        <AgendaDiaria 
          citas={citasDelDia} 
          onCambiarEstado={handleCambiarEstado}
          onEditar={abrirModalEditar} // AHORA SÍ EXISTE ESTA FUNCIÓN
          onEliminar={handleEliminar}
          onVerDetalle={abrirDetalle}
        />
      ) : (
        <AgendaSemanal 
          citas={citas} 
          fechaBase={fecha} // SINCRONIZADO CON EL ESTADO CENTRAL
          onCambiarFecha={(nuevaFecha) => setFecha(nuevaFecha)} 
          onAgendarClick={(fechaCelda, horaCelda) => abrirModalNuevo(fechaCelda, horaCelda)} 
          onVerDetalle={abrirDetalle} 
          onMoverCita={handleMoverCita} 
        />
      )}

      {/* Modal para Crear / Editar */}
      <ModalCita 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)}
        onGuardar={handleGuardarCita}
        pacientesGuardados={pacientesBD}
        datosIniciales={datosCita}
        cargando={cargando}
      />

      {/* Modal para Ver Detalles y Pagos */}
      <ModalDetalleCita 
        cita={citaParaDetalle}
        isOpen={modalDetalleAbierto}
        onClose={() => setModalDetalleAbierto(false)}
        onActualizar={cargarDatosPrincipales}
        onUpdateEstadoPago={async (citaId, nuevoEstado) => {
          const { error } = await supabase.from('citas')
            .update({ estado_pago: nuevoEstado }).eq('id', citaId);
          if (error) {
            console.error('Error actualizando estado de pago:', error);
            alert('No se pudo actualizar el estado de pago.');
            return;
          }
          // Actualizar en memoria y refrescar desde BD (agenda + modal sincronizados)
          setCitaParaDetalle(prev => prev ? { ...prev, estado_pago: nuevoEstado } : prev);
          await cargarDatosPrincipales();
        }}
      />
    </div>
  );
};

export default AdminCitas;