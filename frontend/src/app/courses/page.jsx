import { api } from '@/lib/api';
import CoursesPage from '@/components/CoursesGrid';

export const revalidate = 0;

export const metadata = { title: 'Cursos | Aprende Programando' };

export default async function Page() {
  let courses = [];
  try {
    courses = await api.courses.getAll();
  } catch (error) {
    console.error('Error:', error);
  }

  return <CoursesPage courses={courses} />;
}
