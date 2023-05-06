import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = app.get<ProductsController>(ProductsController);
  });

  it('should return a list of products', () => {
    expect(controller.getAllProducts()).toEqual([]);
  });

  it('should create a new product', () => {
    const response = controller.addProduct('title', 'description', 25);
    const prefix = response.id.slice(0, 2);

    expect(prefix).toBe('0.');
  });
});
