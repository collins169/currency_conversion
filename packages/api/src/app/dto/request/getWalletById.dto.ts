import { IsUUID } from 'class-validator';

export class GetWalletParams {
  @IsUUID()
  id: string;
}
