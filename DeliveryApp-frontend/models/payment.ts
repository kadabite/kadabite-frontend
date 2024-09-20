import mongoose, { Document, Schema, Model } from 'mongoose';
import { paymentStatus, paymentMethods, currency } from '../../configPayment.json';

// Define the interface for the Payment document
interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  paymentDateTime: Date;
  lastUpdateTime: Date;
  paymentMethod: string;
  currency: string;
  sellerAmount: number;
  dispatcherAmount: number;
  sellerPaymentStatus: string;
  dispatcherPaymentStatus: string;
  isDeleted: boolean;
}

// Define the schema for the Payment model
const paymentSchema: Schema<IPayment> = new Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentDateTime: { type: Date, required: true },
  lastUpdateTime: { type: Date, default: new Date() },
  paymentMethod: { type: String, enum: paymentMethods, default: paymentMethods[0] },
  currency: { type: String, enum: currency, default: currency[1] },
  sellerAmount: { type: Number, default: 0 },
  dispatcherAmount: { type: Number, default: 0 },
  sellerPaymentStatus: { type: String, enum: paymentStatus, default: paymentStatus[1] },
  dispatcherPaymentStatus: { type: String, enum: paymentStatus, default: paymentStatus[1] },
  isDeleted: { type: Boolean, default: false },
});

// Create the Payment model
const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', paymentSchema);

export { paymentSchema, Payment };
export type { IPayment };
