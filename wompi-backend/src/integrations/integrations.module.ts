// src/integrations/integrations.module.ts

import { Module } from '@nestjs/common';
import { TokenizationCard } from './wompi/tokenizationCard.service';

@Module({
  providers: [TokenizationCard],
  exports: [TokenizationCard],
})
export class IntegrationsModule {}
