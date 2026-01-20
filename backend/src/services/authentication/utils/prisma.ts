import { PrismaClient } from '@prisma/client';

// Simple Prisma client instantiation
// TODO: Consider a singleton pattern if needed for multi-service context
export const prisma = new PrismaClient();
