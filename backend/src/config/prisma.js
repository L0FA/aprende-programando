import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const isProduction = process.env.NODE_ENV === 'production' || process.env.TURSO_URL;

let prisma;

if (isProduction && process.env.TURSO_URL) {
  const libsql = createClient({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const adapter = new PrismaLibSql(libsql);
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

export { prisma };
