'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getCourseImage } from '@/lib/images';
import ProgressBar from './ProgressBar';

const difficultyColors = {
  BEGINNER: 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20',
  INTERMEDIATE: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
  ADVANCED: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
  TECH_LEAD: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
  EXTREME: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20',
};

const difficultyLabel = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
  TECH_LEAD: 'Tech Lead',
  EXTREME: 'Extremo',
};

export default function AnimatedCourseCard({ course, progress = 0 }) {
  const imageUrl = getCourseImage(course.slug, course.category?.icon);

  return (
    <Link href={`/courses/${course.slug}`} className="block">
      <motion.div
        className="card group cursor-pointer h-full flex flex-col overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap gap-2">
            <span className={`tag ${difficultyColors[course.difficulty]}`}>
              {difficultyLabel[course.difficulty]}
            </span>
            {course.featured && (
              <span className="tag bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                ⭐ Destacado
              </span>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
            {course.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{course._count?.lessons || 0} lecciones</span>
              {course.duration && <span>{course.duration}</span>}
            </div>
            
            {progress > 0 && (
              <div className="pt-2">
                <ProgressBar progress={progress} showLabel={false} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
