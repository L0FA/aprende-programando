import Link from 'next/link';
import { Code, Brain, BookOpen, Terminal, Globe, Rocket } from 'lucide-react';

const iconMap = { code: Code, brain: Brain, book: BookOpen, terminal: Terminal, globe: Globe, rocket: Rocket };

export default function CategoryCard({ category, courseCount }) {
  const Icon = iconMap[category.icon] || Code;
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="card p-6 group cursor-pointer">
        <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
          <Icon className="w-7 h-7 text-primary-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">{category.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{category.description}</p>
        <span className="tag">{courseCount} cursos</span>
      </div>
    </Link>
  );
}
