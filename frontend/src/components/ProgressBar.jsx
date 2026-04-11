'use client';
import { motion } from 'framer-motion';

export default function ProgressBar({ progress = 0, showLabel = true }) {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progreso</span>
          <span className="text-primary-500 font-medium">{percentage}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-200 dark:bg-dark-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
}
