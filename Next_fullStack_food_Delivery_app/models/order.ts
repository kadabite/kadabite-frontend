import mongoose, { Document, Schema, Model } from 'mongoose';
import { IProduct, Product } from '@/models/product';
import { IOrderItem, OrderItem } from '@/models/orderItem';
import { IPayment } from '@/models/payment';

// Define the interface for the Order document
interface IOrder extends Document {
  sellerId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  dispatcherId: mongoose.Types.ObjectId;
  orderDateTime: Date;
  timeOfDelivery: Date;
  recievedByBuyer: boolean;
  deliveredByDispatcher: boolean;
  deliveryAddress: string;
  currency: string;
  totalAmount: number;
  status: 'completed' | 'incomplete' | 'pending';
  orderItems: mongoose.Types.ObjectId[] | IOrderItem[];
  payment: mongoose.Types.ObjectId[] | IPayment[];
}

// Define the schema for the Order model
const orderSchema: Schema<IOrder> = new Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dispatcherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderDateTime: { type: Date, default: new Date() },
  timeOfDelivery: { type: Date },
  recievedByBuyer: { type: Boolean, default: false },
  deliveredByDispatcher: { type: Boolean, default: false },
  deliveryAddress: { type: String },
  currency: { type: String },
  totalAmount: { type: Number },
  status: { type: String, enum: ['completed', 'incomplete', 'pending'], default: 'incomplete' },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  payment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
});

// Pre-save hook to calculate total amount
orderSchema.pre<IOrder>('save', async function (next) {
  const items = this.orderItems;
  let totalAmount = 0;

  for (const item of items) {
    const orderItem = await OrderItem.findById(item.toString());
    if (orderItem?.productId) {
      const product = await Product.findById(orderItem.productId.toString());
      if (product?.price && orderItem?.quantity) {
        totalAmount += product.price * orderItem.quantity;
      }
    }
  }

  this.totalAmount = totalAmount;
  next();
});

// Create the Order model
const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);

export default Order;