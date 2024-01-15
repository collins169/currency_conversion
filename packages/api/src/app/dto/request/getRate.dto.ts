import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetRateParams {
  @IsString()
  @MinLength(3, { message: 'From Currency code must be 3 digits' })
  @MaxLength(3, { message: 'From Currency code must be 3 digits' })
  from: string;

  @IsString()
  @MinLength(3, { message: 'From Currency code must be 3 digits' })
  @MaxLength(3, { message: 'From Currency code must be 3 digits' })
  to: string;
}
