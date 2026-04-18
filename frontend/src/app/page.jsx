

import { api } from '@/lib/api';
import Hero from '@/components/Hero';
import HomeContent from '@/components/HomeContent';

async function getCategories() {
  try {
    return await api.categories.getAll();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div>
      <Hero />
      <HomeContent categories={categories} />
    </div>
  );
}