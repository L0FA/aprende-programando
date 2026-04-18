import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import LessonContent from '@/components/LessonContent';

export async function generateMetadata({ params }) {
  try {
    const lesson = await api.lessons.getBySlug(params.slug);
    return { title: `${lesson.title} | Aprende Programando` };
  } catch { return { title: 'Lección' }; }
}

async function getLesson(slug) {
  try { return await api.lessons.getBySlug(slug); }
  catch { return null; }
}

export async function generateStaticParams() {
  try {
    const lessons = await api.lessons.getAll();
    if (!lessons || lessons.length === 0) return [{ slug: 'empty' }];
    return lessons.map((lesson) => ({
      slug: lesson.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for lessons:', error);
    return [{ slug: 'empty' }];
  }
}

export default async function LessonPage({ params }) {
  const lesson = await getLesson(params.slug);

  if (!lesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Lección no encontrada</h1>
        <Link href="/courses" className="btn-primary">Ver cursos</Link>
      </div>
    );
  }

  return <LessonContent lesson={lesson} />;
}