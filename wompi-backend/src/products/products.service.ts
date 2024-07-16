import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createProductDTO } from './dto/createProductDTO';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  createProduct(product: createProductDTO) {
    return this.prisma.product.create({ data: product });
  }
}
