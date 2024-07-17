// src/integrations/integrations.module.ts

import { Module } from '@nestjs/common';
import { TokenizationCard } from './wompi/tokenizationCard.service';
import { AcceptanceToken } from './wompi/get-acceptanceToken.service';

@Module({
  providers: [TokenizationCard, AcceptanceToken],
  exports: [TokenizationCard, AcceptanceToken],
})
export class IntegrationsModule {}
