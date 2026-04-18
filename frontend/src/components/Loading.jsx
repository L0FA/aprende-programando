'use client';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="relative w-20 h-20 mb-8">
        <motion.div
          className="absolute inset-0 border-4 border-primary-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="space-y-4 w-full max-w-md">
        <motion.div 
          className="h-8 bg-gray-200 dark:bg-dark-100 rounded-lg w-3/4 mx-auto"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="h-4 bg-gray-200 dark:bg-dark-100 rounded-lg w-full"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="h-4 bg-gray-200 dark:bg-dark-100 rounded-lg w-5/6 mx-auto"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-100 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 h-64 flex flex-col gap-4">
      <motion.div 
        className="w-full h-32 bg-gray-200 dark:bg-dark-200 rounded-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="space-y-2">
        <motion.div 
          className="h-6 bg-gray-200 dark:bg-dark-200 rounded-md w-3/4"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="h-4 bg-gray-200 dark:bg-dark-200 rounded-md w-full"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}
