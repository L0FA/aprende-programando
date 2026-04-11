import { PrismaClient } from '@prisma/client';

let prisma;

async function createPrismaClient() {
  if (process.env.NODE_ENV === 'production' && process.env.TURSO_URL) {
    const { PrismaLibSql } = await import('@prisma/adapter-libsql');
    const { createClient } = await import('@libsql/client');
    const libsql = createClient({ url: process.env.TURSO_URL });
    const adapter = new PrismaLibSql(libsql);
    return new PrismaClient({ adapter });
  }
  return new PrismaClient();
}

prisma = await createPrismaClient();

export { prisma };
