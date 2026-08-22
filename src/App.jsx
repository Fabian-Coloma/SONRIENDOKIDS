import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { supabase } from './supabase';
import { AsistenteProvider } from './context/AsistenteContext';

// ================= COMPONENTES COMUNES =================
import ScrollToTop from "./components/Common/ScrollToTop";
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Referencias from './pages/Referencias';

// ================= PÁGINAS PÚBLICAS =================
import Home from './pages/Home';
import Profesional from './pages/Profesional';
import Sedes from './pages/Sedes';
import Ubicanos from './pages/Ubicanos';
import Reserva from './pages/Reserva';
import Login from './pages/Login';

// ================= PÁGINAS DE ESPECIALIDADES =================
import Odontopediatria from './pages/Odontopediatria';
import OrtopediaOrtodoncia from './pages/OrtopediaOrtodoncia'; // Nuevo nombre
import Sedaciones from './pages/Sedaciones'; // Nuevo nombre

// ================= PÁGINAS DE ADMINISTRACIÓN =================
import AdminLayout from './pages/admin/AdminLayout';
import AdminResumen from './pages/admin/AdminResumen';
import AdminPacientes from './pages/admin/AdminPacientes';
import AdminHistorial from './pages/admin/AdminHistorial';
import AdminFinanzas from './pages/admin/AdminFinanzas'; 
import AdminCitas from './pages/admin/AdminCitas';

// ================= PROTECCIÓN DE RUTAS (ADMIN) =================
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
        <div className="animate-pulse flex flex-col items-center gap-4">
          <span className="text-4xl">🦷</span>
          <p className="text-gray-500 font-bold tracking-widest uppercase">Verificando seguridad...</p>
        </div>
      </div>
    );
  }

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
};

// ================= LAYOUT PÚBLICO (Navbar + Footer) =================
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// ================= APLICACIÓN PRINCIPAL =================
function App() {
  return (
    <BrowserRouter>
      <AsistenteProvider> {/* <-- MAGIA: Envuelve todo el contenido de las rutas por dentro */}
        <ScrollToTop />
        
        <Routes>
          {/* RUTAS PÚBLICAS (Usan Navbar y Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profesional" element={<Profesional />} />
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/ubicanos" element={<Ubicanos />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/login" element={<Login />} />
            <Route path="/testimonios" element={<Referencias />} />
            
            {/* Rutas de las Especialidades */}
          <Route path="/odontopediatria" element={<Odontopediatria />} />
<Route path="/ortopedia-ortodoncia" element={<OrtopediaOrtodoncia />} />
<Route path="/sedaciones" element={<Sedaciones />} />
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
      </AsistenteProvider>
    </BrowserRouter>
  );
}

export default App;