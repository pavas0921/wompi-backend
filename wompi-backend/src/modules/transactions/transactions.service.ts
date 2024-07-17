import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { TokenizationCard } from 'src/integrations/wompi/tokenizationCard.service';
import { AcceptanceToken } from 'src/integrations/wompi/get-acceptanceToken.service';
import { PaymentSource } from 'src/integrations/wompi/create-paymentSource.service';
import { generateIntegritySignature } from 'src/helpers/crypto/integrityHash';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private tokenizeCard: TokenizationCard,
    private getAcceptanceToken: AcceptanceToken,
    private paymentSource: PaymentSource,
  ) {}

  async createTransaction(transaction: CreateTransactionDto) {
    try {
      const createdTransaction = await this.prisma.transaction.create({
        data: transaction,
      });
      if (createdTransaction) {
        const tokenizationResponse = await this.tokenizeCard.tonkenizateCard(
          '4242424242424242',
          '06',
          '29',
          '123',
          'Pedro Perez',
        );
        const { status, data } = tokenizationResponse;
        const { id } = data;
        if (status === 'CREATED') {
          try {
            const acceptanceTokenResponse =
              await this.getAcceptanceToken.getAcceptanceToken();
            const acceptance_token =
              acceptanceTokenResponse.data.presigned_acceptance
                .acceptance_token;
            if (acceptance_token && acceptance_token !== null) {
              const paymentSourceResponse =
                await this.paymentSource.createPaymentSource(
                  'test@correo.com',
                  'CARD',
                  id,
                  acceptance_token,
                );
              if (paymentSourceResponse && paymentSourceResponse !== null) {
                const signature = generateIntegritySignature(
                  'sJK4489dDjkd390ds02',
                  4990000,
                  'COP',
                  'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp',
                );
                console.log(signature);
              }
            }
          } catch {
            throw new Error('No se pudo obtener el token');
          }
        }
        return tokenizationResponse;
      } else {
        throw new Error('No se pudo crear la transacción');
      }
    } catch (error) {
      throw new Error(`Error al crear la transacción: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
