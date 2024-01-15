import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  Balance as BalanceModel,
  Transaction as TransactionModel,
} from '@prisma/client';
import { TransactionService } from './transaction.service';
import { ConvertPayload } from 'src/app/dto/request/convert.dto';
import { PaginatedResponse } from 'src/app/dto/response/paginated-response.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/')
  async transfer(@Body() payload: ConvertPayload): Promise<BalanceModel> {
    return this.transactionService.fundWallet(payload);
  }

  @Get('/:referenceNo')
  async getTransactionByReferenceNo(
    @Param('referenceNo') referenceNo: string,
  ): Promise<TransactionModel[]> {
    const transactions =
      await this.transactionService.findTransactionByReferenceNo(referenceNo);

    if (!transactions.length) {
      throw new NotFoundException(
        'could not find any transaction with specified reference number',
      );
    }

    return transactions;
  }

  @Get('/wallet/:walletId')
  async getWalletTransactions(
    @Param('walletId') walletId: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<PaginatedResponse<TransactionModel>> {
    const total = await this.transactionService.count({
      where: {
        walletId,
      },
    });
    const results = await this.transactionService.getTransactionByWallet(
      walletId,
      limit ?? 10,
      page,
    );

    return {
      limit,
      page,
      total: results.length,
      totalPage: Math.ceil(total / (limit ?? 10)),
      results,
    };
  }
}
