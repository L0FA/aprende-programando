import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

const difficultyLabels = { BEGINNER: 'Principiante', INTERMEDIATE: 'Intermedio', ADVANCED: 'Avanzado' };

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.courses.getBySlug(slug)
      .then(setCourse)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (!course) return <div className="p-8 text-center">Curso no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/courses" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" /> Volver a cursos
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-8">
            <span className="text-8xl">💻</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="tag">{difficultyLabels[course.difficulty]}</span>
            <span className="tag">{course.category?.name}</span>
            <span className="tag flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.lessons?.length || 0} lecciones</span>
          </div>

          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{course.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{course.description}</p>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contenido del Curso</h2>
            <div className="space-y-2">
              {course.lessons?.map((lesson, index) => (
                <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium">{index + 1}</span>
                  <div className="flex-1"><h3 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h3></div>
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-24">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Sobre este curso</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Acceso de por vida</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Actualizaciones gratuitas</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Certificado de finalización</li>
            </ul>
            <button className="w-full mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Comenzar Curso</button>
          </div>
        </div>
      </div>
    </div>
  );
}