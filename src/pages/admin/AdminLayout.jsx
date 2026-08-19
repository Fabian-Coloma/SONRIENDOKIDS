import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabase';


const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  
  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-100 flex-col shadow-sm z-10 hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <div className="font-bold text-2xl tracking-tight flex gap-1">
            <span className="text-[#003B5C]">Sonriendo</span>
            <span className="text-[#FFB81C]">Kids</span>
          </div>
        </div>
        
        <div className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4">
          Menú Principal
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <button 
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive('/admin') ? 'bg-[#003B5C] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="material-symbols-outlined">space_dashboard</span>
            Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/admin/pacientes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              location.pathname.includes('/admin/pacientes') ? 'bg-[#003B5C] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            Pacientes
          </button>
          <button 
            onClick={() => navigate('/admin/finanzas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              location.pathname.includes('/admin/finanzas') ? 'bg-[#003B5C] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            Finanzas y Caja
          </button>
          <button 
         onClick={() => navigate('/admin/citas')}
         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
           location.pathname.includes('/admin/citas') ? 'bg-[#003B5C] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
         }`}
       >
         <span className="material-symbols-outlined">calendar_month</span>
         Agenda de Citas
       </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 shadow-sm z-0">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            Panel de Administración
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">Dra. Patricia</p>
              <p className="text-xs text-gray-500">Odontopediatra</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              P
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;