import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(transaction: CreateTransactionDto) {
    try {
      const createdTransaction = await this.prisma.transaction.create({
        data: transaction,
      });
      if (createdTransaction) {
        return createdTransaction; // Retorna el objeto de transacción creado
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
