import {
  IsNumber,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsDateString,
  IsString,
  IsEmail,
} from 'class-validator';

export class CreateTransactionDetailDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  transactionId: number;
}
