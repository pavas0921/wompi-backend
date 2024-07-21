import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
