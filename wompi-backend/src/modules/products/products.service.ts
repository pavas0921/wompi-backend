import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProduct } from './dto/createProductDTO'; // Asegúrate de que la ruta sea correcta
import { UpdateProduct } from './dto/update-product.dto';

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

  async update(id: number, productToUpdate: UpdateProduct) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          stock: productToUpdate.stock,
        },
      });
      if (!updatedProduct) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating transaction: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const productData = await this.prisma.product.findUnique({
        where: { id },
      });
      if (productData) {
        return productData;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
