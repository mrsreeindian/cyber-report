import { prisma } from '../src/lib/prisma';
async function main() {
  const admins = await prisma.admin.findMany();
  console.log(admins);
}
main().finally(() => process.exit(0));
