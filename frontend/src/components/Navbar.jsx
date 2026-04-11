import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, ChevronDown, BookOpen, Settings, Rocket, Code, Database, Wrench, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthContext';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';

const categories = [
  { name: 'Frontend', slug: 'frontend', icon: Code, description: 'HTML, CSS, React...' },
  { name: 'Backend', slug: 'backend', icon: BookOpen, description: 'Node, Python...' },
  { name: 'Videojuegos', slug: 'videojuegos', icon: Rocket, description: 'Unity, Godot...' },
  { name: 'Bases de Datos', slug: 'bases-datos', icon: Database, description: 'SQL, MongoDB...' },
  { name: 'Herramientas', slug: 'herramientas', icon: Wrench, description: 'Git, Docker...' },
  { name: 'IA', slug: 'ia', icon: Brain, description: 'ML, NLP...' },
];

function Dropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors py-2 font-medium"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-56 bg-white dark:bg-dark-100 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50"
          >
            {items.map((item) => (
              <Link
                key={item.slug}
                to={`/courses?category=${item.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.icon && <item.icon className="w-4 h-4 text-primary-500" />}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const openLogin = () => { setAuthMode('login'); setAuthModalOpen(true); };
  const openRegister = () => { setAuthMode('register'); setAuthModalOpen(true); };

  return (
    <motion.nav 
      className={`bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-dark-200/95 backdrop-blur-md shadow-lg' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-lg lg:text-xl">AP</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">Aprende</span>
              <span className="font-bold text-xl text-primary-500">Programando</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center justify-between flex-1 px-8">
            <div className="flex items-center gap-1">
              <Link to="/courses" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                Todos los Cursos
              </Link>
              
              <Dropdown title="Categorías" items={categories} />
              
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
            
          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 text-white hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden md:inline text-sm font-medium">{user.name || user.email?.split('@')[0] || 'Usuario'}</span>
              </motion.button>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-dark-100 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 py-3 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{user.name || user.email?.split('@')[0] || 'Usuario'}</p>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400' : 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'}`}>
                          {user.role === 'ADMIN' ? 'Admin' : 'Usuario'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{user.email || ''}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/mi-progreso" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <Rocket className="w-4 h-4" />
                        Mi Progreso
                      </Link>
                      <Link to="/courses" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <BookOpen className="w-4 h-4" />
                        Mis Cursos
                      </Link>
                      {user.role === 'ADMIN' && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors">
                          <Settings className="w-4 h-4" />
                          Panel Admin
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={openLogin}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={openRegister}
                className="hidden lg:inline-flex px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all"
              >
                Crear Cuenta
              </button>
            </div>
          )}

          <motion.button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="lg:hidden bg-white dark:bg-dark-200 border-t border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                <Link to="/courses" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors font-medium">
                  <BookOpen className="w-5 h-5 text-primary-500" />
                  Todos los Cursos
                </Link>
                
                <div className="py-2">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categorías</p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/courses?category=${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-4 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors"
                      >
                        <cat.icon className="w-4 h-4 text-primary-500" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link to="/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors font-medium">
                  Explorar Todas
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </motion.nav>
  );
}