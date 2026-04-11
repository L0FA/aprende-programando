import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Brain, Rocket, Database, HelpCircle, X, ChevronRight } from 'lucide-react';

const paths = [
  { href: '/courses?category=fundamentos', icon: BookOpen, label: 'Fundamentos', desc: 'Desde cero' },
  { href: '/courses?category=frontend', icon: Code, label: 'Frontend', desc: 'Web' },
  { href: '/courses?category=backend', icon: Database, label: 'Backend', desc: 'Servidor' },
  { href: '/courses?category=videojuegos', icon: Rocket, label: 'Videojuegos', desc: 'Games' },
  { href: '/courses?category=ia', icon: Brain, label: 'IA', desc: 'AI' },
];

const quizQuestions = [
  {
    question: "¿Qué quieres aprender?",
    options: [
      { label: "Hacer páginas web", category: "frontend" },
      { label: "Crear aplicaciones", category: "backend" },
      { label: "Videojuegos", category: "videojuegos" },
      { label: "Inteligencia Artificial", category: "ia" },
      { label: "No sé, empezar desde cero", category: "fundamentos" },
    ]
  },
  {
    question: "¿Qué nivel tienes?",
    options: [
      { label: "Soy principiante", level: "BEGINNER" },
      { label: "Ya sé algo", level: "INTERMEDIATE" },
      { label: "Tengo experiencia", level: "ADVANCED" },
    ]
  }
];

export const scrollToAbout = () => {
  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  const handleQuizAnswer = (answer) => {
    if (quizStep === 0) {
      setQuizAnswers({ ...quizAnswers, category: answer.category });
      setQuizStep(1);
    } else {
      setQuizAnswers({ ...quizAnswers, level: answer.level });
      setShowQuiz(false);
      const category = quizAnswers.category || answer.category;
      window.location.href = `/courses?category=${category}`;
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-dark-300 dark:via-dark-300 dark:to-dark-300 min-h-[60vh] flex items-center">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-500/20 rounded-full blur-3xl opacity-50 dark:opacity-100"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-500/20 rounded-full blur-3xl opacity-50 dark:opacity-100"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
            >
              Aprende a <span className="text-primary-500">Programar</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
            >
              Cursos gratuitos de programación, desde fundamentos hasta tecnologías avanzadas.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {paths.map((path) => (
                <Link key={path.href} to={path.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all"
                  >
                    <path.icon className="w-4 h-4 text-primary-500" />
                    <span className="font-medium text-gray-900 dark:text-white">{path.label}</span>
                    <span className="text-xs text-gray-500">{path.desc}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <button 
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all inline-flex items-center gap-2"
              >
                Ayúdame <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollToAbout}
                className="px-6 py-3 bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-700 transition-all inline-flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5" /> ¿Qué es esto?
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQuiz(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-100 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {quizQuestions[quizStep].question}
                </h2>
                <button onClick={() => setShowQuiz(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {quizQuestions[quizStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(option)}
                    className="w-full p-4 text-left rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                  >
                    <span className="text-gray-900 dark:text-white font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {quizQuestions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i === quizStep ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}