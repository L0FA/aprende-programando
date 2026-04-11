import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.categories.getAll()
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Categorías</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/categories/${cat.slug}`} className="card p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{cat.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}