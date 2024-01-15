import { IsString, MinLength, MaxLength } from 'class-validator';

export class FindOneParams {
  @IsString()
  @MinLength(3, { message: 'From Currency code must be 3 digits' })
  @MaxLength(3, { message: 'From Currency code must be 3 digits' })
  code: string;
}
