import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { authenticate, requireAdmin } from './auth.routes.js';

const router = Router();

router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalLessons] = await Promise.all([
      prisma.user.count(),
      prisma.course.count({ where: { published: true } }),
      prisma.lesson.count({ where: { published: true } })
    ]);
    
    res.json({ totalUsers, totalCourses, totalLessons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/users/:id/role', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ error: 'Rol inválido' });
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, name: true, role: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/users/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (id === req.user.id) {
      return res.status(400).json({ error: 'No puedes eliminarte a ti mismo' });
    }
    
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/courses', authenticate, requireAdmin, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: { 
        category: true,
        _count: { select: { lessons: true, enrollments: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/courses/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { 
        category: true,
        lessons: { orderBy: { order: 'asc' } }
      }
    });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/courses', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, slug, description, difficulty, duration, categoryId, published, order, lessons } = req.body;
    
    if (!title || !slug || !categoryId) {
      return res.status(400).json({ error: 'Título, slug y categoría son requeridos' });
    }

    const existingCourse = await prisma.course.findUnique({ where: { slug } });
    if (existingCourse) {
      return res.status(400).json({ error: 'Ya existe un curso con ese slug' });
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description: description || '',
        difficulty: difficulty || 'BEGINNER',
        duration: duration || '',
        published: published || false,
        order: order || 0,
        categoryId,
        lessons: lessons?.length > 0 ? {
          create: lessons.map((l, i) => ({
            title: l.title,
            slug: l.slug,
            content: l.content || '',
            order: l.order || i + 1,
            published: true
          }))
        } : undefined
      },
      include: { category: true, lessons: true }
    });
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/courses/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, difficulty, duration, categoryId, published, order, lessons } = req.body;
    
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(difficulty && { difficulty }),
        ...(duration !== undefined && { duration }),
        ...(categoryId && { categoryId }),
        ...(published !== undefined && { published }),
        ...(order !== undefined && { order })
      },
      include: { category: true }
    });
    
    if (lessons && Array.isArray(lessons)) {
      await prisma.lesson.deleteMany({ where: { courseId: id } });
      
      if (lessons.length > 0) {
        await prisma.lesson.createMany({
          data: lessons.map((l, i) => ({
            title: l.title,
            slug: l.slug,
            content: l.content || '',
            order: l.order || i + 1,
            published: l.published !== false,
            courseId: id
          }))
        });
      }
    }
    
    const updatedCourse = await prisma.course.findUnique({
      where: { id },
      include: { category: true, lessons: { orderBy: { order: 'asc' } } }
    });
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/courses/:id/publish', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;
    
    const course = await prisma.course.update({
      where: { id },
      data: { published },
      include: { category: true }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/courses/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.course.delete({ where: { id } });
    res.json({ message: 'Curso eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/categories', authenticate, requireAdmin, async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/enrollments', authenticate, requireAdmin, async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: { user: { select: { id: true, name: true, email: true } }, course: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;