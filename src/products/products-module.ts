import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from 'src/schemas/product.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING, {
      dbName: process.env.DATABASE_NAME,
    }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({}),
    },
  ],
})
export class ProductsModule {}
