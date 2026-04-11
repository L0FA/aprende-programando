'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import ProgressBar from '@/components/ProgressBar';
import AnimatedCourseCard from '@/components/AnimatedCourseCard';
import { BookOpen, Award } from 'lucide-react';

export default function ProgressPage() {
  const { user, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      loadData();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const loadData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const [coursesRes] = await Promise.all([
        fetch(`${API_URL}/api/courses`)
      ]);
      const courses = await coursesRes.json();
      setAllCourses(courses);
      
      // Simular progreso (en producción vendría de la DB)
      const withProgress = courses.map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100)
      }));
      setAllCourses(withProgress);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Inicia sesión para ver tu progreso
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Accede a tu cuenta para continuar aprendiendo
        </p>
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const enrolledCourses = allCourses.filter(c => c.progress > 0);
  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Hola, {user.name || 'Estudiante'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí está tu progreso de aprendizaje
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allCourses.length}</p>
              <p className="text-sm text-gray-500">Cursos disponibles</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedCourses}</p>
              <p className="text-sm text-gray-500">Cursos completados</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Progreso general</p>
            <p className="text-2xl font-bold text-primary-500">{totalProgress}%</p>
          </div>
          <ProgressBar progress={totalProgress} showLabel={false} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Continuar aprendiendo
        </h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <AnimatedCourseCard course={course} progress={course.progress} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              ¡Aún no has Started ningún curso! Empieza tu viaje de aprendizaje hoy.
            </p>
            <Link href="/courses" className="btn-primary">
              Ver cursos disponibles
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
