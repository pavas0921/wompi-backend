import { Module } from '@nestjs/common';
import { TransactionDetailsService } from './transaction-details.service';
import { TransactionDetailsController } from './transaction-details.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [TransactionDetailsService],
  controllers: [TransactionDetailsController],
  providers: [TransactionDetailsService, PrismaService],
})
export class TransactionDetailsModule {}
