import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { registerCustomerDTO } from './dto/registerCustomerDTO';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('/')
  registerCustomer(@Body() customer: registerCustomerDTO) {
    return this.customerService.registerCustomer(customer);
  }
}
