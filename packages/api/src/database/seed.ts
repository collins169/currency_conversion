import { PrismaClient } from '@prisma/client';
import { seedCurrency } from './seed/currency.seed';
import { seedExchangeRate } from './seed/exchange-rate.seed';
import { seedWallet } from './seed/wallet.seed';
const prisma = new PrismaClient();

Promise.all([
  seedCurrency(prisma),
  seedExchangeRate(prisma),
  seedWallet(prisma),
])
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
