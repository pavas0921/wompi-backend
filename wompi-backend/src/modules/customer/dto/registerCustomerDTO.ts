import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class registerCustomerDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  identification: string;
}
