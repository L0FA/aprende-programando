# Aprende Programando

Plataforma gratuita para aprender programación desde cero.

## 🚀 Características

- **Cursos gratis** de programación (Frontend, Backend, Videojuegos, Frameworks)
- **Lecciones interactivas** con sistema de progreso
- **XP y niveles** - Ganas XP completando lecciones
- **Ranks** - Subí de "Novato" a "Legend" mientras aprendés
- **Guía personalizada** - Quiz interactivo para sugerirte cursos

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Backend**: Express, Prisma, SQLite (dev) / Turso (prod)
- **Autenticación**: JWT, bcrypt

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🏃 Cómo correrlo

### Desarrollo

```bash
# Frontend
cd frontend
npm install
npm run dev
# -> http://localhost:3000

# Backend
cd backend
npm install
npm run db:push    # Crear database
npm run db:seed    # Seedear datos iniciales
npm run dev
# -> http://localhost:3001
```

### Producción

```bash
# Frontend build
cd frontend
npm run build
npm start

# Backend
cd backend
npm run build
npm start
```

## 📁 Estructura

```
aprende-programando/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/      # Pages (routes)
│   │   ├── components/
│   │   ├── lib/      # Helpers API
│   │   └── styles/
│   └── package.json
│
├── backend/          # Express API
│   ├── src/
│   │   ├── config/
│   │   └── routes/   # API endpoints
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── package.json
│
└── README.md
```

## 🔗 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/courses` | Listar cursos |
| GET | `/api/courses/:slug` | Ver curso |
| GET | `/api/categories` | Listar categorías |
| GET | `/api/lessons/:slug` | Ver lección |
| POST | `/api/auth/register` | Registrarse |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/progress/complete` | Completar lección |
| GET | `/api/progress` | Ver progreso usuario |

## 🎮 Cómo funciona el XP

- +10 XP por lección completada
- Niveles cada 100 XP
- **Ranks**:
  - Novato (0-99 XP)
  - Principiante (100-299 XP)
  - Intermedio (300-599 XP)
  - Avanzado (600-999 XP)
  - Extreme (1000+ XP)
  - Legend (5000+ XP)

## 📝 Licencia

MIT# aprende-programando
