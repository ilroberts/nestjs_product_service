import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly title: string;
  readonly description: string;
  readonly price: number;
}
