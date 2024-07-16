import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ProductsModule, CustomerModule],
})
export class AppModule {}
