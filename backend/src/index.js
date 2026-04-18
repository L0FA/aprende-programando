import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { prisma } from './config/prisma.js';
import categoryRoutes from './routes/category.routes.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import { router as authRoutes } from './routes/auth.routes.js';

const app = express();

// Security & Optimization
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', 
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Demasiadas peticiones, por favor intenta más tarde.' }
});

// Apply rate limit to auth routes
app.use('/api/auth/login', limiter);
app.use('/api/auth/register', limiter);

app.use(morgan('dev'));
app.use(express.json());

// Routes
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
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({ 
    error: isProd ? 'Algo salió mal en el servidor' : err.message,
    ...(isProd ? {} : { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API en puerto ${PORT} (${process.env.NODE_ENV || 'dev'})`));

export { app, prisma };