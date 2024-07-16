import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [ProductsModule, CustomerModule, TransactionsModule],
})
export class AppModule {}
