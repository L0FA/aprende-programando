import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CategoryDetail() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.categories.getBySlug(slug)
      .then(setCategory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (!category) return <div className="p-8 text-center">Categoría no encontrada</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/categories" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" /> Volver a categorías
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{category.name}</h1>
      <p className="text-gray-400 text-lg mb-8">{category.description}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.courses?.map((course) => (
          <Link key={course.id} to={`/courses/${course.slug}`} className="card p-6">
            <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
            <span className="tag">{course.lessons?.length || 0} lecciones</span>
          </Link>
        ))}
      </div>
    </div>
  );
}