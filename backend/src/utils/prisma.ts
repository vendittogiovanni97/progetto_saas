// src/utils/prisma.ts
import dotenv from "dotenv";
dotenv.config();  // carica .env

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
