import { useState } from 'react';
import { supabase } from '../../supabase'; // Verifica que esta ruta sea la correcta a tu archivo supabase.js

const BookingForm = () => {
  // Estado para los campos de texto normales
  const [formData, setFormData] = useState({
    nombrePadre: '',
    nombreNino: '',
    telefono: '',
    motivo: '',
    fechaPropuesta: '',
    horaPropuesta: ''
  });

  // Estados separados para la lógica de la máscara de fecha y edad
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edadCalculada, setEdadCalculada] = useState('');
  
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // --- LÓGICA DE LA GRILLA SEMANAL (todos los días visibles) ---
  // Días de la semana (Lun=1 ... Dom=0). Mostramos Lun a Sáb en columnas.
  const DIAS_SEMANA = [
    { key: 1, nombre: 'Lun' },
    { key: 2, nombre: 'Mar' },
    { key: 3, nombre: 'Mié' },
    { key: 4, nombre: 'Jue' },
    { key: 5, nombre: 'Vie' },
    { key: 6, nombre: 'Sáb' },
  ];
  // Horarios de atención en pantalla: 10:00 - 20:00 (cada 1 hora), todos visibles
  const horariosAtencion = [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00"
  ];
  // Días que SÍ atienden (libres): mar (2) y mié (3)
  const DIAS_LIBRES = [2, 3];
  const HORA_LIBRE_INICIO = 11; // mar/mié libres desde las 11:00

  // ¿El botón (día, hora) está disponible? Solo mar/mié 11:00-20:00
  const esDisponible = (diaKey, hora) => {
    if (!DIAS_LIBRES.includes(diaKey)) return false;
    const hh = parseInt(hora.slice(0, 2), 10);
    return hh >= HORA_LIBRE_INICIO;
  };

  // --- LÓGICA DE LA MÁSCARA Y EDAD ---
  const handleFechaChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Solo números

    if (valor.length > 8) valor = valor.slice(0, 8); // Máximo 8 dígitos

    // Aplicar máscara DD/MM/AAAA
    if (valor.length > 4) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`;
    } else if (valor.length > 2) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
    }

    setFechaNacimiento(valor);

    if (valor.length === 10) {
      calcularEdad(valor);
    } else {
      setEdadCalculada('');
    }
  };

  const calcularEdad = (fechaStr) => {
    const [dia, mes, anio] = fechaStr.split('/');
    const fechaNac = new Date(anio, mes - 1, dia);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    if (mesActual < mes - 1 || (mesActual === mes - 1 && diaActual < dia)) {
      edad--;
    }

    if (edad >= 0 && edad <= 18) {
      setEdadCalculada(edad);
    } else {
      setEdadCalculada('Revisar fecha'); 
    }
  };

  // --- MANEJADORES DE EVENTOS NORMALES ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si cambia la fecha de reserva, buscamos la disponibilidad
    if (name === 'fechaPropuesta') {
      if (value) {
        consultarDisponibilidad(value);
      } else {
        setHorariosOcupados([]);
      }
    }
  };

  const consultarDisponibilidad = async (fecha) => {
    setCargandoHorarios(true);
    try {
      const { data, error } = await supabase
        .from('citas')
        .select('hora')
        .eq('fecha', fecha);

      if (error) throw error;

      if (data) {
        const horasReservadas = data.map(cita => cita.hora.substring(0, 5)); 
        setHorariosOcupados(horasReservadas);
      }
    } catch (error) {
      console.error("Error al consultar disponibilidad:", error);
    } finally {
      setCargandoHorarios(false);
    }
  };

  const handleHoraSelect = (hora) => {
    setFormData({ ...formData, horaPropuesta: hora });
  };

  // Calcula la próxima fecha real (YYYY-MM-DD) para un día de la semana dado
  const calcularFechaProxima = (diaKey) => {
    const hoy = new Date();
    const resultado = new Date(hoy);
    let diasSumar = (diaKey - hoy.getDay() + 7) % 7;
    if (diasSumar === 0) diasSumar = 7; // si es hoy, ir a la próxima semana
    resultado.setDate(hoy.getDate() + diasSumar);
    return resultado.toISOString().slice(0, 10);
  };

  // Al hacer clic en una celda disponible: fija día + hora
  const seleccionarCelda = (diaKey, hora) => {
    const fecha = calcularFechaProxima(diaKey);
    setFormData({ ...formData, fechaPropuesta: fecha, horaPropuesta: hora });
  };

  // --- NUEVA LÓGICA: ENVÍO DE CORREO A LA DOCTORA ---
  const notificarAlConsultorio = async () => {
    const { data, error } = await supabase.functions.invoke('enviar-correo', {
      body: {
        to: 'sonriendo.contacto@gmail.com', // correo de la Doctora Patricia
        subject: '🦷 ¡Nueva Reserva de Cita desde la Web!',
        html: `
          <h2>Nueva Cita Recibida</h2>
          <p>Un paciente acaba de agendar una cita en la web. Estos son los detalles:</p>
          <ul>
            <li><strong>Paciente:</strong> ${formData.nombreNino} (${edadCalculada} años)</li>
            <li><strong>Apoderado:</strong> ${formData.nombrePadre}</li>
            <li><strong>WhatsApp:</strong> ${formData.telefono}</li>
            <li><strong>Motivo:</strong> ${formData.motivo}</li>
            <li><strong>Fecha:</strong> ${formData.fechaPropuesta}</li>
            <li><strong>Hora:</strong> ${formData.horaPropuesta}</li>
          </ul>
          <p>Recuerda contactarlos por WhatsApp para confirmar.</p>
        `
      }
    });

    if (error) {
      console.error("Error al enviar notificación:", error);
    } else {
      console.log("Notificación enviada al consultorio:", data);
    }
  };

  // --- ENVÍO A SUPABASE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.horaPropuesta) {
      alert("Por favor, selecciona una hora para la cita.");
      return;
    }

    if (edadCalculada === '' || edadCalculada === 'Revisar fecha') {
      alert("Por favor, ingresa una fecha de nacimiento válida (DD/MM/AAAA).");
      return;
    }

    setEnviando(true);
    try {
      // Formatear la fecha para Supabase (YYYY-MM-DD)
      const [dia, mes, anio] = fechaNacimiento.split('/');
      const fechaFormateadaParaBD = `${anio}-${mes}-${dia}`;

      // PASO 1: Guardamos al paciente
      const { data: pacienteInsertado, error: errorPaciente } = await supabase
        .from('pacientes')
        .insert([
          { 
            nombre_nino: formData.nombreNino,
            nombre_apoderado: formData.nombrePadre,
            whatsapp: formData.telefono,
            fecha_nacimiento: fechaFormateadaParaBD, 
            edad: parseInt(edadCalculada, 10)         
          }
        ])
        .select() 
        .single();

      if (errorPaciente) throw errorPaciente;

      const nuevoPacienteId = pacienteInsertado.id;

      // PASO 2: Guardamos la cita conectada al paciente
      const { error: errorCita } = await supabase
        .from('citas')
        .insert([
          { 
            paciente_id: nuevoPacienteId,
            fecha: formData.fechaPropuesta,
            hora: formData.horaPropuesta,
            motivo: formData.motivo,
            estado: 'No confirmado' 
          }
        ]);

      if (errorCita) throw errorCita;

      // PASO 3: Enviar el correo de notificación interno (Edge Function)
      await notificarAlConsultorio();

      alert('✨ ¡Reserva enviada con éxito! Ya aparece en la agenda de la clínica.');
      
      // Limpiar formulario
      setFormData({
        nombrePadre: '', nombreNino: '', telefono: '', motivo: '', fechaPropuesta: '', horaPropuesta: ''
      });
      setFechaNacimiento('');
      setEdadCalculada('');
      setHorariosOcupados([]);

    } catch (error) {
      console.error("Error al guardar en la base de datos:", error);
      alert('Hubo un error al procesar tu reserva. Por favor, revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white">
      
      {/* LADO IZQUIERDO: Panel de Aventura */}
      <div className="lg:w-2/5 bg-[#4a6b53] relative p-10 md:p-14 flex flex-col justify-center text-white overflow-hidden">
        {/* Luces de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sonriendo-mint rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sonriendo-yellow rounded-full opacity-10 blur-2xl"></div>
        
        {/* DIBUJITOS DE ANIMALES SAFARI (Fondo) */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 transform -rotate-12 select-none">🦒</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 transform rotate-12 select-none">🦁</div>
        <div className="absolute top-1/4 right-8 text-5xl opacity-15 transform rotate-45 select-none">🐒</div>
        <div className="absolute bottom-1/4 -left-4 text-7xl opacity-10 transform -rotate-12 select-none">🐘</div>
        <div className="absolute top-1/2 left-16 text-4xl opacity-20 transform rotate-12 select-none">🦓</div>
        <div className="absolute -bottom-2 right-1/3 text-6xl opacity-15 transform -rotate-6 select-none">🦛</div>
        <div className="absolute top-4 right-1/4 text-3xl opacity-20 transform rotate-12 select-none">🦜</div>

        {/* Contenido de texto superpuesto */}
        <div className="relative z-10 pointer-events-none">
          <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-bold text-xs tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/30">
            Agenda en Tiempo Real
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Comienza su <br/>
            <span className="text-sonriendo-yellow">Aventura Dental</span> ✨
          </h2>
          <p className="text-white/90 text-lg mb-10 leading-relaxed font-medium">
            Elige el horario que mejor se acomode a ti. Nuestra agenda se actualiza automáticamente.
          </p>
          <ul className="space-y-5">
            <li className="flex items-center gap-4">
              <span className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">👨‍⚕️</span> 
              <span className="font-semibold text-white/90">Especialistas pediátricos</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">🎮</span> 
              <span className="font-semibold text-white/90">Zona de juegos temática</span>
            </li>
          </ul>
        </div>
      </div>

      {/* LADO DERECHO: Formulario de Reserva Interactivo */}
      <div className="lg:w-3/5 p-10 md:p-14 bg-[#fffbf7] relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-[#6b584a] ml-2">Tu Nombre (Apoderado)</label>
              <input type="text" name="nombrePadre" required value={formData.nombrePadre} placeholder="Ej. María Pérez" className="w-full px-5 py-3 rounded-2xl border-2 border-[#e3d1c3] bg-white text-gray-700 focus:border-[#4a6b53] focus:ring-4 focus:ring-[#4a6b53]/10 outline-none transition-all duration-300 font-medium" onChange={handleChange} />
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-[#6b584a] ml-2">Teléfono / Celular (WhatsApp)</label>
              <input type="tel" name="telefono" required value={formData.telefono} placeholder="Ej. 999 888 777" className="w-full px-5 py-3 rounded-2xl border-2 border-[#e3d1c3] bg-white text-gray-700 focus:border-[#4a6b53] focus:ring-4 focus:ring-[#4a6b53]/10 outline-none transition-all duration-300 font-medium" onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-sm font-bold text-[#6b584a] ml-2">Nombre del Pacientito</label>
            <input type="text" name="nombreNino" required value={formData.nombreNino} placeholder="Ej. Lucas" className="w-full px-5 py-3 rounded-2xl border-2 border-[#e3d1c3] bg-white text-gray-700 focus:border-[#d08c60] focus:ring-4 focus:ring-[#d08c60]/10 outline-none transition-all duration-300 font-medium" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-[#6b584a] ml-2">Fecha de Nacimiento</label>
              <input 
                type="text" 
                name="fechaNacimiento" 
                required 
                value={fechaNacimiento} 
                onChange={handleFechaChange}
                placeholder="DD/MM/AAAA" 
                className="w-full px-5 py-3 rounded-2xl border-2 border-[#e3d1c3] bg-white text-gray-700 focus:border-[#d08c60] focus:ring-4 focus:ring-[#d08c60]/10 outline-none transition-all duration-300 font-medium" 
              />
              <p className="text-xs text-[#a67b5b] mt-1 ml-2 font-medium">Ej: Escribe 15082015</p>
            </div>
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-[#6b584a] ml-2">Edad (Calculada)</label>
              <input 
                type="text" 
                value={typeof edadCalculada === 'number' ? `${edadCalculada} años` : edadCalculada} 
                readOnly 
                disabled
                placeholder="Años" 
                className="w-full px-5 py-3 rounded-2xl border-2 border-gray-200 bg-gray-100 text-gray-500 outline-none cursor-not-allowed font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-sm font-bold text-[#6b584a] ml-2">Motivo de Consulta</label>
            <select name="motivo" required value={formData.motivo} className="w-full px-5 py-3 rounded-2xl border-2 border-[#e3d1c3] bg-white text-gray-700 focus:border-sonriendo-teal focus:ring-4 focus:ring-sonriendo-teal/10 outline-none transition-all duration-300 cursor-pointer font-medium" onChange={handleChange}>
              <option value="">Selecciona...</option>
              <option value="Primera visita / Evaluación">Primera visita / Evaluación</option>
              <option value="Tratamiento de caries">Tratamiento de caries</option>
              <option value="Ortodoncia Infantil">Ortodoncia Infantil</option>
              <option value="Limpieza y Flúor">Limpieza y Flúor</option>
              <option value="Emergencia">Emergencia</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="text-sm font-bold text-[#6b584a] ml-2 mb-3 block">
              Elige el día y la hora de tu cita:
            </label>

            <div className="overflow-x-auto pb-2">
              <div className="min-w-[520px]">
                {/* Encabezado de días */}
                <div className="grid grid-cols-[64px_repeat(6,1fr)] gap-2 mb-2">
                  <div></div>
                  {DIAS_SEMANA.map(d => (
                    <div key={d.key} className="text-center text-xs font-bold text-[#6b584a] uppercase">
                      {d.nombre}
                    </div>
                  ))}
                </div>

                {/* Filas de horas */}
                {horariosAtencion.map((hora) => (
                  <div key={hora} className="grid grid-cols-[64px_repeat(6,1fr)] gap-2 mb-2">
                    <div className="flex items-center justify-end pr-1 text-xs font-bold text-gray-400">
                      {hora}
                    </div>
                    {DIAS_SEMANA.map(d => {
                      const disponible = esDisponible(d.key, hora);
                      const seleccionado = formData.horaPropuesta === hora &&
                        formData.fechaPropuesta === calcularFechaProxima(d.key);
                      return (
                        <button
                          key={d.key}
                          type="button"
                          disabled={!disponible}
                          onClick={() => seleccionarCelda(d.key, hora)}
                          className={`py-2 rounded-lg text-xs font-bold transition-all duration-200 border
                            ${!disponible
                              ? 'bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                              : seleccionado
                                ? 'bg-sonriendo-teal border-sonriendo-teal text-white shadow-md scale-105'
                                : 'bg-white border-[#e3d1c3] text-gray-600 hover:border-sonriendo-teal hover:text-sonriendo-teal'}`}
                        >
                          {disponible ? 'Libre' : 'Ocupado'}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {formData.fechaPropuesta && formData.horaPropuesta && (
              <p className="text-sm text-[#4a6b53] font-bold mt-3 ml-2">
                ✅ Cita seleccionada: {DIAS_SEMANA.find(d => d.key === new Date(formData.fechaPropuesta + 'T12:00:00').getDay())?.nombre} {formData.fechaPropuesta} a las {formData.horaPropuesta}
              </p>
            )}
          </div>

          <div className="pt-6 border-t border-[#e3d1c3]/50">
            <button 
              type="submit" 
              disabled={enviando || !formData.horaPropuesta}
              className={`w-full py-5 font-extrabold text-xl rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group
                ${(!formData.horaPropuesta || enviando)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-sonriendo-yellow text-[#5c4a3d] shadow-lg hover:bg-[#a67b5b] hover:text-white hover:-translate-y-1'
                }`}
            >
              {enviando ? 'Guardando en agenda...' : 'Confirmar Reserva 🚀'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookingForm;