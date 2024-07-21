import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { TokenizationCard } from 'src/integrations/wompi/tokenizationCard.service';
import { AcceptanceToken } from 'src/integrations/wompi/get-acceptanceToken.service';
import { PaymentSource } from 'src/integrations/wompi/create-paymentSource.service';
import { generateIntegritySignature } from 'src/helpers/crypto/integrityHash';
import { Transactions } from 'src/integrations/wompi/create-transaction.service';
import { generatePaymentReference } from 'src/helpers/crypto/paymentReference';
import { TransactionStatus } from 'src/helpers/enum/transactionStatusEnum';
import { TransactionCurrentStatus } from 'src/integrations/wompi/get-transactionStatus';
import { TransactionDetailsService } from '../transaction-details/transaction-details.service';
import { UpdateProduct } from '../products/dto/update-product.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private tokenizeCard: TokenizationCard,
    private getAcceptanceToken: AcceptanceToken,
    private paymentSource: PaymentSource,
    private transaction: Transactions,
    private paymentStatus: TransactionCurrentStatus,
    private transactionDetails: TransactionDetailsService,
    private productService: ProductsService,
  ) {}

  async createTransaction(transaction: CreateTransactionDto) {
    const transactionData = {
      status: transaction.status,
      date: transaction.date,
      baseFee: transaction.baseFee,
      deliveryFee: transaction.deliveryFee,
      total: transaction.total,
      customerID: transaction.customerID,
    };

    const productReq = {
      productQty: transaction.productQty,
      productPrice: transaction.productPrice,
      productId: transaction.productId,
    };

    const cardData = {
      number: transaction.number,
      cvc: transaction.cvc,
      exp_month: transaction.exp_month,
      exp_year: transaction.exp_year,
      card_holder: transaction.card_holder,
    };

    try {
      const createdTransaction = await this.prisma.transaction.create({
        data: transactionData,
      });

      if (!createdTransaction) {
        return {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ocurrió un error al procesar la venta.',
        };
      }

      const tokenizationResponse = await this.tokenizeCard.tonkenizateCard(
        cardData.number,
        cardData.exp_month,
        cardData.exp_year,
        cardData.cvc,
        cardData.card_holder,
      );
      const { status, data } = tokenizationResponse;
      const { id } = data;

      if (status !== 'CREATED') {
        return {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ocurrió un error al comunicarse con su banco.',
        };
      }

      try {
        const acceptanceTokenResponse =
          await this.getAcceptanceToken.getAcceptanceToken();

        const acceptance_token =
          acceptanceTokenResponse.data.presigned_acceptance.acceptance_token;

        if (!acceptance_token || acceptance_token === null) {
          return {
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Ocurrió un error al comunicarse con su banco.',
          };
        }

        const paymentSourceResponse =
          await this.paymentSource.createPaymentSource(
            transaction.customer_email,
            'CARD',
            id,
            acceptance_token,
          );

        if (!paymentSourceResponse || paymentSourceResponse === null) {
          return {
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Ocurrió un error al crear la fuente de pago.',
          };
        }

        const paymentRefence = generatePaymentReference(
          transaction.customer_email,
          Date.now(),
        );

        const signature = generateIntegritySignature(
          paymentRefence,
          transactionData.total * 100,
          'COP',
          'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp',
        );

        const paymentMethod = {
          installments: 2,
        };

        const transactionResponse = await this.transaction.createTransaction(
          transactionData.total * 100,
          'COP',
          signature,
          transaction.customer_email,
          paymentMethod,
          paymentRefence,
          paymentSourceResponse.data.id,
        );

        if (!transactionResponse) {
          return {
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Ocurrió un error al procesar su pago.',
          };
        }

        const paymentStatusResponse = await this.paymentStatus.getPaymentStatus(
          transactionResponse.data.id,
        );

        if (paymentStatusResponse.data.status === 'APPROVED') {
          var updatedTransaction = await this.update(createdTransaction.id, {
            status: TransactionStatus.APPROVED,
          });

          if (!updatedTransaction) {
            return {
              httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
              message:
                'No se pudo actualizar el estado interno de la transacción',
            };
          }

          var addTransactionsDetail = await this.transactionDetails.create({
            quantity: productReq.productQty,
            unitPrice: productReq.productPrice,
            productId: productReq.productId,
            transactionId: 2,
          });

          if (!addTransactionsDetail) {
            return {
              httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Hubo un problema al realizar la transacción',
              data: updatedTransaction,
            };
          }
        }

        const productData = await this.productService.findOne(
          addTransactionsDetail.data.createdData.productId,
        );

        if (!productData) {
          return {
            httpStatus: HttpStatus.NO_CONTENT,
            message: 'No se encontró el producto',
          };
        }

        const newStock =
          productData.stock - addTransactionsDetail.data.createdData.quantity;

        const updatedProduct = await this.productService.update(
          addTransactionsDetail.data.createdData.productId,
          {
            stock: newStock,
          },
        );

        if (!updatedProduct) {
          return {
            httpStatus: HttpStatus.NO_CONTENT,
            message: 'No se encontró el producto',
          };
        }

        return {
          httpStatus: HttpStatus.OK,
          message: 'Transacción Aprobada',
          data: updatedTransaction,
          product: productData,
        };
      } catch {
        throw new Error('No se pudo obtener el token');
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

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: { id },
      });
      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      const updatedTransaction = await this.prisma.transaction.update({
        where: { id },
        data: updateTransactionDto,
      });
      return updatedTransaction;
    } catch (error) {
      throw new Error(`Error updating transaction: ${error.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
