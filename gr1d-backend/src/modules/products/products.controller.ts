import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  findAll() {
    this.logger.log('findAll Products');
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    this.logger.log(`findOne Products ID=${id}`);
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.logger.log(`create Products ${JSON.stringify(createProductDto)}`);
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    this.logger.log(`update Products ID=${id} - ${JSON.stringify(updateProductDto)}`);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    this.logger.log(`delete Products ID=${id}`);
    return this.productsService.remove(id);
  }
}
