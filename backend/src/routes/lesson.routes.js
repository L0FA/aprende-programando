import { Router } from 'express';
import { prisma } from '../config/prisma.js';

const router = Router();

router.get('/:slug', async (req, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { slug: req.params.slug },
      include: {
        course: {
          select: { 
            id: true, 
            title: true, 
            slug: true, 
            lessons: { 
              where: { published: true }, 
              orderBy: { order: 'asc' }, 
              select: { id: true, title: true, slug: true, order: true } 
            } 
          }
        }
      }
    });
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });
    
    const idx = lesson.course.lessons.findIndex(l => l.id === lesson.id);
    res.json({
      ...lesson,
      prevLesson: idx > 0 ? lesson.course.lessons[idx - 1] : null,
      nextLesson: idx < lesson.course.lessons.length - 1 ? lesson.course.lessons[idx + 1] : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
