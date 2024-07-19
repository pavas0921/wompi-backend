import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { IntegrationsModule } from 'src/integrations/integrations.module';
import { TransactionDetailsModule } from '../transaction-details/transaction-details.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [IntegrationsModule, TransactionDetailsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, ProductsService],
})
export class TransactionsModule {}
