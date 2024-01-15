import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  Transaction,
  Balance,
  TransactionType,
  TransactionStatus,
  Prisma,
} from '@prisma/client';
import { FundWalletType } from 'src/app/types/wallet.type';
import { WalletService } from '../wallet/wallet.service';
import moment from 'moment';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  async transaction(
    transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput,
  ): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: transactionWhereUniqueInput,
      include: {
        currency: true,
        wallet: true,
      },
    });
  }

  async count(
    transactionCountArgs: Prisma.TransactionCountArgs,
  ): Promise<number> {
    return this.prisma.transaction.count(transactionCountArgs);
  }

  async transactions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TransactionWhereUniqueInput;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput;
  }): Promise<Transaction[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.transaction.findMany({
      skip: Number(skip),
      take: Number(take),
      cursor,
      where,
      orderBy,
      include: {
        currency: true,
        wallet: true,
      },
    });
  }

  async findTransactionByReferenceNo(
    referenceNo: string,
  ): Promise<Transaction[]> {
    return this.transactions({
      where: {
        referenceNo,
      },
    });
  }

  async getTransactionByWallet(
    walletId: string,
    limit?: number,
    page?: number,
  ): Promise<Transaction[]> {
    return this.transactions({
      where: {
        walletId,
      },
      skip: (limit ?? 10) * (page ?? 0),
      take: limit ?? 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async fundWallet({
    senderWalletId,
    recipientWalletId,
    amount,
    fee,
    narration,
  }: FundWalletType): Promise<Balance> {
    // Check wallets if they exist
    const [sender, receiver] = await Promise.all([
      this.walletService.wallet({
        id: senderWalletId,
      }),
      this.walletService.wallet({
        id: recipientWalletId,
      }),
    ]);

    if (!sender) {
      throw new NotFoundException('The sender wallet does not exist');
    }

    if (!receiver) {
      throw new NotFoundException('The receiver wallet does not exist');
    }

    // calculate total amount (txn amount * fee)
    const totalAmount = amount * fee ?? 1;

    // Generate Transaction Reference
    // formula - WW + timestamp + currency
    const referenceNo = `WW${moment().format('DMMYYYY-h:mm:ss')}${sender.currencyCode}-${receiver.currencyCode}`;

    // Inserting a pending record, to keep track of all the transfer state
    await this.prisma.transaction.createMany({
      data: [
        {
          walletId: senderWalletId,
          amount,
          fee,
          currencyCode: sender.currencyCode,
          referenceNo,
          description:
            narration ??
            `Trxn From ${senderWalletId.substring(5)} - ${recipientWalletId.substring(5)}`,
          transactionType: TransactionType.DEBIT,
          status: TransactionStatus.COMPLETED,
        },
        {
          walletId: recipientWalletId,
          amount,
          fee,
          currencyCode: receiver.currencyCode,
          referenceNo,
          description:
            narration ??
            `Trxn From ${senderWalletId.substring(5)} - ${recipientWalletId.substring(5)}`,
          transactionType: TransactionType.CREDIT,
          status: TransactionStatus.COMPLETED,
        },
      ],
    });

    return this.prisma.$transaction(async (tx) => {
      // 1. Decrement amount from the sender.
      const sender = await tx.balance.update({
        data: {
          available: {
            decrement: totalAmount,
          },
          book: {
            decrement: totalAmount,
          },
        },
        where: {
          walletId: senderWalletId,
        },
        include: {
          wallet: true,
        },
      });

      // 2. Verify that the sender's balance didn't go below zero.
      if (sender.available.lessThan(0)) {
        await this.prisma.transaction.updateMany({
          where: {
            referenceNo,
          },
          data: {
            status: TransactionStatus.FAILED,
          },
        });
        throw new Error(
          `${senderWalletId} doesn't have enough to send ${totalAmount}`,
        );
      }

      // 3. Increment the recipient's balance by amount
      const recipient = await tx.balance.update({
        data: {
          available: {
            decrement: totalAmount,
          },
          book: {
            decrement: totalAmount,
          },
        },
        where: {
          walletId: recipientWalletId,
        },
        include: {
          wallet: true,
        },
      });

      // 4. Update transaction record to completed
      await this.prisma.transaction.updateMany({
        where: {
          referenceNo,
        },
        data: {
          status: TransactionStatus.COMPLETED,
        },
      });

      return recipient;
    });
  }
}
