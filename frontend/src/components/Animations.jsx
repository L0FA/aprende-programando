'use client';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContainer({ children, className = '', stagger = true }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger ? staggerContainer : fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, className = '', onClick, href, ...props }) {
  const MotionComponent = href ? motion.a : motion.button;
  
  return (
    <MotionComponent
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
