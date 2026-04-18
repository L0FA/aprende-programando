'use client';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="relative flex items-center justify-center mb-10">
        {/* Glowing background circles */}
        <motion.div
          className="absolute w-32 h-32 bg-primary-500/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-purple-500/30 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        
        {/* Floating Logo */}
        <motion.div 
          className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl z-10"
          animate={{ y: [-5, 5, -5], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white font-bold text-2xl tracking-tighter">AP</span>
          
          {/* Orbital loading ring */}
          <motion.div
            className="absolute -inset-4 border-2 border-dashed border-primary-500/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-2 border border-purple-500/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
      
      {/* Skeleton Text */}
      <div className="space-y-4 w-full max-w-sm flex flex-col items-center">
        <motion.div 
          className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-dark-100 dark:via-dark-200 dark:to-dark-100 rounded-lg w-1/2 bg-[length:200%_100%]"
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-dark-100 dark:via-dark-200 dark:to-dark-100 rounded-lg w-3/4 bg-[length:200%_100%]"
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-100/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 h-72 flex flex-col gap-4 overflow-hidden relative">
      {/* Shimmer effect overlay */}
      <motion.div 
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-12"
        animate={{ x: ['-150%', '150%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="w-full h-36 bg-gray-100 dark:bg-dark-200 rounded-xl" />
      
      <div className="flex flex-col flex-1 justify-between pt-2">
        <div className="space-y-3">
          <div className="h-5 bg-gray-100 dark:bg-dark-200 rounded-md w-5/6" />
          <div className="h-4 bg-gray-100 dark:bg-dark-200 rounded-md w-full" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-100 dark:bg-dark-200 rounded-md w-1/3" />
          <div className="h-8 bg-gray-100 dark:bg-dark-200 rounded-xl w-8" />
        </div>
      </div>
    </div>
  );
}
