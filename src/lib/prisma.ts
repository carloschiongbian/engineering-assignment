import { PrismaClient } from '@prisma/client'

// Next.js dev server hot-reloads server modules; without a singleton we'd leak
// a new PrismaClient (and its DB connection pool) on every reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
