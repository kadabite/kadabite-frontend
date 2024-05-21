import mongoose from  "mongoose";
import { paymentStatus, paymentMethods, currency } from '../../configPayment.json'

const { Schema } = mongoose;

const paymentschema = new Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  paymentDateTime: { type: Date, default: new Date().toString()},
  lastUpdateDateTime: { type: Date, default: new Date().toString()},
  paymentMethod: { enum: paymentMethods, type: String, default: paymentMethods[0] },
  currency: { enum: currency, type: String, default: currency[1] },
  totalAmount: Number,
  paymentStatus: { enum: paymentStatus, type: String, default: paymentStatus[1] },
});

export const paymentSchema = paymentschema;
export const Payment = mongoose.model('Payment', paymentschema);
