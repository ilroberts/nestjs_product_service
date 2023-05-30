import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { IProduct } from './product.interface';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from 'src/products/create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    this.logger.debug('creating a new product');
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async getAllProducts(): Promise<IProduct[]> {
    this.logger.debug('getting all products');

    const productData = await this.productModel.find();

    if (!productData || productData.length == 0) {
      this.logger.error('no products found');
      throw new NotFoundException('product data not found');
    }
    return productData;
  }

  async getProduct(productId: string): Promise<IProduct> {
    this.logger.debug(`getting product with id ${productId}`);
    const existingProduct = await this.productModel.findById(productId).exec();

    if (!existingProduct) {
      this.logger.error(`product with id ${productId} not found`);
      throw new NotFoundException(`student #${productId} not found`);
    }
    return existingProduct;
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    this.logger.debug(`updating product with id ${productId}`);

    const existingProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      { new: true },
    );

    if (!existingProduct) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    return existingProduct;
  }

  async deleteProduct(productId: string): Promise<IProduct> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw new NotFoundException(`product #${productId} not found`);
    }
    return deletedProduct;
  }
}
