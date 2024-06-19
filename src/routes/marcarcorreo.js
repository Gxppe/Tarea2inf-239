import Elysia from "elysia";
import { PrismaClient } from '@prisma/client';

const api = new Elysia();
const  prisma = new PrismaClient();