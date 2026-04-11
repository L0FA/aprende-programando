import { Link } from 'react-router-dom';
import { BookOpen, Code, Brain, Rocket, Database } from 'lucide-react';
import { useState } from 'react';

const paths = [
  { href: '/courses?category=fundamentos', icon: BookOpen, label: 'Fundamentos', desc: 'Desde cero' },
  { href: '/courses?category=frontend', icon: Code, label: 'Frontend', desc: 'Web' },
  { href: '/courses?category=backend', icon: Database, label: 'Backend', desc: 'Servidor' },
  { href: '/courses?category=videojuegos', icon: Rocket, label: 'Videojuegos', desc: 'Games' },
  { href: '/courses?category=ia', icon: Brain, label: 'IA', desc: 'AI' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-300 dark:via-dark-300 dark:to-dark-300 min-h-[60vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Aprende a <span className="text-primary-500">Programar</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Cursos gratuitos de programación, desde fundamentos hasta tecnologías avanzadas.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {paths.map((path) => (
              <Link key={path.href} to={path.href}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all">
                  <path.icon className="w-4 h-4 text-primary-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{path.label}</span>
                  <span className="text-xs text-gray-500">{path.desc}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/courses" className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all">
              Ver Cursos
            </Link>
            <Link to="/categories" className="px-6 py-3 bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-700 transition-all">
              Explorar Categorías
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}