import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient({ 
  log: ["warn", "error"]
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;