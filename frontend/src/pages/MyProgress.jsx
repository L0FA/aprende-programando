import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../AuthContext';

export default function MyProgress() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user) {
      api.progress.getStats()
        .then(setStats)
        .catch(console.error);
      api.courses.getAll()
        .then(setCourses)
        .catch(console.error);
    }
  }, [user]);

  if (!user) return <div className="p-8 text-center">Debes iniciar sesión</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Mi Progreso</h1>
      
      {stats && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">Cursos Completados</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.completedCourses || 0}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">Lecciones Completadas</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.completedLessons || 0}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">En Progreso</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.inProgressCourses || 0}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Todos los Cursos</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} to={`/courses/${course.slug}`} className="card p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{course.lessons?.length || 0} lecciones</p>
          </Link>
        ))}
      </div>
    </div>
  );
}