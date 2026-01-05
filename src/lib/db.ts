// src/lib/db.ts

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // İstersen SQL sorgularını terminalde görmek için bunu açabilirsin
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;