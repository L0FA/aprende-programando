import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

export async function generateMetadata({ params }) {
  try {
    const category = await api.categories.getBySlug(params.slug);
    return { title: `${category.name} | Aprende Programando` };
  } catch { return { title: 'Categoría' }; }
}

async function getCategory(slug) {
  try { return await api.categories.getBySlug(slug); }
  catch { return null; }
}

export default async function CategoryPage({ params }) {
  const category = await getCategory(params.slug);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
        <Link href="/categories" className="btn-primary">Ver todas las categorías</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/categories" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4" /> Volver a categorías
      </Link>

      <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
      <p className="text-gray-400 text-lg mb-8">{category.description}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
