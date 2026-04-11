import { Link } from 'react-router-dom';

const difficultyColors = {
  BEGINNER: 'bg-green-500/10 text-green-400 border-green-500/20',
  INTERMEDIATE: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  ADVANCED: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  TECH_LEAD: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  EXTREME: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const difficultyLabel = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
  TECH_LEAD: 'Tech Lead',
  EXTREME: 'Extremo',
};

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.slug}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-4xl">{course.category?.icon === 'code' ? '💻' : course.category?.icon === 'brain' ? '🧠' : '📚'}</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`tag ${difficultyColors[course.difficulty]}`}>{difficultyLabel[course.difficulty]}</span>
            {course.featured && <span className="tag bg-yellow-500/10 text-yellow-400">⭐ Destacado</span>}
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary-400 transition-colors text-gray-900 dark:text-white">{course.title}</h3>
          <p className="text-gray-400 text-sm mb-4 flex-1">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-800 pt-4">
            <span>{course._count?.lessons || 0} lecciones</span>
            {course.duration && <span>{course.duration}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}