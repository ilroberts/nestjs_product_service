import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const newProduct = await this.productsService.createProduct(
        createProductDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Product created successfully',
        newProduct,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error: product not created',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.productsService.updateProduct(prodId, updateProductDto);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productsService.deleteProduct(prodId);
  }
}
