// src/integrations/integrations.module.ts

import { Module } from '@nestjs/common';
import { TokenizationCard } from './wompi/tokenizationCard.service';
import { AcceptanceToken } from './wompi/get-acceptanceToken.service';
import { PaymentSource } from './wompi/create-paymentSource.service';
import { Transactions } from './wompi/create-transaction.service';

@Module({
  providers: [TokenizationCard, AcceptanceToken, PaymentSource, Transactions],
  exports: [TokenizationCard, AcceptanceToken, PaymentSource, Transactions],
})
export class IntegrationsModule {}
