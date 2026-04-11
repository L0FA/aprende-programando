import { Router } from 'express';
import { prisma } from '../config/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category, difficulty, featured } = req.query;
    const where = { published: true };
    if (category) where.category = { slug: category };
    if (difficulty) where.difficulty = difficulty;
    if (featured === 'true') where.featured = true;

    const courses = await prisma.course.findMany({
      where,
      include: {
        category: { select: { name: true, slug: true, icon: true } },
        _count: { select: { lessons: true } }
      },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }]
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        lessons: {
          where: { published: true },
          orderBy: { order: 'asc' },
          select: { id: true, title: true, slug: true, duration: true, order: true }
        }
      }
    });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
