import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const password = "ammafans2026";
  const hashedPassword = await argon2.hash(password);

  const admin = await prisma.admin.upsert({
    where: { username: 'sugham' },
    update: {
      passwordHash: hashedPassword,
    },
    create: {
      username: 'sugham',
      passwordHash: hashedPassword,
      role: 'superadmin',
    },
  });

  console.log(`Admin user created/updated with username: ${admin.username}`);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
