
export const currencies = ['USD', 'EUR', 'GHS', 'NGN', 'KES']  as const;

export type Currency = typeof currencies[number];