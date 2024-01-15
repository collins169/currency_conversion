import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/database/prisma.service';
import { TransactionController } from './transaction.controller';
import { WalletService } from '../wallet/wallet.service';

@Module({
  providers: [TransactionService, PrismaService, WalletService],
  controllers: [TransactionController],
})
export class TransactionModule {}
