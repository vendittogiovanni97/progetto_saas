import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
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
