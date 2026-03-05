import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL_TCP || process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error('DATABASE_URL or DATABASE_URL_TCP is required');
  }
  
  // If URL starts with prisma+postgres, it's Prisma Accelerate
  if (dbUrl.startsWith('prisma+postgres://')) {
    return new PrismaClient({
      accelerateUrl: dbUrl,
    });
  }
  
  // Otherwise use pg adapter for direct connection
  const pool = new pg.Pool({ connectionString: dbUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
