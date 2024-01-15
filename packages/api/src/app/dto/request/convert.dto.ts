import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsPositive,
  IsNumber,
} from 'class-validator';

export class ConvertPayload {
  @IsUUID()
  senderWalletId: string;

  @IsUUID()
  recipientWalletId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  fee?: number;

  @IsString()
  @MinLength(3, { message: 'From Currency code must be 3 digits' })
  @MaxLength(3, { message: 'From Currency code must be 3 digits' })
  currency?: string;

  @IsString()
  narration?: string;
}
