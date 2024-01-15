import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { CurrencyService } from '../currency/currency.service';
import { GetRateParams } from 'src/app/dto/request/getRate.dto';
import { CompareRate, Rate } from 'src/app/types/exchange-rate.type';
import {
  Currency as CurrencyModel,
  ExchangeRate as ExchangeRateModel,
} from '@prisma/client';
import { Currency } from 'src/app/types/currency.type';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    private readonly currencyService: CurrencyService,
  ) {}

  @Get('/')
  async getRates(): Promise<Rate[]> {
    const currencies = await this.currencyService.currencies({});

    const exchangeRates = await this.exchangeRateService.getExchangeRates({});

    // transforming data to match the type Rate
    const rates: Rate[] = await Promise.all(
      currencies.map(async ({ code }: CurrencyModel) => {
        // Transforming data to match format
        // 		rates: {
        // 				GHS: 3.672538,
        // 		}
        const transformedData = exchangeRates
          .filter(
            ({ fromCurrencyCode }: ExchangeRateModel) =>
              fromCurrencyCode.toUpperCase() === code.toUpperCase(),
          )
          .reduce(
            (
              accumulator: Record<Currency, number>,
              exchangeRate: ExchangeRateModel,
            ) => {
              accumulator[exchangeRate.toCurrencyCode] =
                exchangeRate.rate.toNumber();
              return accumulator;
            },
            {} as Record<Currency, number>,
          );

        return {
          base: code,
          rates: transformedData,
        };
      }),
    );

    return rates;
  }

  @Get('/:from/:to')
  async getRate(@Param() { from, to }: GetRateParams): Promise<CompareRate> {
    const fromCurrency = await this.currencyService.currency({
      code: from.toUpperCase(),
    });

    if (!fromCurrency) {
      throw new NotFoundException(`Currency ${from} does not exist`);
    }

    const toCurrency = await this.currencyService.currency({
      code: to.toUpperCase(),
    });

    if (!toCurrency) {
      throw new NotFoundException(`Currency ${to} does not exist`);
    }

    if (from === to) {
      return {
        buy: 1,
        sell: 1,
      };
    }

    const [buyRate, sellRate] = await Promise.all([
      this.exchangeRateService.getRate(from, to),
      this.exchangeRateService.getRate(to, from),
    ]);

    return {
      buy: buyRate.rate
        .toDecimalPlaces(toCurrency.decimalPlaces.valueOf())
        .toNumber(),
      sell: sellRate.rate
        .toDecimalPlaces(toCurrency.decimalPlaces.valueOf())
        .toNumber(),
    };
  }
}
