'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, User } from 'lucide-react';
import AnimatedCategoryCard from '@/components/AnimatedCategoryCard';

export default function HomeContent({ categories }) {
  return (
    <div>
      <section id="about-section" className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
        >
          ¿Qué es Aprende Programando? 🎓
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 dark:from-primary-500/5 dark:to-purple-500/5 rounded-2xl p-6 mb-8"
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Aquí encontrarás <strong>cursos gratuitos de programación</strong> organizados por nivel y categoría. 
            Ya seas principiante o experto, tenemos contenido para vos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-dark-100 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fundamentos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empezá desde cero. Aprende qué es programar, variables, funciones y sintaxis básica.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-100 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
              <span className="text-2xl">💻</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Frontend & Backend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              HTML, CSS, JavaScript, React, Node.js y más para crear aplicaciones web completas.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-100 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Videojuegos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aprende a crear juegos con Python, JavaScript, Phaser y Godot.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-dark-100 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-3">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">IA & Machine Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Descubrí el mundo de la Inteligencia Artificial y cómo usarla en tus proyectos.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-dark-100 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Cómo usarlo</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• <strong>Empezá por Fundamentos</strong> si nunca has programado</li>
            <li>• Cada curso tiene niveles: <strong>Junior → Senior → Master → Tech Lead</strong></li>
            <li>• Seguí el orden para aprender mejor</li>
            <li>• <strong>¡Todo es gratuito!</strong></li>
          </ul>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Explorar por Categoría
          </motion.h2>
          <Link href="/categories" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors flex items-center gap-1">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AnimatedCategoryCard category={category} courseCount={category.courseCount} compact />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-dark-100 to-dark-200 dark:from-dark-300 dark:to-dark-200 rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sobre el Creador
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Hola! Soy el creador de Aprende Programando. 
            ¡Te invito a ver mis otros proyectos!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://portfolioslf.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Mi Portfolio
            </a>
            <a 
              href="https://github.com/L0FA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}