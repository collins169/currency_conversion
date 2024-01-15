import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Currency as CurrencyModel } from '@prisma/client';
import { FindOneParams } from 'src/app/dto/request/findCurrency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/:code')
  async getCurrencyByCode(
    @Param() params: FindOneParams,
  ): Promise<CurrencyModel> {
    const currency = await this.currencyService.currency({
      code: params.code.toUpperCase(),
    });

    if (!currency) {
      throw new NotFoundException(
        `currency with code ${params.code} not found`,
      );
    }

    return currency;
  }

  @Get('/')
  async getCurrencies(): Promise<CurrencyModel[]> {
    return this.currencyService.currencies({});
  }
}
