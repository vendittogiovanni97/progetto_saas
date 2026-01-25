import { PrismaClient } from "@prisma/client";
import { InternalServerError } from "elysia";

const prisma = new PrismaClient();

export class IamService {
  // REGISTRAZIONE
  async register(data: any) {
    const hashedPassword = await Bun.password.hash(data.password);

    if (!hashedPassword)
      throw new InternalServerError("Errore durante la creazione utente");

    return await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: "USER",
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }

  // LOGIN
  async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) return null;

    const isMatch = await Bun.password.verify(data.password, user.password);
    if (!isMatch) return null;

    // Ritorna l'utente senza password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
