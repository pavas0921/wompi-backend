import {
  IsNumber,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsDateString,
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
  @IsInt()
  customerID: number;
}
