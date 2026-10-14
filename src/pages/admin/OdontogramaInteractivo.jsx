import { useState, useEffect } from 'react';
import Diente from './Diente';
import { CATALOGO_PROCEDIMIENTOS } from './catalogoProcedimientos';
import { supabase } from '../../supabase';

// --- IMPORTACIONES PARA EL DRAG & DROP ---
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- COMPONENTE INDIVIDUAL ARRASTRABLE DEL CARRITO ---
function SortableCartItem({ item, eliminarProcedimiento }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex justify-between items-center hover:border-blue-300 mb-2 relative bg-white z-10">
      <div className="flex items-center gap-3">
        {/* Botón de arrastre */}
        <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-[#003B5C] flex items-center">
          <span className="material-symbols-outlined">drag_indicator</span>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">{item.procedimiento}</p>
          <p className="text-xs text-gray-500 font-medium">
            {item.diente ? `Pieza ${item.diente} • Cara ` : 'Procedimiento General '}
            {item.cara && <span className="capitalize">{item.cara}</span>}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-black text-[#003B5C]">S/ {item.precio}</span>
        <button onClick={() => eliminarProcedimiento(item.id)} className="text-red-400 hover:text-red-600 p-1">
          <span className="material-symbols-outlined block text-sm">delete</span>
        </button>
      </div>
    </div>
  );
}

export default function OdontogramaInteractivo({ isOpen, onClose, onGuardar, carritoGuardado = [], onPresupuestoConfirmado, pacienteId }) {
  const [carrito, setCarrito] = useState([]);
  const [descuento, setDescuento] = useState(0); // NUEVO: Estado para el descuento

  const [modalProc, setModalProc] = useState({ abierto: false, diente: null, cara: null });
  const [modalOtros, setModalOtros] = useState(false); // NUEVO: Modal para "Otros"
  const [modalDescuento, setModalDescuento] = useState(false); // NUEVO: Modal para "Descuento"
  const [otroProc, setOtroProc] = useState({ nombre: '', precio: '' }); // NUEVO: Datos de "Otros"

  const [modalConsentimiento, setModalConsentimiento] = useState(false);
  const [consentimientoSeleccionado, setConsentimientoSeleccionado] = useState('');
  const [procedimientoSeleccionado, setProcedimientoSeleccionado] = useState('');
  const [catalogo, setCatalogo] = useState(CATALOGO_PROCEDIMIENTOS);

  // Sensores para el Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('precios').select('*').order('id');
        if (data && data.length > 0) setCatalogo(data);
      } catch { /* tabla aún no creada → usa catálogo local */ }
    })();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setCarrito(carritoGuardado || []), 0);
    }
  }, [isOpen]);

  const adultoSuperiorDerecho = [18, 17, 16, 15, 14, 13, 12, 11];
  const adultoSuperiorIzquierdo = [21, 22, 23, 24, 25, 26, 27, 28];
  const adultoInferiorDerecho = [48, 47, 46, 45, 44, 43, 42, 41];
  const adultoInferiorIzquierdo = [31, 32, 33, 34, 35, 36, 37, 38];
  const ninoSuperiorDerecho = [55, 54, 53, 52, 51];
  const ninoSuperiorIzquierdo = [61, 62, 63, 64, 65];
  const ninoInferiorDerecho = [85, 84, 83, 82, 81];
  const ninoInferiorIzquierdo = [71, 72, 73, 74, 75];

  if (!isOpen) return null;

  const esDienteNino = (num) => (num >= 51 && num <= 65) || (num >= 71 && num <= 85);
  const catalogoFiltrado = modalProc.diente != null && esDienteNino(modalProc.diente)
    ? catalogo.filter(p => p.categoria === 'General' || p.categoria === 'Niño')
    : catalogo.filter(p => p.categoria === 'General' || p.categoria === 'Permanente');

  const abrirModalProcedimiento = (diente, cara) => {
    setProcedimientoSeleccionado('');
    setModalProc({ abierto: true, diente, cara });
  };

  // PUNTO 2: Agregar y agrupar automáticamente
  const agregarProcedimiento = () => {
    if (!procedimientoSeleccionado) return;
    const procedData = catalogo.find(p => p.nombre === procedimientoSeleccionado);
    
    setCarrito(prevCarrito => {
      const nuevoCarrito = [...prevCarrito, {
        id: Date.now().toString(), // dnd-kit requiere IDs como string preferiblemente
        diente: modalProc.diente, 
        cara: modalProc.cara,
        procedimiento: procedData.nombre, 
        precio: Number(procedData.precio)
      }];
      // Agrupación automática por nombre de procedimiento
      return nuevoCarrito.sort((a, b) => a.procedimiento.localeCompare(b.procedimiento));
    });
    setModalProc({ abierto: false, diente: null, cara: null });
  };

  // PUNTO 3: Agregar tratamiento "Otro"
  const agregarOtroProcedimiento = () => {
    if (!otroProc.nombre || !otroProc.precio) return;
    setCarrito(prev => {
      const nuevo = [...prev, {
        id: Date.now().toString(),
        diente: null,
        cara: null,
        procedimiento: otroProc.nombre,
        precio: Number(otroProc.precio)
      }];
      return nuevo.sort((a, b) => a.procedimiento.localeCompare(b.procedimiento));
    });
    setModalOtros(false);
    setOtroProc({ nombre: '', precio: '' });
  };

  const eliminarProcedimiento = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  // PUNTO 2: Manejar el evento de soltar al arrastrar
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCarrito((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // PUNTO 3: Cálculos de totales con descuento
  const subtotal = carrito.reduce((suma, item) => suma + item.precio, 0);
  const totalProforma = Math.max(0, subtotal - descuento);
  const obtenerTratamientosDiente = (num) => carrito.filter(item => item.diente === num);

  const handleGuardarFinanzas = () => {
    onGuardar(carrito, totalProforma);
    onClose(); 
  };

  const confirmarPresupuesto = async () => {
    try {
      const concepto = carrito.map(c => c.procedimiento).join(' + ');
      const montoNum = Number(totalProforma) || 0;
      const { error } = await supabase.from('finanzas_ingresos').insert([{
        paciente_id: pacienteId || null,
        concepto: `Presupuesto confirmado — ${concepto}`.slice(0, 200),
        monto: montoNum,
        fecha: new Date().toISOString().slice(0, 10),
        metodo_pago: 'Efectivo',
      }]);
      if (error) throw error;
      alert(`✅ Ingreso registrado en Finanzas por S/ ${montoNum.toFixed(2)}`);
      window.dispatchEvent(new Event('finanzas-actualizar'));
      setConsentimientoSeleccionado('');
      setModalConsentimiento(true);
    } catch (e) {
      console.error('Error registrando ingreso:', e);
      alert('Hubo un problema registrando el ingreso, pero puedes reintentarlo.');
    }
  };

  const imprimirConsentimiento = async () => {
    if (!consentimientoSeleccionado) return;
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(20); doc.setTextColor(0, 59, 92);
    doc.text('Sonriendo Kids', 14, 22);
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text('Odontopediatría · sonriendokids.fun', 14, 29);
    doc.setDrawColor(74, 107, 83); doc.line(14, 33, 196, 33);
    doc.setFontSize(14); doc.setTextColor(0);
    doc.text('ODONTOGRAMA Y PRESUPUESTO', 14, 42);
    doc.setFontSize(11); doc.setTextColor(60);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, 14, 52);
    let y = 64;
    doc.setFontSize(12); doc.setTextColor(0, 59, 92);
    doc.text('Tratamientos:', 14, y); y += 8;
    doc.setFontSize(11); doc.setTextColor(40);
    carrito.forEach(item => {
      const detallePieza = item.diente ? `Pieza ${item.diente} (${item.cara}) - ` : '';
      doc.text(`${detallePieza}${item.procedimiento}: S/ ${item.precio}`, 18, y);
      y += 7;
    });
    y += 4;
    
    if (descuento > 0) {
      doc.setTextColor(220, 38, 38); // Rojo para descuento
      doc.text(`Descuento: - S/ ${descuento}`, 14, y);
      y += 8;
    }

    doc.setFontSize(14); doc.setTextColor(0, 59, 92);
    doc.text(`TOTAL A PAGAR: S/ ${totalProforma}`, 14, y);

    const pdfBlob = doc.output('blob');
    const fileName = `odontograma_${Date.now()}.pdf`;
  const { data: up } = await supabase.storage.from('odontogramas').upload(`sesiones/${fileName}`, pdfBlob, { contentType: 'application/pdf', upsert: true }).catch(() => ({ data: null }));
    
    if (up) {
      // Declaramos la variable directamente aquí adentro usando const
      const pdfUrl = supabase.storage.from('odontogramas').getPublicUrl(`sesiones/${fileName}`).data.publicUrl;
      
      await supabase.from('odontogramas_sesion').insert([{
        paciente_id: pacienteId,
        fecha: new Date().toISOString().slice(0, 10),
        monto_total: totalProforma,
        detalle: carrito,
        pdf_url: pdfUrl
      }]).catch(() => {});
    }
    if (onPresupuestoConfirmado) onPresupuestoConfirmado();
    setModalConsentimiento(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 p-2 sm:p-4 animate-fade-in backdrop-blur-sm overflow-y-auto h-screen flex items-center justify-center">
      <div className="bg-white w-[98vw] max-w-[1500px] max-h-[95vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
        
        <div className="bg-[#003B5C] px-6 py-3 flex justify-between items-center shrink-0">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">dentistry</span> Odontograma Mixto y Cotización
          </h2>
          <button
            onClick={() => {
              if (carrito.length > 0 && !window.confirm('¿Cerrar el odontograma sin guardar ni confirmar el presupuesto?')) return;
              onClose();
            }}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-xl leading-none">close</span> Cerrar
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row bg-gray-100 overflow-hidden">
          
          <div className="flex-1 p-2 lg:p-4 overflow-x-auto scrollbar-hide lg:overflow-hidden flex justify-center items-start min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col items-center w-full max-w-[900px]">
              
              <div className="flex justify-center items-center border-b border-gray-200 pb-4 mb-4 gap-2 lg:gap-4 w-full">
                <div className="flex-1 flex justify-end gap-1 md:gap-1.5 min-w-0">
                  {adultoSuperiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
                <div className="border-l-2 border-gray-300 h-10 self-center"></div>
                <div className="flex-1 flex justify-start gap-1 md:gap-1.5 min-w-0">
                  {adultoSuperiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
              </div>

              <div className="flex justify-center items-center border-b border-dashed border-blue-200 pb-4 mb-4 gap-2 lg:gap-4 w-full px-4 lg:px-8">
                <div className="flex-1 flex justify-end gap-1 md:gap-1.5 min-w-0">
                  {ninoSuperiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
                <div className="border-l-2 border-gray-300 h-10 self-center"></div>
                <div className="flex-1 flex justify-start gap-1 md:gap-1.5 min-w-0">
                  {ninoSuperiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
              </div>

              <div className="flex justify-center items-center border-b border-gray-200 pb-4 mb-4 gap-2 lg:gap-4 w-full px-4 lg:px-8">
                <div className="flex-1 flex justify-end gap-1 md:gap-1.5 min-w-0">
                  {ninoInferiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
                <div className="border-l-2 border-gray-300 h-10 self-center"></div>
                <div className="flex-1 flex justify-start gap-1 md:gap-1.5 min-w-0">
                  {ninoInferiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
              </div>

              <div className="flex justify-center items-center gap-2 lg:gap-4 w-full px-4 lg:px-8">
                <div className="flex-1 flex justify-end gap-1 md:gap-1.5 min-w-0">
                  {adultoInferiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
                <div className="border-l-2 border-gray-300 h-10 self-center"></div>
                <div className="flex-1 flex justify-start gap-1 md:gap-1.5 min-w-0">
                  {adultoInferiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
              </div>

            </div>
          </div>

          <div className="w-full lg:w-[400px] bg-white border-l border-gray-200 p-4 lg:p-6 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10 shrink-0">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
               <h3 className="text-lg font-black text-[#003B5C] flex items-center gap-2">
                 <span className="material-symbols-outlined">receipt_long</span> Procedimientos
               </h3>
               {/* BOTÓN OTROS */}
               <button onClick={() => setModalOtros(true)} className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md hover:bg-blue-200 flex items-center gap-1">
                 <span className="material-symbols-outlined text-[14px]">add</span> Otros
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 mb-4">
              {carrito.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-70">
                  <span className="material-symbols-outlined text-4xl mb-2">info</span>
                  <p className="text-sm italic">Sin piezas seleccionadas.</p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={carrito.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    {carrito.map(item => (
                      <SortableCartItem key={item.id} item={item} eliminarProcedimiento={eliminarProcedimiento} />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 shrink-0 space-y-3">
              
              <div className="flex justify-between items-center text-gray-500 px-2">
                <span className="text-sm font-bold">Subtotal:</span>
                <span className="font-bold">S/ {subtotal}</span>
              </div>

              {/* BOTÓN DESCUENTO */}
              <div className="flex justify-between items-center px-2">
                <button onClick={() => setModalDescuento(true)} className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">sell</span> Agregar Descuento
                </button>
                <span className="font-bold text-red-500">- S/ {descuento}</span>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center border border-blue-100">
                <span className="text-gray-700 font-bold text-sm">Total a Pagar:</span>
                <span className="text-2xl font-black text-[#003B5C]">S/ {totalProforma}</span>
              </div>

              <button onClick={handleGuardarFinanzas} disabled={carrito.length === 0} className="w-full py-3 rounded-xl text-white bg-green-600 hover:bg-green-700 font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                <span className="material-symbols-outlined">save</span> Guardar y Enviar PDF
              </button>

              <button onClick={confirmarPresupuesto}
                disabled={carrito.length === 0}
                className="w-full py-3 rounded-xl text-white bg-[#f4a261] hover:bg-[#e76f51] font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                <span className="material-symbols-outlined">verified</span> Confirmar Presupuesto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODALES DE INTERACCIÓN */}

      {/* Modal Procedimiento del Diente */}
      {modalProc.abierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[350px] shadow-2xl scale-105">
            <h3 className="text-lg font-black text-[#003B5C] mb-2">Nuevo Tratamiento</h3>
            <div className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg text-sm mb-4 inline-block font-medium">
              Pieza <strong>{modalProc.diente}</strong> • <strong className="capitalize">{modalProc.cara}</strong>
            </div>
            
            <select 
              value={procedimientoSeleccionado} onChange={(e) => setProcedimientoSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl mb-6 outline-none focus:border-[#003B5C] bg-gray-50 text-sm"
            >
              <option value="">-- Elija una opción --</option>
              {['General', 'Niño', 'Permanente']
                .filter(cat => catalogoFiltrado.some(p => p.categoria === cat))
                .map(cat => (
                <optgroup key={cat} label={`── ${cat} ──`}>
                  {catalogoFiltrado.filter(p => p.categoria === cat).map(p => (
                    <option key={p.id} value={p.nombre}>{p.nombre} — S/ {p.precio}</option>
                  ))}
                </optgroup>
              ))}
            </select>

            <div className="flex gap-2">
              <button onClick={() => setModalProc({ abierto: false })} className="flex-1 py-2 rounded-xl text-gray-600 bg-gray-100 font-bold hover:bg-gray-200 text-sm">Cancelar</button>
              <button onClick={agregarProcedimiento} disabled={!procedimientoSeleccionado} className="flex-1 py-2 rounded-xl text-white bg-[#003B5C] font-bold disabled:opacity-50 text-sm">Agregar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL OTROS PROCEDIMIENTOS */}
      {modalOtros && (
         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] backdrop-blur-sm">
         <div className="bg-white rounded-2xl p-6 w-[350px] shadow-2xl scale-105">
           <h3 className="text-lg font-black text-[#003B5C] mb-4">Agregar Otro Procedimiento</h3>
           <label className="block text-xs font-bold text-gray-500 mb-1">Nombre del tratamiento</label>
           <input type="text" value={otroProc.nombre} onChange={e => setOtroProc({...otroProc, nombre: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-xl mb-4 outline-none focus:border-[#003B5C]" placeholder="Ej. Retiro de Brackets" />
           <label className="block text-xs font-bold text-gray-500 mb-1">Precio (S/)</label>
           <input type="number" value={otroProc.precio} onChange={e => setOtroProc({...otroProc, precio: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-xl mb-6 outline-none focus:border-[#003B5C]" placeholder="Ej. 100" />
           <div className="flex gap-2">
             <button onClick={() => setModalOtros(false)} className="flex-1 py-2 rounded-xl text-gray-600 bg-gray-100 font-bold hover:bg-gray-200 text-sm">Cancelar</button>
             <button onClick={agregarOtroProcedimiento} disabled={!otroProc.nombre || !otroProc.precio} className="flex-1 py-2 rounded-xl text-white bg-[#003B5C] font-bold disabled:opacity-50 text-sm">Agregar</button>
           </div>
         </div>
       </div>
      )}

      {/* MODAL DESCUENTO */}
      {modalDescuento && (
         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] backdrop-blur-sm">
         <div className="bg-white rounded-2xl p-6 w-[350px] shadow-2xl scale-105">
           <h3 className="text-lg font-black text-red-500 mb-4">Aplicar Descuento</h3>
           <p className="text-sm text-gray-500 mb-4">Ingresa el monto a descontar del presupuesto actual.</p>
           <input type="number" value={descuento} onChange={e => setDescuento(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-xl mb-6 outline-none focus:border-red-500 text-lg font-bold" placeholder="S/ 0" autoFocus />
           <div className="flex gap-2">
             <button onClick={() => setDescuento(0)} className="flex-1 py-2 rounded-xl text-gray-600 bg-gray-100 font-bold hover:bg-gray-200 text-sm">Quitar</button>
             <button onClick={() => setModalDescuento(false)} className="flex-1 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600 font-bold text-sm">Aplicar</button>
           </div>
         </div>
       </div>
      )}

      {/* Modal de consentimientos */}
      {modalConsentimiento && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-[420px] shadow-2xl">
            <h3 className="text-lg font-black text-[#003B5C] mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined">history_edu</span> Consentimientos Informados
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Presupuesto confirmado por <strong>S/ {totalProforma}</strong> ✅ Se registró en Finanzas.
              Ahora descarga el consentimiento según el tratamiento realizado:
            </p>

            <div className="space-y-2 mb-5">
              {[
                { id: 'pulpar', nombre: 'Tratamiento Pulpar (Endodoncia)', archivo: '/consentimientos/CONSENTIMIENTO TTO PULPAR.docx', emoji: '🦷' },
                { id: 'curaciones', nombre: 'Curaciones / Obturaciones', archivo: '/consentimientos/CONSENTIMIENTO CURACIONES.docx', emoji: '✨' },
                { id: 'exodoncias', nombre: 'Exodoncias / Cirugía Oral', archivo: '/consentimientos/CONSENTIMIENTO EXODONCIAS.docx', emoji: '🔧' },
                { id: 'ortodoncia', nombre: 'Ortodoncia', archivo: '/consentimientos/Ortodoncia.pdf', emoji: '📏' },
              ].map(c => (
                <label key={c.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    consentimientoSeleccionado === c.id
                      ? 'border-[#003B5C] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="consentimiento" value={c.id}
                    checked={consentimientoSeleccionado === c.id}
                    onChange={() => setConsentimientoSeleccionado(c.id)}
                    className="accent-[#003B5C] w-4 h-4" />
                  <span className="text-xl">{c.emoji}</span>
                  <span className="text-sm font-bold text-gray-700">{c.nombre}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setModalConsentimiento(false)}
                className="flex-1 py-2.5 rounded-xl text-gray-600 bg-gray-100 font-bold hover:bg-gray-200 text-sm">
                Cerrar
              </button>
              <button
                onClick={() => {
                  if (!consentimientoSeleccionado) return;
                  const c = [
                    { id: 'pulpar', archivo: '/consentimientos/CONSENTIMIENTO TTO PULPAR.docx' },
                    { id: 'curaciones', archivo: '/consentimientos/CONSENTIMIENTO CURACIONES.docx' },
                    { id: 'exodoncias', archivo: '/consentimientos/CONSENTIMIENTO EXODONCIAS.docx' },
                    { id: 'ortodoncia', archivo: '/consentimientos/Ortodoncia.pdf' },
                  ].find(x => x.id === consentimientoSeleccionado);
                  if (c) window.open(c.archivo, '_blank');
                  imprimirConsentimiento();
                }}
                className={`flex-1 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-1 ${
                  consentimientoSeleccionado ? 'bg-[#003B5C] hover:bg-[#002a42]' : 'bg-gray-300 pointer-events-none'}`}>
                <span className="material-symbols-outlined text-base">download</span> Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}