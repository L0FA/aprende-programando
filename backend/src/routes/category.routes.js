import { Router } from 'express';
import { prisma } from '../config/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { courses: { where: { published: true }, select: { id: true } } }
    });
    res.json(categories.map(c => ({ ...c, courseCount: c.courses.length, courses: undefined })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        courses: {
          where: { published: true },
          orderBy: { order: 'asc' },
          include: { _count: { select: { lessons: true } } }
        }
      }
    });
    if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
