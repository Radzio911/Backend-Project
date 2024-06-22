import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
prisma.$executeRaw`DROP DATABASE db;`;
