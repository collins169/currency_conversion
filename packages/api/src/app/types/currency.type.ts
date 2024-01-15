const allowedCurrencies = ['USD', 'EUR', 'GHS', 'NGN', 'KES'] as const;

export type Currency = (typeof allowedCurrencies)[number];
