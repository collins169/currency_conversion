import { Controller, Param, Get, NotFoundException } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GetWalletParams } from 'src/app/dto/request/getWalletById.dto';
import { Wallet as WalletModel } from '@prisma/client';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/')
  async getWallets(): Promise<WalletModel[]> {
    return this.walletService.wallets({});
  }

  @Get('/:id')
  async getWalletById(@Param() { id }: GetWalletParams): Promise<WalletModel> {
    const wallet = await this.walletService.wallet({
      id,
    });

    if (!wallet) {
      throw new NotFoundException('Wallet was not found');
    }

    return wallet;
  }
}
