import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Lesson from './pages/Lesson';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import MyProgress from './pages/MyProgress';
import Admin from './pages/Admin';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-dark-300">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/lesson/:slug" element={<Lesson />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:slug" element={<CategoryDetail />} />
              <Route path="/mi-progreso" element={<MyProgress />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <footer className="bg-gray-100 dark:bg-dark-200 border-t border-gray-200 dark:border-gray-800 py-8 mt-20 text-center text-gray-600 dark:text-gray-400">
            <p>Aprende Programando © 2024</p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}