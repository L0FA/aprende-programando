import { motion } from 'framer-motion';
import CourseCard from './CourseCard';

export default function CoursesGrid({ courses }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <CourseCard course={course} />
        </motion.div>
      ))}
    </div>
  );
}