'use client';
import { motion } from 'framer-motion';
import AnimatedCategoryCard from '@/components/AnimatedCategoryCard';

export default function CategoriesGrid({ categories }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Categorías</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Encuentra el tema perfecto para ti</p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <AnimatedCategoryCard category={category} courseCount={category.courseCount} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
