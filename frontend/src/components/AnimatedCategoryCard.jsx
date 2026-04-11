'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, Brain, Terminal, BookOpen, Globe, Rocket, Package, Database, Wrench, Gamepad, Server } from 'lucide-react';

const iconMap = {
  code: Code,
  brain: Brain,
  terminal: Terminal,
  book: BookOpen,
  globe: Globe,
  rocket: Rocket,
  package: Package,
  database: Database,
  tool: Wrench,
  gamepad: Gamepad,
  server: Server,
};

export default function AnimatedCategoryCard({ category, courseCount, compact }) {
  const Icon = iconMap[category.icon] || BookOpen;

  if (compact) {
    return (
      <Link href={`/courses?category=${category.slug}`} className="block">
        <motion.div
          className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">{courseCount} cursos</p>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <motion.div
        className="card group cursor-pointer h-full overflow-hidden"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-[2/1] relative overflow-hidden bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
          <Icon className="w-16 h-16 text-primary-500/50" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {category.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {category.description}
          </p>
          <span className="tag">{courseCount} cursos</span>
        </div>
      </motion.div>
    </Link>
  );
}