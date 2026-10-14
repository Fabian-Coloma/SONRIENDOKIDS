import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import OdontogramaInteractivo from './OdontogramaInteractivo';
import ProximaCita from './ProximaCita';
import { useAsistente } from '../../context/useAsistente.js';

// ==========================================
// COMPONENTES REUTILIZABLES
// ==========================================
const Input = ({ label, type = "text", name, value, onChange, placeholder, colSpan = "col-span-1" }) => (
  <div className={colSpan}>
    <label className="block text-xs font-bold text-[#003B5C] mb-1">{label}</label>
    <input 
      type={type} name={name} 
      value={value || ''} 
      onChange={onChange} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#003B5C] focus:ring-1 focus:ring-[#003B5C] text-sm text-gray-700 transition-colors"
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
  <div className="col-span-full">
    <label className="block text-xs font-bold text-[#003B5C] mb-1">{label}</label>
    <textarea 
      name={name} 
      value={value || ''} 
      onChange={onChange} placeholder={placeholder} rows={rows}
      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#003B5C] focus:ring-1 focus:ring-[#003B5C] text-sm text-gray-700 transition-colors resize-none"
    />
  </div>
);

const OpcionesSiNo = ({ label, name, value, onChange }) => (
  <div className="col-span-1">
    <label className="block text-xs font-bold text-[#003B5C] mb-2">{label}</label>
    <div className="flex gap-4">
      <label className="flex items-center gap-2 cursor-pointer text-sm">
        <input 
          type="radio" name={name} value="Si" checked={value === 'Si'} onChange={onChange} 
          className="accent-[#003B5C] w-4 h-4"
        /> 
        <span className="font-medium text-gray-700">Sí</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer text-sm">
        <input 
          type="radio" name={name} value="No" checked={value === 'No'} onChange={onChange} 
          className="accent-[#003B5C] w-4 h-4"
        /> 
        <span className="font-medium text-gray-700">No</span>
      </label>
    </div>
  </div>
);

const codigosCIE10 = [
  "K02.1 - Caries de la dentina",
  "K02.2 - Caries del cemento",
  "K02.3 - Caries dentaria detenida",
  "K04.0 - Pulpitis",
  "K04.1 - Necrosis de la pulpa",
  "K04.4 - Periodontitis apical aguda originada en la pulpa",
  "K05.0 - Gingivitis aguda",
  "K05.1 - Gingivitis crónica",
  "K00.6 - Alteraciones en la erupción dentaria",
  "S02.5 - Fractura de los dientes"
];

// PUNTO 8: LISTA ACTUALIZADA DE MEDICAMENTOS + "Otros"
const MEDICAMENTOS = [
  'Paracetamol 120mg/5ml jarabe',
  'Panadol 160mg/5ml jarabe',
  'Ibuprofeno 100mg/5ml suspensión oral',
  'Doloral forte 200mg/5ml suspensión oral',
  'Amoxicilina + ácido clavulánico 250mg/5ml + 62.5mg /5ml suspensión oral',
  'Amoxicilina 250mg/5ml suspensión oral',
  'Azitromicina 200mg/5ml suspensión oral',
  'Dexametasona 2mg/5ml',
  'Otros'
];

