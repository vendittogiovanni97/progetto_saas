import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL || 'mysql://root:root123@localhost:3306/koda_core_dev';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

export default async function initializePrisma(): Promise<void> {
  try {
    // Test connessione
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Prisma connesso con successo');
  } catch (error: any) {
    console.error('❌ Errore di connessione Prisma:', error.message);
    process.exit(1);
  }
}
