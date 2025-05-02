import { PrismaClient, Role } from '@prisma/client';
import { hashSync } from 'bcrypt';

async function main() {
  try {
    const prisma = new PrismaClient();
    // Seed admin user
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      const user = {
        email: 'rh@rh.mg',
        password: hashSync('password', 10),
        name: 'RH 1',
        role: Role.RH,
      };
      await prisma.user.create({
        data: user,
      });
    }

    console.log('Seed finished successfuly !');
  } catch (error) {
    console.log(error);
  }
}
main();