export default function AdminHistorial() {
  const { id } = useParams();
  const pacienteIdActual = id;
  
  const { datosFormulario, setDatosFormulario } = useAsistente();

  const [pestañaActiva, setPestañaActiva] = useState('filiacion');
  const [guardando, setGuardando] = useState(false);
  const [modalOdontogramaAbierto, setModalOdontogramaAbierto] = useState(false);
  const [irAEvolucionTrasConfirmar, setIrAEvolucionTrasConfirmar] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true); 

  const [notasEvolucion, setNotasEvolucion] = useState([]);
  const [odontogramasSesion, setOdontogramasSesion] = useState([]);
  const [guardandoNota, setGuardandoNota] = useState(false);
  
  const [nuevaNota, setNuevaNota] = useState({
    motivo: '', 
    examen_intraoral: '', 
    diagnostico_cie10: '', 
    tratamiento: '', 
    medicamentos: '',
    prescripciones: [{ medicamento: '', dosis: '', isOtro: false }], 
    indicaciones: '', 
    dentista_nombre: 'Dra. Patricia Mora',
    dentista_cop: '' 
  }); 

  const [hc, setHc] = useState({
    nombres: '', fecha_nacimiento: '', sexo: '', colegio: '',
    apoderado_nombre: '', apoderado_parentesco: '', apoderado_dni: '', apoderado_ocupacion: '',
    telefono: '', email: '', domicilio: '', contacto_emergencia: '', telefono_emergencia: '',
    motivo_consulta: '', historia_enfermedad: '', medicacion_actual: '', alergia_medicamentos: '', hospitalizaciones: '',
    primera_vez: 'Si', comportamiento_previo: 'N/A', traumatismos: 'No', traumatismos_detalle: '',
    lactancia_biberon: '', succion_no_nutritiva: 'No', respiracion: 'Nasal', otros_habitos: '',
    frecuencia_cepillado: '2', supervision_cepillado: 'Si', uso_fluor: '', dieta_azucares: '',
    examen_extraoral: '', examen_intraoral: '', riesgo_caries: 'Medio', diagnostico_plan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHc(prev => ({ ...prev, [name]: value }));
  };

  const handleNotaChange = (e) => {
    const { name, value } = e.target;
    setNuevaNota(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (datosFormulario) {
      if (datosFormulario.accion === 'cambiar_pestana') {
        // CORRECCIÓN IMAGEN 1: Agrupar los cambios de estado dentro del setTimeout
        setTimeout(() => {
          setPestañaActiva(datosFormulario.tab); 
          setDatosFormulario({});
        }, 50); 
        return; 
      }
      if (datosFormulario.campo && datosFormulario.valor) {
        const { campo, valor } = datosFormulario;
        const camposDeNota = ['motivo', 'examen_intraoral', 'diagnostico_cie10', 'tratamiento', 'medicamentos', 'indicaciones'];
        setTimeout(() => {
          if (camposDeNota.includes(campo)) {
            setNuevaNota(prev => ({ ...prev, [campo]: valor }));
          } else {
            setHc(prev => ({ ...prev, [campo]: valor }));
          }
          setDatosFormulario({}); 
        }, 50); 
      }
    }
  }, [datosFormulario, setDatosFormulario]);

  useEffect(() => {
    const cargarHistorial = async () => {
      if (!pacienteIdActual) return;
      try {
        const { data: pacienteData } = await supabase.from('pacientes').select('*').eq('id', pacienteIdActual).single();
        const { data: hcData } = await supabase.from('historias_clinicas').select('*').eq('paciente_id', pacienteIdActual).single();

        setHc(prev => {
          const nuevosDatos = { ...prev };
          if (pacienteData) {
            nuevosDatos.nombres = pacienteData.nombre_nino || '';
            nuevosDatos.apoderado_nombre = pacienteData.nombre_apoderado || '';
            nuevosDatos.telefono = pacienteData.whatsapp || '';
          }
          return hcData ? { ...nuevosDatos, ...hcData } : nuevosDatos;
        });

        const { data: notasData } = await supabase
          .from('notas_evolucion')
          .select('*')
          .eq('paciente_id', pacienteIdActual)
          .order('created_at', { ascending: false });

        if (notasData) setNotasEvolucion(notasData);

        const { data: odoData } = await supabase
          .from('odontogramas_sesion')
          .select('*')
          .eq('paciente_id', pacienteIdActual)
          .order('fecha', { ascending: false });
        if (odoData) setOdontogramasSesion(odoData);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setCargandoDatos(false);
      }
    };
    cargarHistorial();
  }, [pacienteIdActual]);

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      const datosParaGuardar = { paciente_id: pacienteIdActual, ...hc };
      if (datosParaGuardar.fecha_nacimiento === '') datosParaGuardar.fecha_nacimiento = null;
      delete datosParaGuardar.nombres;
      delete datosParaGuardar.apoderado_nombre;
      delete datosParaGuardar.telefono;

      const { error: errorHc } = await supabase.from('historias_clinicas').upsert(datosParaGuardar, { onConflict: 'paciente_id' });
      if (errorHc) throw errorHc;

      const { error: errorPaciente } = await supabase.from('pacientes').update({
        nombre_nino: hc.nombres, nombre_apoderado: hc.apoderado_nombre, whatsapp: hc.telefono
      }).eq('id', pacienteIdActual);
      if (errorPaciente) throw errorPaciente;
      
      alert("¡Historia Clínica y datos del paciente guardados exitosamente!");
    } catch (error) {
      alert(`Error al guardar: ${error.message}`);
    } finally {
      setGuardando(false);
    }
  };

  const handleGuardarNotaEvolucion = async (e) => {
    if (e) e.preventDefault(); 
    if (!nuevaNota.diagnostico_cie10 || !nuevaNota.tratamiento) {
      alert("Debes completar Diagnóstico y Tratamiento para guardar la evolución.");
      return;
    }

    const prescripcionesTexto = (nuevaNota.prescripciones || [])
      .filter(p => p.medicamento)
      .map(p => `${p.medicamento} — ${p.dosis || 'según indicación'}`)
      .join('\n');
      
    // CORRECCIÓN IMAGEN 2: Usamos _prescripciones para ignorar la variable extraída pero igual quitarla del objeto.
    // eslint-disable-next-line no-unused-vars
    const { prescripciones: _prescripciones, dentista_cop, ...notaLimpia } = nuevaNota;
    
    const notaParaGuardar = { 
      ...notaLimpia, 
      medicamentos: [prescripcionesTexto, nuevaNota.indicaciones].filter(Boolean).join('\n\n📋 INDICACIONES PARA CASA:\n') || nuevaNota.medicamentos,
    };

    setGuardandoNota(true);
    try {
      const fechaActual = new Date();
      const notaFinal = {
        paciente_id: pacienteIdActual,
        fecha: fechaActual.toISOString().split('T')[0], 
        hora: fechaActual.toTimeString().split(' ')[0], 
        ...notaParaGuardar
      };

      const { error } = await supabase.from('notas_evolucion').insert([notaFinal]);
      if (error) throw error;

      alert("¡Nota clínica firmada y guardada exitosamente!");
      
      setNuevaNota({
        motivo: '', examen_intraoral: '', diagnostico_cie10: '', 
        tratamiento: '', medicamentos: '', indicaciones: '', 
        prescripciones: [{ medicamento: '', dosis: '', isOtro: false }],
        dentista_nombre: 'Dra. Patricia Mora', dentista_cop: nuevaNota.dentista_cop 
      });

      const { data: notasActualizadas } = await supabase
        .from('notas_evolucion').select('*').eq('paciente_id', pacienteIdActual).order('created_at', { ascending: false });
      if (notasActualizadas) setNotasEvolucion(notasActualizadas);

    } catch (error) {
      alert("Error al guardar la nota: " + (error.message || ''));
    } finally {
      setGuardandoNota(false);
    }
  }; 

  const imprimirRecetaPDF = () => {
    const prescripcionesTexto = (nuevaNota.prescripciones || [])
      .filter(p => p.medicamento)
      .map(p => `${p.medicamento} — ${p.dosis || 'según indicación'}`)
      .join('\n');

    if (!prescripcionesTexto && !nuevaNota.indicaciones) {
      alert("No has agregado ningún medicamento ni indicación para imprimir.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(20); doc.setTextColor(0, 59, 92);
    doc.text('Sonriendo Kids', 14, 22);
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text('Odontopediatría · sonriendokids.fun', 14, 29);
    doc.setDrawColor(74, 107, 83); doc.line(14, 33, 196, 33);
    
    doc.setFontSize(14); doc.setTextColor(0);
    doc.text('RECETA E INDICACIONES PARA CASA', 14, 42);
    
    doc.setFontSize(11); doc.setTextColor(60);
    const fechaActual = new Date();
    doc.text(`Paciente: ${hc.nombres || 'Paciente'}`, 14, 52);
    doc.text(`Fecha: ${fechaActual.toLocaleDateString('es-PE')}`, 14, 59);
    doc.text(`Doctora: Dra. Patricia Mora`, 14, 66);

    let y = 78;
    doc.setFontSize(12); doc.setTextColor(0, 59, 92);
    doc.text('Prescripción:', 14, y); y += 8;
    
    doc.setFontSize(11); doc.setTextColor(40);
    if (prescripcionesTexto) {
      prescripcionesTexto.split('\n').forEach(linea => {
        const lineasCortadas = doc.splitTextToSize(`• ${linea}`, 180);
        doc.text(lineasCortadas, 18, y);
        y += 7 * lineasCortadas.length;
      });
    } else {
      doc.text('(Sin medicamentos prescritos)', 18, y); y += 7;
    }

    if (nuevaNota.indicaciones) {
      y += 6;
      doc.setFontSize(12); doc.setTextColor(0, 59, 92);
      doc.text('Indicaciones adicionales:', 14, y); y += 8;
      
      doc.setFontSize(11); doc.setTextColor(40);
      const lineasIndicaciones = doc.splitTextToSize(nuevaNota.indicaciones, 180);
      doc.text(lineasIndicaciones, 14, y);
    }

    doc.save(`Receta_${(hc.nombres || 'Paciente').replace(/\s+/g, '_')}_${fechaActual.toISOString().slice(0,10)}.pdf`);
  };

  const tabs = [    
    { id: 'filiacion', icon: 'person', label: '1. Filiación' },
    { id: 'anamnesis', icon: 'medical_information', label: '2. Anamnesis y Médicos' },
    { id: 'odontologicos', icon: 'dentistry', label: '3. Ant. Odontológicos' },
    { id: 'habitos', icon: 'child_care', label: '4. Hábitos e Higiene' },
    { id: 'examen', icon: 'stethoscope', label: '5. Examen Clínico' },
    { id: 'evolucion', icon: 'timeline', label: '6. Notas de Evolución' },
    { id: 'proximacita', icon: 'event_upcoming', label: '7. Próxima Cita' },
  ];

  const procesarFinanzasOdontograma = async (carritoRecibido, totalMonto) => {
    try {
      setHc(prev => ({ ...prev, odontograma: carritoRecibido }));
      const doc = new jsPDF();
      doc.setFontSize(20); doc.setTextColor(0, 59, 92);
      doc.text('Sonriendo Kids', 14, 22);
      doc.setFontSize(12); doc.setTextColor(100);
      doc.text('Proforma de Tratamiento Odontológico', 14, 30);
      doc.setFontSize(10); doc.setTextColor(40);
      doc.text(`Paciente: ${hc.nombres || 'Paciente'}`, 14, 45);
      doc.text(`Apoderado: ${hc.apoderado_nombre || '-'}`, 14, 52);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 59);

      const tableData = carritoRecibido.map(item => [
        item.diente || '-', item.cara ? item.cara.toUpperCase() : '-', item.procedimiento, `S/ ${item.precio}`
      ]);

      autoTable(doc, {
        startY: 68,
        head: [['Pieza', 'Cara', 'Tratamiento', 'Costo']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [0, 59, 92] },
      });

      const finalY = doc.lastAutoTable?.finalY || 68;
      doc.setFontSize(14); doc.setTextColor(0, 59, 92);
      doc.text(`Total a Pagar: S/ ${totalMonto}`, 14, finalY + 15);
      doc.save(`Proforma_${(hc.nombres || 'Paciente').replace(/\s+/g, '_')}.pdf`);

     if (!hc.telefono || hc.telefono.trim() === '') {
      alert('Odontograma y PDF guardados.\n\nNota: No se pudo abrir WhatsApp porque el paciente no tiene un número registrado.');
    } else {
      const numeroLimpio = hc.telefono.replace(/\D/g, '');
      const numeroWspp = numeroLimpio.startsWith('51') ? numeroLimpio : `51${numeroLimpio}`;
      const mensaje = `¡Hola! Soy la Dra. Patricia Mora, te escribimos de Sonriendo Kids. Hemos evaluado a ${hc.nombres} y por este medio te adjunto la proforma de su tratamiento.`;
      const wsppUrl = `https://wa.me/${numeroWspp}?text=${encodeURIComponent(mensaje)}`;
      window.open(wsppUrl, '_blank');
    }

    alert("¡Odontograma guardado y PDF generado!\n\nSe abrirá WhatsApp en una nueva pestaña.");
    
    } catch { 
      // CORRECCIÓN IMAGEN 3: Quitado el (error) porque no lo usabas
      alert("Error al procesar la información.");
    }
  };

  if (cargandoDatos) return <div className="p-6 text-center text-[#003B5C] font-bold">Cargando expediente...</div>;

  return (
    <div className="flex flex-col h-full bg-gray-50/50 p-4 md:p-6 animate-fade-in-up">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#003B5C] flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl">assignment_ind</span> Historia Clínica
          </h1>
          <p className="text-gray-500 text-sm">Gestiona el expediente completo del paciente.</p>
        </div>
        <button onClick={handleGuardar} disabled={guardando}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all"
        >
          <span className="material-symbols-outlined">{guardando ? 'hourglass_empty' : 'save'}</span>
          {guardando ? 'Guardando...' : 'Guardar Expediente'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-150">
        
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setPestañaActiva(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${
                pestañaActiva === tab.id ? 'bg-[#003B5C] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-100'
              }`}
            >
              <span className="material-symbols-outlined">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-y-auto">
          
          {pestañaActiva === 'filiacion' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003B5C]">face</span> Datos del Paciente
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input label="Nombres Completos" name="nombres" value={hc.nombres} onChange={handleChange} colSpan="md:col-span-2" />
                <Input label="Fecha de Nacimiento" type="date" name="fecha_nacimiento" value={hc.fecha_nacimiento} onChange={handleChange} />
                <Input label="Sexo" name="sexo" value={hc.sexo} onChange={handleChange} placeholder="Ej. Masculino / Femenino" />
                <Input label="Colegio / Nivel" name="colegio" value={hc.colegio} onChange={handleChange} colSpan="md:col-span-2" />
              </div>

              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-8 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003B5C]">family_restroom</span> Datos del Responsable
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input label="Nombre del Apoderado" name="apoderado_nombre" value={hc.apoderado_nombre} onChange={handleChange} colSpan="md:col-span-2" />
                <Input label="Parentesco" name="apoderado_parentesco" value={hc.apoderado_parentesco} onChange={handleChange} placeholder="Madre, Padre, etc." />
                <Input label="DNI" name="apoderado_dni" value={hc.apoderado_dni} onChange={handleChange} />
                <Input label="Ocupación" name="apoderado_ocupacion" value={hc.apoderado_ocupacion} onChange={handleChange} />
                <Input label="Estado Civil" name="estado_civil" value={hc.estado_civil} onChange={handleChange} />
              </div>

              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-8 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003B5C]">contact_phone</span> Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Teléfono / WhatsApp" name="telefono" type="tel" value={hc.telefono} onChange={handleChange} />
                <Input label="Correo Electrónico" name="email" type="email" value={hc.email} onChange={handleChange} />
                <Input label="Domicilio" name="domicilio" value={hc.domicilio} onChange={handleChange} colSpan="md:col-span-2" />
                <Input label="Contacto de Emergencia (Nombre)" name="contacto_emergencia" value={hc.contacto_emergencia} onChange={handleChange} />
                <Input label="Teléfono de Emergencia" name="telefono_emergencia" value={hc.telefono_emergencia} onChange={handleChange} />
              </div>
            </div>
          )}

          {pestañaActiva === 'anamnesis' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Motivo de Consulta</h2>
              <TextArea label="¿Por qué trae al niño hoy? (Palabras de los padres)" name="motivo_consulta" value={hc.motivo_consulta} onChange={handleChange} />
              <TextArea label="Historia de la enfermedad actual (Evolución, tipo de dolor)" name="historia_enfermedad" value={hc.historia_enfermedad} onChange={handleChange} />

              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mt-8 mb-4">Antecedentes Médicos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextArea label="Medicación actual (Medicinas y dosis)" name="medicacion_actual" value={hc.medicacion_actual} onChange={handleChange} rows={2} />
                <TextArea label="¿Es alérgico a algún medicamento? ¿Cuál?" name="alergia_medicamentos" value={hc.alergia_medicamentos || ''} onChange={handleChange} rows={2} />
                <TextArea label="Hospitalizaciones o cirugías previas" name="hospitalizaciones" value={hc.hospitalizaciones} onChange={handleChange} rows={2} />
                <div className="col-span-full">
                  <label className="block text-xs font-bold text-[#003B5C] mb-2">Esquema de Vacunación</label>
                  <select name="vacunas" value={hc.vacunas} onChange={handleChange} className="w-full md:w-1/2 px-3 py-2 rounded-lg border bg-gray-50 text-sm">
                    <option value="Completas">Completas para su edad</option>
                    <option value="Incompletas">Incompletas</option>
                    <option value="Desconocido">Desconocido</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {pestañaActiva === 'odontologicos' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <OpcionesSiNo label="¿Es su primera vez en el dentista?" name="primera_vez" value={hc.primera_vez} onChange={handleChange} />
                <div>
                  <label className="block text-xs font-bold text-[#003B5C] mb-2">Comportamiento en citas previas</label>
                  <select name="comportamiento_previo" value={hc.comportamiento_previo} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border bg-white text-sm">
                    <option value="N/A">No aplica (Primera vez)</option>
                    <option value="Positivo">Positivo (Colaborador)</option>
                    <option value="Negativo">Negativo (Llora, se niega)</option>
                    <option value="Ansioso">Ansioso / Temeroso</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <OpcionesSiNo label="¿Ha sufrido golpes en la boca, caídas o fracturas dentales?" name="traumatismos" value={hc.traumatismos} onChange={handleChange} />
                {hc.traumatismos === 'Si' && (
                  <div className="mt-4 animate-fade-in">
                    <TextArea label="Detalles del traumatismo (Fecha y tratamiento)" name="traumatismos_detalle" value={hc.traumatismos_detalle} onChange={handleChange} rows={2} />
                  </div>
                )}
              </div>
            </div>
          )}

          {pestañaActiva === 'habitos' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-600">toys</span> Hábitos Orales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Biberón / Lactancia" name="lactancia_biberon" value={hc.lactancia_biberon} onChange={handleChange} />
                  <OpcionesSiNo label="¿Succión no nutritiva? (Dedo o Chupón)" name="succion_no_nutritiva" value={hc.succion_no_nutritiva} onChange={handleChange} />
                  <div>
                    <label className="block text-xs font-bold text-[#003B5C] mb-2">Tipo de Respiración</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="respiracion" value="Nasal" checked={hc.respiracion === 'Nasal'} onChange={handleChange} className="accent-[#003B5C] w-4 h-4"/> Nasal
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="respiracion" value="Bucal" checked={hc.respiracion === 'Bucal'} onChange={handleChange} className="accent-[#003B5C] w-4 h-4"/> Bucal
                      </label>
                    </div>
                  </div>
                  <Input label="Otros hábitos (Bruxismo, Onicofagia...)" name="otros_habitos" value={hc.otros_habitos} onChange={handleChange} />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-600">dentistry</span> Higiene Oral y Dieta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Frecuencia de Cepillado (al día)" name="frecuencia_cepillado" type="number" value={hc.frecuencia_cepillado} onChange={handleChange} />
                  <OpcionesSiNo label="¿El cepillado es supervisado por un adulto?" name="supervision_cepillado" value={hc.supervision_cepillado} onChange={handleChange} />
                  <Input label="Uso de Flúor / Pasta dental" name="uso_fluor" value={hc.uso_fluor} onChange={handleChange} colSpan="md:col-span-2" />
                  <TextArea label="Dieta y consumo de azúcares" name="dieta_azucares" value={hc.dieta_azucares} onChange={handleChange} rows={2} />
                </div>
              </div>
            </div>
          )}

          {pestañaActiva === 'examen' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Evaluación de la Doctora</h2>
              <div className="grid grid-cols-1 gap-6">
                <TextArea label="Examen Extraoral (Asimetrías, ATM, ganglios)" name="examen_extraoral" value={hc.examen_extraoral} onChange={handleChange} rows={2} />
                <TextArea label="Examen Intraoral (Encías, lengua, frenillos, paladar)" name="examen_intraoral" value={hc.examen_intraoral} onChange={handleChange} rows={2} />
              </div>
              <div className="mt-8 flex justify-center">
                <button onClick={() => setModalOdontogramaAbierto(true)}
                  className="bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-[#003B5C] text-[#003B5C] px-8 py-6 rounded-2xl font-bold flex flex-col items-center gap-2 transition-colors w-full md:w-2/3"
                >
                  <span className="material-symbols-outlined text-4xl">dentistry</span> Abrir Odontograma y Cotizador
                </button>
              </div>

              <OdontogramaInteractivo isOpen={modalOdontogramaAbierto} pacienteId={pacienteIdActual}
                onClose={() => {
                  setModalOdontogramaAbierto(false);
                  if (irAEvolucionTrasConfirmar) {
                    setIrAEvolucionTrasConfirmar(false);
                    setPestañaActiva('evolucion');
                  }
                }} 
                onGuardar={procesarFinanzasOdontograma} carritoGuardado={hc.odontograma} onPresupuestoConfirmado={() => setIrAEvolucionTrasConfirmar(true)}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-[#003B5C] mb-2">Nivel de Riesgo de Caries</label>
                  <select name="riesgo_caries" value={hc.riesgo_caries} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border bg-white text-sm font-bold shadow-sm">
                    <option value="Bajo" className="text-green-600">🟢 Riesgo Bajo</option>
                    <option value="Medio" className="text-yellow-600">🟡 Riesgo Medio</option>
                    <option value="Alto" className="text-red-600">🔴 Riesgo Alto</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <TextArea label="Diagnóstico y Plan de Tratamiento (Procedimientos por cita)" name="diagnostico_plan" value={hc.diagnostico_plan} onChange={handleChange} rows={3} />
                </div>
              </div>
            </div>
          )} 

          {pestañaActiva === 'evolucion' && (
            <div className="flex flex-col xl:flex-row gap-8 animate-fade-in h-full">
              
              <div className="flex-1 border-r border-gray-100 pr-0 xl:pr-6">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003B5C]">history</span> Historial de Visitas
                </h2>
                
                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
                  {notasEvolucion.length === 0 ? (
                    <p className="text-gray-400 italic text-sm text-center py-10">No hay visitas previas registradas.</p>
                  ) : (
                    notasEvolucion.map((nota) => (
                      <div key={nota.id} className="relative pl-6 border-l-2 border-blue-200 pb-2">
                        <div className="absolute w-4 h-4 bg-[#003B5C] rounded-full -left-[9px] top-0 border-4 border-white"></div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-black text-[#003B5C]">{nota.fecha} | {nota.hora.substring(0, 5)}</span>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]">lock</span> Firmado
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 space-y-2">
                            <p><strong className="text-gray-500">Motivo:</strong> {nota.motivo}</p>
                            <p><strong className="text-gray-500">Examen:</strong> {nota.examen_intraoral}</p>
                            <p><strong className="text-gray-500">Diagnóstico CIE-10:</strong> <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-medium">{nota.diagnostico_cie10}</span></p>
                            <p><strong className="text-gray-500">Tratamiento:</strong> {nota.tratamiento}</p>
                            {nota.medicamentos && <p><strong className="text-gray-500">Receta/Indicaciones:</strong> {nota.medicamentos}</p>}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {odontogramasSesion.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-bold text-[#003B5C] mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">dentistry</span> Odontogramas guardados
                      </h3>
                      <div className="space-y-2">
                        {odontogramasSesion.map((o) => (
                          <div key={o.id} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex justify-between items-center gap-3">
                            <div className="text-sm">
                              <span className="font-bold text-[#003B5C]">{o.fecha}</span>
                              <span className="text-gray-500 ml-2">Total: S/ {o.monto_total}</span>
                            </div>
                            {o.pdf_url && (
                              <a href={o.pdf_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#003B5C] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#002a42]">Ver PDF</a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                
                {/* BLOQUE 1: EVOLUCIÓN CLÍNICA */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-bold text-[#003B5C] border-b pb-2 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">edit_note</span> Evolución Clínica Interna
                  </h2>
                  <div className="space-y-4">
                    <TextArea label="Motivo de Consulta y Evolución" name="motivo" onChange={handleNotaChange} value={nuevaNota.motivo} />
                    <TextArea label="Examen Clínico / Funciones Vitales" name="examen_intraoral" onChange={handleNotaChange} value={nuevaNota.examen_intraoral} />
                    
                    <div>
                      <label className="block text-xs font-bold text-[#003B5C] mb-1">Diagnóstico (CIE-10)</label>
                      <input 
                        list="cie10" name="diagnostico_cie10" value={nuevaNota.diagnostico_cie10} onChange={handleNotaChange} placeholder="Escribe o selecciona un código CIE-10..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#003B5C] focus:ring-1 focus:ring-[#003B5C] text-sm text-gray-700"
                      />
                      <datalist id="cie10">{codigosCIE10.map(codigo => <option key={codigo} value={codigo} />)}</datalist>
                    </div>

                    <TextArea label="Tratamiento Ejecutado Hoy" name="tratamiento" onChange={handleNotaChange} value={nuevaNota.tratamiento} />
                    
                    <button 
                      onClick={handleGuardarNotaEvolucion} disabled={guardandoNota}
                      className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined">{guardandoNota ? 'sync' : 'lock'}</span>
                      {guardandoNota ? 'Guardando...' : 'Firmar y Guardar Evolución'}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-1">Este registro se guardará de forma inalterable.</p>
                  </div>
                </div>

                {/* BLOQUE 2: RECETA E INDICACIONES */}
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 shadow-sm">
                  <h2 className="text-lg font-bold text-blue-700 border-b border-blue-200 pb-2 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">prescriptions</span> Receta para el Paciente
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-[#003B5C] mb-1">Prescripción de Medicamentos</label>
                      {nuevaNota.prescripciones?.map((p, i) => (
                        <div key={i} className="space-y-2 border-l-2 border-blue-300 pl-3">
                          <select
                            value={p.isOtro ? 'Otros' : p.medicamento}
                            onChange={(e) => {
                              const val = e.target.value;
                              const nuevas = [...(nuevaNota.prescripciones || [])];
                              nuevas[i] = { ...nuevas[i], medicamento: val === 'Otros' ? '' : val, isOtro: val === 'Otros' };
                              setNuevaNota({ ...nuevaNota, prescripciones: nuevas });
                            }}
                            className="w-full px-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:border-blue-400 font-bold"
                          >
                            <option value="">-- Seleccione medicamento --</option>
                            {MEDICAMENTOS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          
                          {p.isOtro && (
                             <input type="text" placeholder="Escriba el nombre del medicamento" value={p.medicamento}
                               onChange={(e) => {
                                 const nuevas = [...(nuevaNota.prescripciones || [])];
                                 nuevas[i].medicamento = e.target.value;
                                 setNuevaNota({ ...nuevaNota, prescripciones: nuevas });
                               }}
                               className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-blue-400"
                             />
                          )}

                          <textarea
                            placeholder="Cantidad, gramaje y horarios (Ej. Tomar 5ml cada 8 horas por 5 días...)"
                            value={p.dosis}
                            rows={3}
                            onChange={(e) => {
                              const nuevas = [...(nuevaNota.prescripciones || [])];
                              nuevas[i].dosis = e.target.value;
                              setNuevaNota({ ...nuevaNota, prescripciones: nuevas });
                            }}
                            className="w-full px-3 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-400 resize-none shadow-sm"
                          />
                          {(nuevaNota.prescripciones?.length > 1) && (
                            <div className="flex justify-end">
                              <button type="button" onClick={() => {
                                const nuevas = [...(nuevaNota.prescripciones || [])];
                                nuevas.splice(i, 1);
                                setNuevaNota({ ...nuevaNota, prescripciones: nuevas });
                              }} className="text-red-400 hover:text-red-600 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">delete</span> Quitar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setNuevaNota({ ...nuevaNota, prescripciones: [...(nuevaNota.prescripciones || []), {medicamento:'',dosis:'', isOtro: false}] })}
                        className="mt-2 flex items-center gap-1 text-sm font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-base">add_circle</span> Añadir otro medicamento
                      </button>
                    </div>

                    <TextArea label="Otras indicaciones para el hogar" name="indicaciones" onChange={handleNotaChange} value={nuevaNota.indicaciones} rows={4} placeholder="Reposo, dieta blanda, etc." />
                    
                    <button 
                      onClick={imprimirRecetaPDF} 
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <span className="material-symbols-outlined">print</span>
                      Imprimir Receta e Indicaciones
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {pestañaActiva === 'proximacita' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#003B5C] mb-4 flex items-center gap-2 border-b pb-3">
                  <span className="material-symbols-outlined">info</span> Sobre esta sección
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">Programa aquí la <strong>próxima visita</strong> del paciente. El sistema enviará recordatorios automáticos al apoderado en 3 momentos:</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3"><span className="bg-blue-100 rounded-lg p-2 material-symbols-outlined text-[#003B5C]">calendar_month</span> 1 <strong>semana</strong> antes de la cita</li>
                  <li className="flex items-center gap-3"><span className="bg-yellow-100 rounded-lg p-2 material-symbols-outlined text-amber-600">schedule</span> 1 <strong>día</strong> antes de la cita</li>
                  <li className="flex items-center gap-3"><span className="bg-green-100 rounded-lg p-2 material-symbols-outlined text-green-600">notifications_active</span> 3 <strong>horas</strong> antes de la cita</li>
                </ul>
              </div>
              <ProximaCita pacienteId={pacienteIdActual} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}