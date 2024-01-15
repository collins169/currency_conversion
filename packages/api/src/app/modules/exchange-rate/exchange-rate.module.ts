import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { PrismaService } from 'src/database/prisma.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { CurrencyService } from '../currency/currency.service';

@Module({
  providers: [ExchangeRateService, PrismaService, CurrencyService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
