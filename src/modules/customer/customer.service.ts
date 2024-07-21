import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { registerCustomerDTO } from './dto/registerCustomerDTO';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async registerCustomer(customer: registerCustomerDTO) {
    const createdCustomer = await this.prisma.customer.create({
      data: customer,
    });
    if (createdCustomer) {
      return {
        statusCode: HttpStatus.CREATED,
        data: createdCustomer,
        message: 'Customer created',
      };
    }
    return this.prisma.customer.create({ data: customer });
  }
}
