// src/integrations/integrations.module.ts

import { Module } from '@nestjs/common';
import { TokenizationCard } from './wompi/tokenizationCard.service';
import { AcceptanceToken } from './wompi/get-acceptanceToken.service';
import { PaymentSource } from './wompi/create-paymentSource.service';
import { Transactions } from './wompi/create-transaction.service';
import { TransactionCurrentStatus } from './wompi/get-transactionStatus';

@Module({
  providers: [
    TokenizationCard,
    AcceptanceToken,
    PaymentSource,
    Transactions,
    TransactionCurrentStatus,
  ],
  exports: [
    TokenizationCard,
    AcceptanceToken,
    PaymentSource,
    Transactions,
    TransactionCurrentStatus,
  ],
})
export class IntegrationsModule {}
