import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the OrderItem document
interface IOrderItem extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  comments?: string;
  ratings?: number;
}

// Define the schema for the OrderItem model
const orderItemSchema: Schema<IOrderItem> = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  comments: { type: String },
  ratings: { type: Number },
});

// Create the OrderItem model
// const OrderItem: Model<IOrderItem> = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
const OrderItem: Model<IOrderItem> = mongoose.models.OrderItem || mongoose.model<IOrderItem>('OrderItem', orderItemSchema);

export { orderItemSchema, OrderItem };
export type { IOrderItem };
