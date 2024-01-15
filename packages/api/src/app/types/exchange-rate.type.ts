import { Currency } from './currency.type';

export type Rate = {
  base: string;
  rates: Record<Currency, number>;
};

export type CompareRate = {
  buy: number;
  sell: number;
};
