import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log("Postgres is ready to use");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
}

checkConnection();

export { prisma };
