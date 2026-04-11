import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

import categoryRoutes from './routes/category.routes.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import { router as authRoutes } from './routes/auth.routes.js';

const app = express();

// Use Turso adapter in production, local SQLite in development
let prisma;
if (process.env.NODE_ENV === 'production' && process.env.TURSO_URL) {
  const { PrismaLibSql } = await import('@prisma/adapter-libsql');
  const { createClient } = await import('@libsql/client');
  const libsql = createClient({ url: process.env.TURSO_URL });
  const adapter = new PrismaLibSql(libsql);
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/auth', authRoutes);

const progressRoutes = (await import('./routes/progress.routes.js')).default;
app.use('/api/progress', progressRoutes);

const ENABLE_ADMIN = process.env.ENABLE_ADMIN === 'true';
if (ENABLE_ADMIN) {
  const adminRoutes = (await import('./routes/admin.routes.js')).default;
  app.use('/api/admin', adminRoutes);
  console.log('✅ Panel Admin habilitado');
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));

export { app, prisma };