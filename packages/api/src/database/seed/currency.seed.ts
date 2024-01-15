import { PrismaClient, Prisma } from '@prisma/client';

export const seedCurrency = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, any>,
) => {
  const currencies = [
    { code: 'USD', name: 'US Dollars', symbol: '$', country: 'US' },
    { code: 'EUR', name: 'European Union', symbol: '€', country: 'EU' },
    { code: 'GHS', name: 'Ghana Cedis', symbol: 'GH₵', country: 'GH' },
    { code: 'NGN', name: 'Nigeria Naira', symbol: '₦', country: 'NG' },
    { code: 'KES', name: 'Kenya Shillings', symbol: 'KES', country: 'KE' },
  ] as const;

  type Currency = (typeof currencies)[number];

  await Promise.all(
    currencies.map(async ({ code, name, symbol, country }: Currency) => {
      return await prisma.currency.upsert({
        where: { code },
        update: {},
        create: {
          code,
          name,
          symbol,
          countryCode: country,
        },
      });
    }),
  );
  console.log('Currency Seeding completed');
};
