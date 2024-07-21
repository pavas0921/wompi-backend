import {
  IsNumber,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsDateString,
  IsString,
  IsEmail,
} from 'class-validator';
import { TransactionStatus } from 'src/helpers/enum/transactionStatusEnum';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  baseFee: number;

  @IsNotEmpty()
  @IsNumber()
  deliveryFee: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsInt()
  customerID: number;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsNotEmpty()
  @IsString()
  exp_month: string;

  @IsNotEmpty()
  @IsString()
  exp_year: string;

  @IsNotEmpty()
  @IsString()
  card_holder: string;

  @IsEmail()
  @IsNotEmpty()
  customer_email: string;

  @IsNotEmpty()
  @IsNumber()
  productQty: number;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
