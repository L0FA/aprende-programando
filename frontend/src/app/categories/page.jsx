import { api } from '@/lib/api';
import CategoriesGrid from '@/components/CategoriesGrid';

export const metadata = { title: 'Categorías | Aprende Programando' };

export default async function Page() {
  let categories = [];
  try {
    categories = await api.categories.getAll();
  } catch (error) {
    console.error('Error:', error);
  }

  return <CategoriesGrid categories={categories} />;
}
