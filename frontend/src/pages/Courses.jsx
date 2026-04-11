import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { BookOpen } from 'lucide-react';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    const params = category ? { category } : {};
    api.courses.getAll(params)
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Todos los Cursos</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setSearchParams({})} className={`px-4 py-2 rounded-lg ${!category ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
          Todos
        </button>
        {['frontend', 'backend', 'videojuegos', 'ia', 'bases-datos'].map((cat) => (
          <button key={cat} onClick={() => setSearchParams({ category: cat })} className={`px-4 py-2 rounded-lg ${category === cat ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? <p>Cargando...</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.slug}`} className="card p-6">
              <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
              <div className="flex gap-2">
                <span className="tag">{course.difficulty}</span>
                <span className="tag">{course.lessons?.length || 0} lecciones</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}