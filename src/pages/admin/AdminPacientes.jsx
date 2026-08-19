import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const AdminPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  
  
  const [nombreNino, setNombreNino] = useState('');
  const [nombreApoderado, setNombreApoderado] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarPacientes = async () => {
      const { data } = await supabase.from('pacientes').select('*').order('creado_en', { ascending: false });
      if (data) setPacientes(data);
    };
    cargarPacientes();
  }, []);

  const handleCrearPaciente = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const { error } = await supabase.from('pacientes').insert([{ nombre_nino: nombreNino, nombre_apoderado: nombreApoderado, whatsapp }]);
      if (error) throw error;
      setModalAbierto(false);
      setNombreNino(''); setNombreApoderado(''); setWhatsapp('');
      
      // Recargamos la lista
      const { data } = await supabase.from('pacientes').select('*').order('creado_en', { ascending: false });
      if (data) setPacientes(data);
    } catch (err) {
      console.error(err);
      alert("Error al registrar paciente.");
    } finally {
      setCargando(false);
    }
  };

  const pacientesFiltrados = pacientes.filter(p => 
    p.nombre_nino?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.nombre_apoderado?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre de niño o apoderado..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white shadow-sm"
          />
        </div>
        <button 
          onClick={() => setModalAbierto(true)}
          className="bg-[#003B5C] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-[#002b44] shadow-md"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Nuevo Paciente
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="px-6 py-4 font-medium">Paciente</th>
                <th className="px-6 py-4 font-medium">Apoderado</th>
                <th className="px-6 py-4 font-medium">WhatsApp</th>
                <th className="px-6 py-4 font-medium">Registro</th>
                <th className="px-6 py-4 font-medium text-center">Historia Clínica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pacientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No se encontraron pacientes.</td>
                </tr>
              ) : (
                pacientesFiltrados.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {p.nombre_nino?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-800">{p.nombre_nino}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{p.nombre_apoderado}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-green-500 text-sm">chat</span> {p.whatsapp}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(p.creado_en).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => navigate(`/admin/pacientes/${p.id}`)}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 inline-flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">folder_open</span>
                        Ver Historial
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-[#003B5C]">Registrar Nuevo Paciente</h3>
              <button onClick={() => setModalAbierto(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCrearPaciente} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del Niño/a</label>
                <input type="text" value={nombreNino} onChange={(e) => setNombreNino(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Apoderado</label>
                <input type="text" value={nombreApoderado} onChange={(e) => setNombreApoderado(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp</label>
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalAbierto(false)} className="w-1/2 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm">Cancelar</button>
                <button type="submit" disabled={cargando} className="w-1/2 py-3 bg-[#003B5C] text-white rounded-xl font-bold text-sm">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPacientes;