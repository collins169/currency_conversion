import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

export const seedWallet = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, any>,
) => {
  const wallets = [
    {
      code: 'USD',
      balance: {
        available: 250000,
        book: 250000,
      },
    },
    {
      code: 'EUR',
      balance: {
        available: 2000,
        book: 2000,
      },
    },
    {
      code: 'GHS',
      balance: {
        available: 10000,
        book: 10000,
      },
    },
    {
      code: 'NGN',
      balance: {
        available: 200000,
        book: 200000,
      },
    },
    {
      code: 'KES',
      balance: {
        available: 200000,
        book: 200000,
      },
    },
  ] as const;

  type Wallet = (typeof wallets)[number];

  await Promise.all(
    wallets.map(async ({ code, balance }: Wallet) => {
      const ownerId = uuid();
      const wallet = await prisma.wallet.upsert({
        where: {
          ownerId_currencyCode: {
            currencyCode: code,
            ownerId,
          },
        },
        update: {},
        create: {
          currencyCode: code,
          ownerId,
        },
      });
      return await prisma.balance.upsert({
        where: {
          walletId: wallet.id,
        },
        update: {},
        create: {
          walletId: wallet.id,
          available: balance.available,
          book: balance.book,
        },
      });
    }),
  );
  console.log('Wallets and Balances Seeding completed');
};
