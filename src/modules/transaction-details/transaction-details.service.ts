import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateTransactionDetailDto } from './dto/create-transaction-detail.dto';
import { UpdateTransactionDetailDto } from './dto/update-transaction-detail.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class TransactionDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(transactionDetail: CreateTransactionDetailDto) {
    try {
      const createdData = await this.prisma.transactionDetail.create({
        data: transactionDetail,
      });
      if (createdData) {
        return {
          httpStatus: HttpStatus.CREATED,
          message: 'Detalle de transacción registrado con exito',
          data: { createdData },
        };
      }
    } catch (error) {
      throw new Error(`Error updating transaction: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all transactionDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionDetail`;
  }

  update(id: number, updateTransactionDetailDto: UpdateTransactionDetailDto) {
    return `This action updates a #${id} transactionDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionDetail`;
  }
}
