import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './dto/createProductDTO';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Post('/')
  createProduct(@Body() product: CreateProduct) {
    return this.productsService.createProduct(product);
  }
}
