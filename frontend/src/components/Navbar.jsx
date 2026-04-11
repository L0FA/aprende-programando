import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../AuthContext';

const categories = [
  { name: 'Frontend', slug: 'frontend' },
  { name: 'Backend', slug: 'backend' },
  { name: 'Videojuegos', slug: 'videojuegos' },
  { name: 'Bases de Datos', slug: 'bases-datos' },
  { name: 'Herramientas', slug: 'herramientas' },
  { name: 'IA', slug: 'ia' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 lg:w-12 rounded-xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg lg:text-xl">AP</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-900 dark:text-white">Aprende</span>
              <span className="font-bold text-xl text-primary-500">Programando</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-4">
            <Link to="/courses" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium">
              Todos los Cursos
            </Link>
            <Link to="/categories" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium">
              Categorías
            </Link>
            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="px-4 py-2 text-purple-600 dark:text-purple-400 font-medium">
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 text-white"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline text-sm font-medium">{user.name || user.email?.split('@')[0]}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-dark-100 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 py-3 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                      <p className="font-semibold text-gray-900 dark:text-white">{user.name || user.email?.split('@')[0]}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/mi-progreso" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                        Mi Progreso
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-purple-600 dark:text-purple-400">
                          Panel Admin
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-red-500 flex items-center gap-3">
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/courses" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Iniciar Sesión
                </Link>
                <Link to="/courses" className="hidden lg:inline-flex px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 text-white">
                  Crear Cuenta
                </Link>
              </div>
            )}

            <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-gray-800 py-4">
            <Link to="/courses" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-gray-700 dark:text-gray-300">
              Todos los Cursos
            </Link>
            <Link to="/categories" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-gray-700 dark:text-gray-300">
              Categorías
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}