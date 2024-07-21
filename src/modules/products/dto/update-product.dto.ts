import { PartialType } from '@nestjs/mapped-types';
import { CreateProduct } from './createProductDTO';

export class UpdateProduct extends PartialType(CreateProduct) {}
