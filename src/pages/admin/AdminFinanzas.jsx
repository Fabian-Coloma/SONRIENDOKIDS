import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../supabase';

const AdminFinanzas = () => {
  const [pasoActivo, setPasoActivo] = useState(1);
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [cargandoEliminar, setCargandoEliminar] = useState(false);
  const [infoAbierto, setInfoAbierto] = useState(null); // id del ingreso cuyos datos se despliegan

  const [nuevoIngreso, setNuevoIngreso] = useState({ paciente_id: '', monto: '', metodo_pago: 'Yape', concepto: '' });
  const [nuevoEgreso, setNuevoEgreso] = useState({ concepto: '', categoria: 'Costo Operativo Fijo', monto: '' });

  // Mapa id -> paciente para mostrar el nombre sin depender de JOIN (que falla si pacientes tiene RLS)
  const pacienteMap = useMemo(() => {
    const m = {};
    pacientes.forEach(p => { m[p.id] = p; });
    return m;
  }, [pacientes]);

  const cargarDatosFinancieros = useCallback(async () => {
    setCargando(true);
    try {
      const { data: dataIngresos } = await supabase.from('finanzas_ingresos').select('*').order('fecha', { ascending: false });
      if (dataIngresos) setIngresos(dataIngresos);

      const { data: dataEgresos } = await supabase.from('finanzas_egresos').select('*').order('fecha', { ascending: false });
      if (dataEgresos) setEgresos(dataEgresos);

      const { data: dataPacientes } = await supabase.from('pacientes').select('id, nombre_nino, nombre_apoderado, whatsapp, fecha_nacimiento, edad');
      if (dataPacientes) setPacientes(dataPacientes);
    } catch (err) {
      console.error('Error al cargar datos financieros:', err);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatosFinancieros();
  }, [cargarDatosFinancieros]);

  // Tiempo real: actualiza la lista apenas se inserta un ingreso/egreso en cualquier parte de la app
  useEffect(() => {
    const ch = supabase
      .channel('finanzas-cambios')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'finanzas_ingresos' }, () => cargarDatosFinancieros())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'finanzas_egresos' }, () => cargarDatosFinancieros())
      .subscribe();

    const onActualizar = () => cargarDatosFinancieros();
    window.addEventListener('finanzas-actualizar', onActualizar);

    return () => {
      supabase.removeChannel(ch);
      window.removeEventListener('finanzas-actualizar', onActualizar);
    };
  }, [cargarDatosFinancieros]);

  const handleGuardarIngreso = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const { error } = await supabase.from('finanzas_ingresos').insert([nuevoIngreso]);
      if (error) throw error;
      alert("Pago registrado exitosamente");
      setNuevoIngreso({ paciente_id: '', monto: '', metodo_pago: 'Yape', concepto: '' });
      await cargarDatosFinancieros();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el cobro");
    } finally {
      setCargando(false);
    }
  };

  const handleGuardarEgreso = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const { error } = await supabase.from('finanzas_egresos').insert([nuevoEgreso]);
      if (error) throw error;
      alert("Gasto registrado exitosamente");
      setNuevoEgreso({ concepto: '', categoria: 'Costo Operativo Fijo', monto: '' });
      await cargarDatosFinancieros();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el gasto");
    } finally {
      setCargando(false);
    }
  };

  // === ELIMINAR INGRESOS Y EGRESOS ===
  const handleEliminarIngreso = async (id) => {
    if (!confirm("¿Eliminar este ingreso?\n\nEl total se actualizará automáticamente.")) return;
    setCargandoEliminar(true);
    try {
      const { error } = await supabase.from('finanzas_ingresos').delete().eq('id', id);
      if (error) throw error;
      await cargarDatosFinancieros(); // Recarga para que los totales se actualicen
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el ingreso.");
    } finally {
      setCargandoEliminar(false);
    }
  };

  const handleEliminarEgreso = async (id) => {
    if (!confirm("¿Eliminar este gasto?\n\nEl total se actualizará automáticamente.")) return;
    setCargandoEliminar(true);
    try {
      const { error } = await supabase.from('finanzas_egresos').delete().eq('id', id);
      if (error) throw error;
      await cargarDatosFinancieros(); // Recarga para que los totales se actualicen
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el gasto.");
    } finally {
      setCargandoEliminar(false);
    }
  };

  const totalIngresos = ingresos.reduce((acc, curr) => acc + (parseFloat(curr.monto) || 0), 0);
  const totalEgresos = egresos.reduce((acc, curr) => acc + (parseFloat(curr.monto) || 0), 0);
  const saldoNeto = totalIngresos - totalEgresos;

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* === TARJETAS DE TOTALES (se actualizan solas cuando borras) === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Ingresos</p>
          <p className="text-3xl font-bold text-green-600">S/ {totalIngresos.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Gastos</p>
          <p className="text-3xl font-bold text-red-500">S/ {totalEgresos.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Caja Neta Actual</p>
          <p className="text-3xl font-bold text-[#003B5C]">S/ {saldoNeto.toFixed(2)}</p>
        </div>
      </div>

      {/* === BOTONES DE PASO === */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
        <button onClick={() => setPasoActivo(1)} className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${pasoActivo === 1 ? 'bg-[#003B5C] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
          Cierre de Caja y Movimientos
        </button>
        <button onClick={() => setPasoActivo(2)} className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${pasoActivo === 2 ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
          + Registrar Ingreso (Cobro)
        </button>
        <button onClick={() => setPasoActivo(3)} className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${pasoActivo === 3 ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
          - Registrar Egreso (Gasto)
        </button>
      </div>

      {/* === PASO 1: VER MOVIMIENTOS === */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {pasoActivo === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* INGRESOS */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h3 className="text-lg font-bold text-gray-800">Últimos Ingresos</h3>
                <button onClick={() => cargarDatosFinancieros()} className="text-xs font-bold text-[#003B5C] border border-[#003B5C]/30 px-3 py-1 rounded-lg hover:bg-[#003B5C] hover:text-white transition-colors">
                  ↻ Actualizar
                </button>
              </div>
              {cargando ? (
                <div className="text-gray-500 text-center py-8">Cargando...</div>
              ) : ingresos.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay ingresos registrados.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {ingresos.map(item => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-xl border relative group">
                      {/* Botón eliminar (X) */}
                      <button
                        onClick={() => handleEliminarIngreso(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        title="Eliminar ingreso"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>

                      <div className="flex justify-between items-center gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 text-sm truncate">{pacienteMap[item.paciente_id]?.nombre_nino || 'Paciente sin asignar'}</p>
                          <p className="text-xs text-gray-500 truncate">{item.concepto} • {item.metodo_pago}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-green-600">+S/ {item.monto}</span>
                          <button
                            onClick={() => setInfoAbierto(infoAbierto === item.id ? null : item.id)}
                            className="text-xs font-bold text-[#003B5C] bg-white border border-[#003B5C]/30 px-2 py-1 rounded-lg hover:bg-[#003B5C] hover:text-white transition-colors"
                          >
                            {infoAbierto === item.id ? 'Ocultar' : 'más información'}
                          </button>
                        </div>
                      </div>

                      {infoAbierto === item.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200 text-sm space-y-1 bg-white rounded-lg p-3">
                          <p className="text-gray-700"><span className="font-bold text-gray-400">Paciente:</span> {pacienteMap[item.paciente_id]?.nombre_nino || 'Paciente sin asignar'}</p>
                          {pacienteMap[item.paciente_id]?.edad != null && <p className="text-gray-700"><span className="font-bold text-gray-400">Edad:</span> {pacienteMap[item.paciente_id].edad} años</p>}
                          {pacienteMap[item.paciente_id]?.fecha_nacimiento && <p className="text-gray-700"><span className="font-bold text-gray-400">Nacimiento:</span> {pacienteMap[item.paciente_id].fecha_nacimiento}</p>}
                          {pacienteMap[item.paciente_id]?.nombre_apoderado && <p className="text-gray-700"><span className="font-bold text-gray-400">Apoderado:</span> {pacienteMap[item.paciente_id].nombre_apoderado}</p>}
                          {pacienteMap[item.paciente_id]?.whatsapp && <p className="text-gray-700"><span className="font-bold text-gray-400">Teléfono:</span> {pacienteMap[item.paciente_id].whatsapp}</p>}
                          {pacienteMap[item.paciente_id]?.correo && <p className="text-gray-700"><span className="font-bold text-gray-400">Correo:</span> {pacienteMap[item.paciente_id].correo}</p>}
                          <p className="text-gray-700"><span className="font-bold text-gray-400">Fecha del pago:</span> {new Date(item.fecha).toLocaleDateString('es-PE')}</p>
                          <p className="text-gray-700"><span className="font-bold text-gray-400">Monto:</span> <span className="font-bold text-green-600">S/ {item.monto}</span> ({item.metodo_pago})</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EGRESOS */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Últimos Gastos</h3>
              {cargando ? (
                <div className="text-gray-500 text-center py-8">Cargando...</div>
              ) : egresos.length === 0 ? (
                <p className="text-gray-500 text-sm">No hay gastos registrados.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {egresos.map(item => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-xl border relative group">
                      {/* Botón eliminar (X) */}
                      <button
                        onClick={() => handleEliminarEgreso(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        title="Eliminar gasto"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>

                      <div className="flex justify-between items-center gap-2">
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{item.concepto}</p>
                          <p className="text-xs text-gray-500">{item.categoria}</p>
                        </div>
                        <span className="font-bold text-red-500">-S/ {item.monto}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PASO 2: REGISTRAR INGRESO */}
        {pasoActivo === 2 && (
          <form onSubmit={handleGuardarIngreso} className="max-w-xl space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Registrar Pago de Paciente</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Paciente</label>
              <select required value={nuevoIngreso.paciente_id} onChange={(e) => setNuevoIngreso({...nuevoIngreso, paciente_id: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border bg-white">
                <option value="">Seleccione un paciente...</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre_nino}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Monto (S/)</label>
                <input type="number" step="0.01" required value={nuevoIngreso.monto} onChange={(e) => setNuevoIngreso({...nuevoIngreso, monto: e.target.value})} placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl border"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Método de Pago</label>
                <select value={nuevoIngreso.metodo_pago} onChange={(e) => setNuevoIngreso({...nuevoIngreso, metodo_pago: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border bg-white">
                  <option value="Yape">Yape</option>
                  <option value="Plin">Plin</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta (POS)</option>
                  <option value="Transferencia BCP">Transferencia BCP</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Concepto del Pago</label>
              <input type="text" required value={nuevoIngreso.concepto} onChange={(e) => setNuevoIngreso({...nuevoIngreso, concepto: e.target.value})} placeholder="Ej. Adelanto de Ortodoncia / Curación" className="w-full px-4 py-2.5 rounded-xl border"/>
            </div>
            <button type="submit" disabled={cargando} className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 disabled:opacity-50">
              {cargando ? 'Registrando...' : 'Registrar Ingreso'}
            </button>
          </form>
        )}

        {/* PASO 3: REGISTRAR EGRESO */}
        {pasoActivo === 3 && (
          <form onSubmit={handleGuardarEgreso} className="max-w-xl space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Registrar Gasto del Consultorio</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Concepto del Gasto</label>
              <input type="text" required value={nuevoEgreso.concepto} onChange={(e) => setNuevoEgreso({...nuevoEgreso, concepto: e.target.value})} placeholder="Ej. Compra de resinas / Pago de luz" className="w-full px-4 py-2.5 rounded-xl border"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
                <select value={nuevoEgreso.categoria} onChange={(e) => setNuevoEgreso({...nuevoEgreso, categoria: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border bg-white">
                  <option value="Costo Operativo Fijo">Fijo (Alquiler, Servicios, Sueldos)</option>
                  <option value="Costo Variable (Materiales)">Variable (Materiales, Insumos)</option>
                  <option value="Pago a Laboratorio">Pago a Laboratorio Dental</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Monto (S/)</label>
                <input type="number" step="0.01" required value={nuevoEgreso.monto} onChange={(e) => setNuevoEgreso({...nuevoEgreso, monto: e.target.value})} placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl border"/>
              </div>
            </div>
            <button type="submit" disabled={cargando} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold shadow-md hover:bg-red-600 disabled:opacity-50">
              {cargando ? 'Registrando...' : 'Registrar Gasto'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminFinanzas;
