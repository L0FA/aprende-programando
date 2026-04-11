'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from './AuthProvider';

const XP_BAR_WIDTH = 60;

export default function UserBadge() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/progress/stats`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => setStats(data))
        .catch(() => {});
    }
  }, [user]);

  if (!user) return null;

  const rankColors = {
    'Novato': 'bg-gray-500',
    'Aprendiz': 'bg-green-500',
    'Junior': 'bg-blue-500',
    'Intermedio': 'bg-yellow-500',
    'Senior': 'bg-orange-500',
    'Avanzado': 'bg-red-500',
    'Experto': 'bg-purple-500',
    'Maestro': 'bg-pink-500',
    'Guru': 'bg-cyan-500',
    'Legend': 'bg-gradient-to-r from-yellow-400 to-orange-500',
    'Creador': 'bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500',
  };

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-dark-100 dark:bg-dark-200 rounded-full border border-gray-700">
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-primary-400">Lvl {stats?.level || 1}</span>
        <div className="w-12 h-1.5 bg-gray-700 rounded-full mt-0.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${((stats?.xp || 0) % 500) / 500 * 100}%` }}
          />
        </div>
      </div>
      
      <div className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${rankColors[stats?.rank || 'Novato']}`}>
        {stats?.rank || 'Novato'}
      </div>
      
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <span>⚡</span>
        <span>{stats?.xp || 0} XP</span>
      </div>
    </div>
  );
}