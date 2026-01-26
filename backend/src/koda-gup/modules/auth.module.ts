import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

@Module({
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
