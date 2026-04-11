'use client';
import { motion } from 'framer-motion';
import AnimatedCourseCard from '@/components/AnimatedCourseCard';
import { BookOpen } from 'lucide-react';

export default function CoursesGrid({ courses }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
      >
        Todos los Cursos
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 dark:text-gray-400 text-lg mb-8"
      >
        {courses?.length || 0} cursos disponibles
      </motion.p>
      
      {!courses || courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
          <BookOpen className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">Cargando cursos...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AnimatedCourseCard course={course} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
