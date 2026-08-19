import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const AdminResumen = () => {
  const [citasHoy, setCitasHoy] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [stats, setStats] = useState({ citasHoy: 0, pacientesTotal: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: dataPacientes } = await supabase.from('pacientes').select('*').order('creado_en', { ascending: false });
      if (dataPacientes) {
        setPacientes(dataPacientes);
        setStats(prev => ({ ...prev, pacientesTotal: dataPacientes.length }));
      }

      const { data: dataCitas } = await supabase.from('citas').select('*, pacientes(nombre_nino)').order('fecha', { ascending: true });
      if (dataCitas) {
        setCitasHoy(dataCitas);
        setStats(prev => ({ ...prev, citasHoy: dataCitas.length }));
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Citas Registradas</p>
            <p className="text-3xl font-bold text-gray-800">{stats.citasHoy}</p>
          </div>
          <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">
            <span className="material-symbols-outlined text-3xl">event_available</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Pacientes</p>
            <p className="text-3xl font-bold text-gray-800">{stats.pacientesTotal}</p>
          </div>
          <div className="bg-orange-50 text-orange-500 p-4 rounded-xl">
            <span className="material-symbols-outlined text-3xl">child_care</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Sistema Activo</p>
            <p className="text-xl font-bold text-green-600 flex items-center gap-2 mt-1">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> En línea
            </p>
          </div>
          <div className="bg-green-50 text-green-600 p-4 rounded-xl">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Agenda de Citas</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {citasHoy.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No hay citas registradas.</p>
            ) : (
              citasHoy.map((cita) => (
                <div key={cita.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-white shadow-sm text-blue-600 px-3 py-2 rounded-lg font-bold text-sm border">
                      {cita.hora ? cita.hora.substring(0, 5) : '--:--'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{cita.pacientes?.nombre_nino || 'Paciente'}</p>
                      <p className="text-xs text-gray-500">Fecha: {cita.fecha}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {cita.estado || 'Pendiente'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pacientes Recientes</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {pacientes.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No hay pacientes.</p>
            ) : (
              pacientes.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {p.nombre_nino ? p.nombre_nino.charAt(0).toUpperCase() : 'P'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{p.nombre_nino}</p>
                      <p className="text-xs text-gray-500">Apoderado: {p.nombre_apoderado}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/admin/pacientes/${p.id}`)}
                    className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100"
                  >
                    Ver Ficha
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResumen;