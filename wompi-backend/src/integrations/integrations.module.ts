// src/integrations/integrations.module.ts

import { Module } from '@nestjs/common';
import { TokenizationCard } from './wompi/tokenizationCard.service';
import { AcceptanceToken } from './wompi/get-acceptanceToken.service';
import { PaymentSource } from './wompi/create-paymentSource.service';

@Module({
  providers: [TokenizationCard, AcceptanceToken, PaymentSource],
  exports: [TokenizationCard, AcceptanceToken, PaymentSource],
})
export class IntegrationsModule {}
