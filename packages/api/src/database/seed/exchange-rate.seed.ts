import { PrismaClient, Prisma } from '@prisma/client';

export const seedExchangeRate = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, any>,
) => {
  const rates = [
    { from: 'USD', to: 'EUR', rate: 0.9128 },
    { from: 'USD', to: 'GHS', rate: 11.9636 },
    { from: 'USD', to: 'KES', rate: 158.4015 },
    { from: 'USD', to: 'NGN', rate: 958.2538 },
    { from: 'EUR', to: 'GHS', rate: 13.0998 },
    { from: 'EUR', to: 'KES', rate: 173.5896 },
    { from: 'EUR', to: 'NGN', rate: 1049.7351 },
    { from: 'EUR', to: 'USD', rate: 1.0955 },
    { from: 'GHS', to: 'EUR', rate: 0.0764 },
    { from: 'GHS', to: 'KES', rate: 13.2608 },
    { from: 'GHS', to: 'NGN', rate: 80.0855 },
    { from: 'GHS', to: 'USD', rate: 0.0836 },
    { from: 'KES', to: 'EUR', rate: 0.0058 },
    { from: 'KES', to: 'GHS', rate: 0.0755 },
    { from: 'KES', to: 'NGN', rate: 6.0512 },
    { from: 'KES', to: 'USD', rate: 0.0063 },
    { from: 'NGN', to: 'EUR', rate: 0.0011 },
    { from: 'NGN', to: 'GHS', rate: 0.0125 },
    { from: 'NGN', to: 'KES', rate: 0.1653 },
    { from: 'NGN', to: 'USD', rate: 0.0011 },
  ] as const;

  type Rate = (typeof rates)[number];

  await Promise.all(
    rates.map(async ({ from, to, rate }: Rate) => {
      return await prisma.exchangeRate.upsert({
        where: {
          fromCurrencyCode_toCurrencyCode: {
            fromCurrencyCode: from as string,
            toCurrencyCode: to as string,
          },
        },
        update: {},
        create: {
          fromCurrencyCode: from,
          toCurrencyCode: to,
          rate,
        },
      });
    }),
  );
  console.log('Exchange Rates Seeding completed');
};
