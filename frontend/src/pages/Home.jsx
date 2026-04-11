import { useState, useEffect } from 'react';
import { api } from '../api';
import Hero from '../components/Hero';
import HomeContent from '../components/HomeContent';

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.categories.getAll()
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div>
      <Hero />
      <HomeContent categories={categories} />
    </div>
  );
}