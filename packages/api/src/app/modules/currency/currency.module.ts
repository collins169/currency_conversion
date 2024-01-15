import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [PrismaService, CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
