import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
    }

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV === "development") globalThis.prisma = db;

// We have added this code to the lib/db.ts file. This code is responsible for creating a new PrismaClient instance and exporting it as db. We also added a check to see if the prisma global variable is already defined. If it is not defined, we assign the db instance to it. This way, we can reuse the same PrismaClient instance across the application.