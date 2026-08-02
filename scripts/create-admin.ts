import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  console.log("--- Secure Admin Setup ---");
  rl.question("Enter new username: ", async (username) => {
    rl.question("Enter new password: ", async (password) => {
      const hashedPassword = await argon2.hash(password);
      
      const admin = await prisma.admin.create({
        data: {
          username,
          passwordHash: hashedPassword,
          role: 'superadmin'
        }
      });
      console.log(`Admin account '${username}' created successfully.`);
      console.log(`You can set up 2FA for this account later inside the dashboard.`);
      
      await prisma.$disconnect();
      rl.close();
    });
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
