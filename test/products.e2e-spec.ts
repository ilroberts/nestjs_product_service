import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  const newProduct = {
    title: 'test product',
    description: 'this is a test product',
    price: 29.99,
  };

  let productId = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('gets an empty list of products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect('[]');
  });

  it('should create a new product and return an id', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(newProduct);

    expect(response.statusCode).toBe(201);

    const responseBody = response.body;
    productId = responseBody.id;

    console.log('generated id = ' + productId);
  });

  it('should delete the product with a given id', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/products/${productId}`,
    );

    expect(response.statusCode).toBe(200);
  });
});
