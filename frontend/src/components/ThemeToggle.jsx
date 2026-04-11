import { useTheme } from '../ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  );
}