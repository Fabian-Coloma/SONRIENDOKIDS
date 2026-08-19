import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      
      navigate('/admin');
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Correo o contraseña incorrectos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="font-bold text-3xl tracking-tight flex gap-1 justify-center mb-2">
            <span className="text-[#003B5C]">Sonriendo</span>
            <span className="text-[#FFB81C]">Kids</span>
          </div>
          <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#003B5C] focus:ring-2 focus:ring-[#003B5C]/20 outline-none transition-all"
              placeholder="admin@sonriendokids.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#003B5C] focus:ring-2 focus:ring-[#003B5C]/20 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={cargando}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
              cargando 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#003B5C] text-white hover:bg-[#002b44] shadow-md hover:shadow-lg'
            }`}
          >
            {cargando ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;