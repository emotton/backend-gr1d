import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
   ){}

  async findAll() {
    return await this.productRepository.find({
      order: { id: 'ASC'}
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(Number(id), {
      order: { id: 'ASC'}
    });
    if(!product){
        throw new HttpException( `Product ID ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
        return product;
    }
  }

  async create(createProductDto: CreateProductDto){
      const product = await this.productRepository.create({
        ...createProductDto
      });
      return this.productRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto){
    const product = await this.productRepository.preload(
      {id: +id,
      ... updateProductDto});
    if(!product){
      throw new NotFoundException(`Product ID ${id} not found`);
    }
    await this.productRepository.save(product);
  }

  async remove(id: string){
    const product = await this.productRepository.findOne(Number(id));
    if(!product){
        throw new HttpException( `Product ID ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
        this.productRepository.remove(product);
    }
  }

}
