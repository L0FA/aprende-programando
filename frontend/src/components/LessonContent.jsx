'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/components/AuthProvider';
import ProgressBar from '@/components/ProgressBar';

export default function LessonContent({ lesson }) {
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (user?.token) {
      checkProgress();
    }
  }, [user, lesson.id]);

  const checkProgress = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/progress/progress/${lesson.courseId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (e) {}
  };

  const handleComplete = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/progress/lesson/${lesson.id}/complete`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      if (res.ok) {
        const data = await res.json();
        setIsCompleted(true);
        alert(`¡Lección completada! +${data.xpEarned} XP\nAhora eres nivel ${data.level} - ${data.rank}`);
        checkProgress();
      }
    } catch (e) {
      alert('Error al completar la lección');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href={`/courses/${lesson.course?.slug}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver a {lesson.course?.title}
      </Link>

      {progress && (
        <div className="mb-6 p-4 bg-dark-100 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progreso del curso</span>
            <span className="text-sm font-medium text-primary-400">{progress.progress}%</span>
          </div>
          <ProgressBar progress={progress.progress} showLabel={false} />
          <p className="text-xs text-gray-500 mt-2">{progress.completedLessons} de {progress.totalLessons} lecciones completadas</p>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            {user && !isCompleted && (
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                {isLoading ? 'Completando...' : 'Completar Lección'}
              </button>
            )}
            {user && isCompleted && (
              <span className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                <CheckCircle className="w-5 h-5" />
                Completada
              </span>
            )}
          </div>

          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </article>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800">
            {lesson.prevLesson ? (
              <Link href={`/lesson/${lesson.prevLesson.slug}`} className="btn-secondary inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> {lesson.prevLesson.title}
              </Link>
            ) : <div />}
            {lesson.nextLesson ? (
              <Link href={`/lesson/${lesson.nextLesson.slug}`} className="btn-primary inline-flex items-center gap-2">
                Siguiente <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link href={`/courses/${lesson.course?.slug}`} className="btn-primary">Finalizar curso</Link>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark-100 rounded-xl p-6 border border-gray-800 sticky top-24">
            <h3 className="font-bold mb-4">Contenido del Curso</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {lesson.course?.lessons?.map((l, index) => (
                <Link key={l.id} href={`/lesson/${l.slug}`} className={`block p-3 rounded-lg text-sm transition-colors ${l.id === lesson.id ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-dark-200 hover:bg-dark-300'}`}>
                  <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>{l.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}