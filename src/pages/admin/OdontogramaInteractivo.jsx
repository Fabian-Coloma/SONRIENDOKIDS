import { useState, useEffect } from 'react';
import Diente from './Diente';
import { CATALOGO_PROCEDIMIENTOS } from './catalogoProcedimientos';
import { supabase } from '../../supabase';

export default function OdontogramaInteractivo({ isOpen, onClose, onGuardar, carritoGuardado = [] }) {
  const [carrito, setCarrito] = useState([]);
  const [modalProc, setModalProc] = useState({ abierto: false, diente: null, cara: null });
  const [modalConsentimiento, setModalConsentimiento] = useState(false);
  const [consentimientoSeleccionado, setConsentimientoSeleccionado] = useState('');
  const [procedimientoSeleccionado, setProcedimientoSeleccionado] = useState('');
  // Catálogo: por defecto el local; si existe la tabla 'precios' en Supabase, usa esa
  const [catalogo, setCatalogo] = useState(CATALOGO_PROCEDIMIENTOS);

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
      setTimeout(() => {
        setCarrito(carritoGuardado || []);
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Dientes deciduos (niño): 51-65 y 71-85 → solo General + Niño
  const esDienteNino = (num) => (num >= 51 && num <= 65) || (num >= 71 && num <= 85);
  const catalogoFiltrado = modalProc.diente != null && esDienteNino(modalProc.diente)
    ? catalogo.filter(p => p.categoria === 'General' || p.categoria === 'Niño')
    : catalogo.filter(p => p.categoria === 'General' || p.categoria === 'Permanente');

  const abrirModalProcedimiento = (diente, cara) => {
    setProcedimientoSeleccionado('');
    setModalProc({ abierto: true, diente, cara });
  };

  // 2. LA FUNCIÓN AGREGAR MEJORADA: Usamos 'prev' para asegurar que nunca sobreescriba lo anterior
  const agregarProcedimiento = () => {
    if (!procedimientoSeleccionado) return;
    
    const procedData = catalogo.find(p => p.nombre === procedimientoSeleccionado);
    
    setCarrito(prevCarrito => [
      ...prevCarrito, 
      {
        id: Date.now(), 
        diente: modalProc.diente, 
        cara: modalProc.cara,
        procedimiento: procedData.nombre, 
        precio: procedData.precio
      }
    ]);
    
    setModalProc({ abierto: false, diente: null, cara: null });
  };

  const eliminarProcedimiento = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const totalProforma = carrito.reduce((suma, item) => suma + item.precio, 0);
  const obtenerTratamientosDiente = (num) => carrito.filter(item => item.diente === num);

  const handleGuardarFinanzas = () => {
    onGuardar(carrito, totalProforma);
    onClose(); 
  };

  // Confirmar presupuesto: registra el pago como ingreso en finanzas_ingresos
  const confirmarPresupuesto = async () => {
    try {
      const concepto = carrito.map(c => c.procedimiento).join(' + ');
      const { error } = await supabase.from('finanzas_ingresos').insert([{
        concepto: `Presupuesto confirmado — ${concepto}`.slice(0, 200),
        monto: totalProforma,
        fecha: new Date().toISOString().slice(0, 10),
        metodo_pago: 'Efectivo',
      }]);
      if (error) throw error;
      // Además pasa el carrito al flujo normal (PDF/historial)
      onGuardar(carrito, totalProforma);
    } catch (e) {
      console.error('Error registrando ingreso:', e);
      alert('Hubo un problema registrando el ingreso, pero puedes reintentarlo.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white w-[98vw] max-w-[1500px] h-[95vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
        
        <div className="bg-[#003B5C] px-6 py-3 flex justify-between items-center shrink-0">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">dentistry</span> Odontograma Mixto y Cotización
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-400 transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row bg-gray-100 overflow-hidden">
          
          <div className="flex-1 p-2 lg:p-4 overflow-x-hidden flex justify-center items-start">
            <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col items-center w-full max-w-[900px]">
              
              <div className="flex justify-center border-b border-gray-200 pb-4 mb-4 gap-2 lg:gap-4 w-full">
                <div className="flex gap-1 md:gap-1.5">
                  {adultoSuperiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="flex gap-1 md:gap-1.5">
                  {adultoSuperiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
              </div>

              <div className="flex justify-center border-b border-dashed border-blue-200 pb-4 mb-4 gap-2 lg:gap-4 w-full px-8">
                <div className="flex gap-1 md:gap-1.5">
                  {ninoSuperiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="flex gap-1 md:gap-1.5">
                  {ninoSuperiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="superior" />)}
                </div>
              </div>

              <div className="flex justify-center border-b border-gray-200 pb-4 mb-4 gap-2 lg:gap-4 w-full px-8">
                <div className="flex gap-1 md:gap-1.5">
                  {ninoInferiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="flex gap-1 md:gap-1.5">
                  {ninoInferiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
              </div>

              <div className="flex justify-center gap-2 lg:gap-4 w-full">
                <div className="flex gap-1 md:gap-1.5">
                  {adultoInferiorDerecho.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
                <div className="border-l-2 border-gray-300"></div>
                <div className="flex gap-1 md:gap-1.5">
                  {adultoInferiorIzquierdo.map(num => <Diente key={num} numero={num} tratamientos={obtenerTratamientosDiente(num)} onClickCara={abrirModalProcedimiento} posicion="inferior" />)}
                </div>
              </div>

            </div>
          </div>

          <div className="w-full lg:w-[380px] bg-white border-l border-gray-200 p-6 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10 shrink-0">
            <h3 className="text-lg font-black text-[#003B5C] mb-4 border-b pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">receipt_long</span> Procedimientos
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-2">
              {carrito.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-70">
                  <span className="material-symbols-outlined text-4xl mb-2">info</span>
                  <p className="text-sm italic">Sin piezas seleccionadas.</p>
                </div>
              ) : (
                carrito.map(item => (
                  <div key={item.id} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex justify-between items-center hover:border-blue-300">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.procedimiento}</p>
                      <p className="text-xs text-gray-500 font-medium">Pieza {item.diente} • Cara <span className="capitalize">{item.cara}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#003B5C]">S/ {item.precio}</span>
                      <button onClick={() => eliminarProcedimiento(item.id)} className="text-red-400 hover:text-red-600 p-1">
                        <span className="material-symbols-outlined block text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 shrink-0 space-y-3">
              <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center border border-blue-100">
                <span className="text-gray-700 font-bold text-sm">Total a Pagar:</span>
                <span className="text-2xl font-black text-[#003B5C]">S/ {totalProforma}</span>
              </div>

              <button onClick={handleGuardarFinanzas} disabled={carrito.length === 0} className="w-full py-3 rounded-xl text-white bg-green-600 hover:bg-green-700 font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                <span className="material-symbols-outlined">save</span> Guardar y Enviar PDF
              </button>

              <button onClick={() => { setConsentimientoSeleccionado(''); setModalConsentimiento(true); }}
                disabled={carrito.length === 0}
                className="w-full py-3 rounded-xl text-white bg-[#f4a261] hover:bg-[#e76f51] font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                <span className="material-symbols-outlined">verified</span> Confirmar Presupuesto
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {/* Modal de consentimientos — aparece al confirmar presupuesto */}
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
              <a
                href={(() => {
                  const c = [
                    { id: 'pulpar', archivo: '/consentimientos/CONSENTIMIENTO TTO PULPAR.docx' },
                    { id: 'curaciones', archivo: '/consentimientos/CONSENTIMIENTO CURACIONES.docx' },
                    { id: 'exodoncias', archivo: '/consentimientos/CONSENTIMIENTO EXODONCIAS.docx' },
                    { id: 'ortodoncia', archivo: '/consentimientos/Ortodoncia.pdf' },
                  ].find(c => c.id === consentimientoSeleccionado);
                  return c ? c.archivo : undefined;
                })()}
                download
                onClick={(e) => { if (!consentimientoSeleccionado) e.preventDefault(); }}
                className={`flex-1 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-1 ${
                  consentimientoSeleccionado ? 'bg-[#003B5C] hover:bg-[#002a42]' : 'bg-gray-300 pointer-events-none'}`}>
                <span className="material-symbols-outlined text-base">download</span> Imprimir
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}