import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { HealthModule } from './health/health.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ecommerce:secret@localhost:27017', {
      dbName: 'nest',
    }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    HealthModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    ProductsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({}),
    },
  ],
})
export class AppModule {}
