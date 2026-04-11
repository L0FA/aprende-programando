import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import CoursesGrid from '../components/CoursesGrid';

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

      {loading ? <p>Cargando...</p> : <CoursesGrid courses={courses} />}
    </div>
  );
}