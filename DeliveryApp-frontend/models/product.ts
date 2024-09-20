import mongoose, { Document, Schema, Model } from 'mongoose';
import { currency } from '../../configPayment.json';

// Define the interface for the Product document
interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  currency: string;
  photo?: string;
  quantity: number;
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

// Define the schema for the Product model
const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, maxlength: 50, required: true },
  description: { type: String, maxlength: 50 },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  currency: { type: String, enum: currency, default: currency[1] },
  photo: { type: String },
  quantity: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Create the Product model
const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export { productSchema, Product };
export type { IProduct };
