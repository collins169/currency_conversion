import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ExchangeRate, Prisma } from '@prisma/client';

@Injectable()
export class ExchangeRateService {
  constructor(private prisma: PrismaService) {}

  async getRate(from: string, to: string): Promise<ExchangeRate | null> {
    return this.prisma.exchangeRate.findUnique({
      where: {
        fromCurrencyCode_toCurrencyCode: {
          fromCurrencyCode: from.toUpperCase(),
          toCurrencyCode: to.toUpperCase(),
        },
      },
    });
  }

  async getExchangeRates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ExchangeRateWhereUniqueInput;
    where?: Prisma.ExchangeRateWhereInput;
    orderBy?: Prisma.ExchangeRateOrderByWithRelationInput;
  }): Promise<ExchangeRate[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.exchangeRate.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async groupExchangeRates() {
    return this.prisma.exchangeRate.groupBy({
      by: ['fromCurrencyCode'],
      orderBy: {
        fromCurrencyCode: 'asc',
      },
    });
  }

  async createExchange(
    data: Prisma.ExchangeRateCreateInput,
  ): Promise<ExchangeRate> {
    return this.prisma.exchangeRate.create({
      data,
    });
  }

  async updateExchangeRate(params: {
    where: Prisma.ExchangeRateWhereUniqueInput;
    data: Prisma.ExchangeRateUpdateInput;
  }): Promise<ExchangeRate> {
    const { where, data } = params;
    return this.prisma.exchangeRate.update({
      data,
      where,
    });
  }

  async deleteExchangeRate(
    where: Prisma.ExchangeRateWhereUniqueInput,
  ): Promise<ExchangeRate> {
    return this.prisma.exchangeRate.delete({
      where,
    });
  }
}
