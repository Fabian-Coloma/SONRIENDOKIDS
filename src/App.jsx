import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './supabase';

// Componentes Comunes
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Páginas Públicas
import Home from './pages/Home';
import Profesional from './pages/Profesional';
import Sedes from './pages/Sedes';
import Ubicanos from './pages/Ubicanos';
import Reserva from './pages/Reserva';
import Login from './pages/Login';

// Nuestras Nuevas Páginas de Especialidades
import Ortodoncia from './pages/Ortodoncia';
import Odontopediatria from './pages/Odontopediatria';
import Sedacion from './pages/Sedacion';

// Páginas de Administración
import AdminLayout from './pages/admin/AdminLayout';
import AdminResumen from './pages/admin/AdminResumen';
import AdminPacientes from './pages/admin/AdminPacientes';
import AdminHistorial from './pages/admin/AdminHistorial';
import AdminFinanzas from './pages/admin/AdminFinanzas'; 
import AdminCitas from './pages/admin/AdminCitas';

const ProtectedRoute = () => {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAutenticado(!!session);
    };
    verificarSesion();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAutenticado(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (autenticado === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
        <p className="text-gray-500 font-medium">Verificando seguridad...</p>
      </div>
    );
  }

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
};

// Layout Público: Aplica Navbar y Footer a todas las rutas hijas
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    {/* Ajuste menor: Quité 'pt-24' y puse 'flex-grow' para evitar que se 
        sume al 'pt-40' que ya le dimos individualmente a las nuevas páginas */}
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* RUTAS PÚBLICAS (Usan Navbar y Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profesional" element={<Profesional />} />
          <Route path="/sedes" element={<Sedes />} />
          <Route path="/ubicanos" element={<Ubicanos />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rutas de las Especialidades */}
          <Route path="/ortodoncia" element={<Ortodoncia />} />
          <Route path="/odontopediatria" element={<Odontopediatria />} />
          <Route path="/sedacion" element={<Sedacion />} />
        </Route>

        {/* RUTAS PRIVADAS (Panel de Administración) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminResumen />} />
            <Route path="pacientes" element={<AdminPacientes />} />
            <Route path="pacientes/:id" element={<AdminHistorial />} />
            <Route path="finanzas" element={<AdminFinanzas />} />
            <Route path="citas" element={<AdminCitas />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;