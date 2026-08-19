import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabase';

const AdminFinanzas = () => {
  const [pasoActivo, setPasoActivo] = useState(1); 
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(false);

  
  const [nuevoIngreso, setNuevoIngreso] = useState({ paciente_id: '', monto: '', metodo_pago: 'Yape', concepto: '' });
  const [nuevoEgreso, setNuevoEgreso] = useState({ concepto: '', categoria: 'Costo Operativo Fijo', monto: '' });

  const cargarDatosFinancieros = useCallback(async () => {
  
  const { data: dataIngresos } = await supabase.from('finanzas_ingresos').select('*, pacientes(nombre_nino)').order('fecha', { ascending: false });
  if (dataIngresos) setIngresos(dataIngresos);

  
  const { data: dataEgresos } = await supabase.from('finanzas_egresos').select('*').order('fecha', { ascending: false });
  if (dataEgresos) setEgresos(dataEgresos);

  
  const { data: dataPacientes } = await supabase.from('pacientes').select('id, nombre_nino');
  if (dataPacientes) setPacientes(dataPacientes);
}, []);

useEffect(() => {
    const iniciarCarga = async () => {
      await cargarDatosFinancieros();
    };
    iniciarCarga();
  }, [cargarDatosFinancieros]);

  const handleGuardarIngreso = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const { error } = await supabase.from('finanzas_ingresos').insert([nuevoIngreso]);
      if (error) throw error;
      alert("Pago registrado exitosamente");
      setNuevoIngreso({ paciente_id: '', monto: '', metodo_pago: 'Yape', concepto: '' });
      cargarDatosFinancieros();
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
      cargarDatosFinancieros();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el gasto");
    } finally {
      setCargando(false);
    }
  };

  const totalIngresos = ingresos.reduce((acc, curr) => acc + parseFloat(curr.monto), 0);
  const totalEgresos = egresos.reduce((acc, curr) => acc + parseFloat(curr.monto), 0);
  const saldoNeto = totalIngresos - totalEgresos;

  return (
    <div className="space-y-6 animate-fade-in-up">
      
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

      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {pasoActivo === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Últimos Ingresos</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {ingresos.length === 0 ? <p className="text-gray-500 text-sm">No hay ingresos registrados.</p> : ingresos.map(item => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-xl border flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.pacientes?.nombre_nino || 'Paciente Eliminado'}</p>
                      <p className="text-xs text-gray-500">{item.concepto} • {item.metodo_pago}</p>
                    </div>
                    <span className="font-bold text-green-600">+S/ {item.monto}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Últimos Gastos</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {egresos.length === 0 ? <p className="text-gray-500 text-sm">No hay gastos registrados.</p> : egresos.map(item => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-xl border flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.concepto}</p>
                      <p className="text-xs text-gray-500">{item.categoria}</p>
                    </div>
                    <span className="font-bold text-red-500">-S/ {item.monto}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
            <button type="submit" disabled={cargando} className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700">
              {cargando ? 'Registrando...' : 'Registrar Ingreso'}
            </button>
          </form>
        )}

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
            <button type="submit" disabled={cargando} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold shadow-md hover:bg-red-600">
              {cargando ? 'Registrando...' : 'Registrar Gasto'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminFinanzas;