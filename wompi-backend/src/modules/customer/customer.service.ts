import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { registerCustomerDTO } from './dto/registerCustomerDTO';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  registerCustomer(customer: registerCustomerDTO) {
    return this.prisma.customer.create({ data: customer });
  }
}
