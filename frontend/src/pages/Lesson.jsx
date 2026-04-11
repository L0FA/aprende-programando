import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { ArrowLeft } from 'lucide-react';

export default function Lesson() {
  const { slug } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.lessons.getBySlug(slug)
      .then(setLesson)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (!lesson) return <div className="p-8 text-center">Lección no encontrada</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to={`/courses/${lesson.course?.slug}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" /> Volver al curso
      </Link>

      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{lesson.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>
    </div>
  );
}