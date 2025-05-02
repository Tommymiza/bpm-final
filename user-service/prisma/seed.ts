import { PrismaClient, Role } from '@prisma/client';
import { hashSync } from 'bcrypt';

async function main() {
  try {
    const prisma = new PrismaClient();
    // Seed admin user
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      const user = {
        email: 'admin@rh.mg',
        password: hashSync('password', 10),
        name: 'Admin EKAR',
        role: Role.CLIENT,
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
