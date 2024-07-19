import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TransactionDetailsModule } from './modules/transaction-details/transaction-details.module';

@Module({
  imports: [ProductsModule, CustomerModule, TransactionsModule, TransactionDetailsModule],
})
export class AppModule {}
