import { Body, Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './dto/createProductDTO';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async getAllProducts() {
    try {
      const products = await this.productsService.getProducts();
      if (products.length > 0) {
        return {
          statusCode: HttpStatus.OK,
          data: products,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Post('/')
  createProduct(@Body() product: CreateProduct) {
    return this.productsService.createProduct(product);
  }
}
