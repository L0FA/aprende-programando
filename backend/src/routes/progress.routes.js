import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { authenticate } from './auth.routes.js';

const router = Router();

const RANKS = [
  { name: 'Novato', minXP: 0 },
  { name: 'Aprendiz', minXP: 100 },
  { name: 'Junior', minXP: 300 },
  { name: 'Intermedio', minXP: 600 },
  { name: 'Senior', minXP: 1000 },
  { name: 'Avanzado', minXP: 2000 },
  { name: 'Experto', minXP: 3500 },
  { name: 'Maestro', minXP: 5000 },
  { name: 'Guru', minXP: 8000 },
  { name: 'Legend', minXP: 12000 },
];

const getRank = (xp) => {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) return RANKS[i].name;
  }
  return 'Novato';
};

router.post('/enroll/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    if (existing) {
      return res.json({ message: 'Ya inscrito' });
    }

    await prisma.enrollment.create({
      data: { userId, courseId }
    });

    res.status(201).json({ message: 'Inscripción exitosa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/progress/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: { select: { id: true } } }
    });

    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    const totalLessons = course.lessons.length;
    const completedLessons = await prisma.lessonProgress.count({
      where: { userId, lessonId: { in: course.lessons.map(l => l.id) }, completed: true }
    });

    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    res.json({
      totalLessons,
      completedLessons,
      progress,
      isEnrolled: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/lesson/:lessonId/complete', authenticate, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { course: true }
    });

    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { completed: true, completedAt: new Date() },
      create: { userId, lessonId, completed: true, completedAt: new Date() }
    });

    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId: lesson.courseId } },
      update: {},
      create: { userId, courseId: lesson.courseId }
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const newXP = (user.xp || 0) + 10;
    const newLevel = Math.floor(newXP / 500) + 1;
    const newRank = getRank(newXP);

    await prisma.user.update({
      where: { id: userId },
      data: { 
        xp: newXP, 
        level: newLevel, 
        rank: newRank,
        lastActive: new Date()
      }
    });

    res.json({ 
      completed: true, 
      xpEarned: 10,
      totalXP: newXP,
      level: newLevel,
      rank: newRank
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, level: true, rank: true, streakDays: true }
    });

    const completedLessons = await prisma.lessonProgress.count({
      where: { userId, completed: true }
    });

    const enrolledCourses = await prisma.enrollment.count({
      where: { userId }
    });

    const nextRank = RANKS.find(r => r.minXP > (user.xp || 0));
    const xpToNext = nextRank ? nextRank.minXP - (user.xp || 0) : 0;

    res.json({
      xp: user.xp || 0,
      level: user.level || 1,
      rank: user.rank || 'Novato',
      streakDays: user.streakDays || 0,
      completedLessons,
      enrolledCourses,
      xpToNextRank: xpToNext,
      nextRankName: nextRank?.name || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;