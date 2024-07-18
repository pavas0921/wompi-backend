import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProduct } from './dto/createProductDTO'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct(product: CreateProduct) {
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          productName: product.productName,
          price: product.price,
          stock: product.stock,
          description: product.description,
        },
      });
      return createdProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }
}
