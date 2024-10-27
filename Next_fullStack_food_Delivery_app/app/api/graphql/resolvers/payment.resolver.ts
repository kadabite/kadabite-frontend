import { myLogger } from '@/app/api/upload/logger';
import { Payment } from '@/models/payment';
import Order from '@/models/order';
import { paymentMethods, currency } from '@/app/lib/definitions';
import { UnauthorizedError,
  OrderNotFoundError,
  PaymentNotFoundError,
  InvalidPaymentMethodError,
  InvalidCurrencyError,
  InvalidAmountError } from '@/app/lib/errors';
import mongoose from 'mongoose';
import { hasAccessTo } from '@/app/api/graphql/utils';

const availableCurrency = currency;

export const paymentQueryResolver = {
  getMyPayments: async (_parent: any, { orderId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get payment
      if (!hasAccessTo('getMyPayments', role)) {
        throw new UnauthorizedError('You do not have permission to get payment.');
      }

      // Find the order by ID and populate payment
      const order = await Order.findById(orderId).populate('payment').session(session);
      if (!order) {
        throw new OrderNotFoundError('Order was not found!');
      }

      // Check if the user is authorized to view the payment
      if (!(order.buyerId.toString() === user.id ||
        order.sellerId.toString() === user.id ||
        order.dispatcherId.toString() === user.id)) {
        throw new UnauthorizedError('You are not authorized to view this payment!');
      }

      await session.commitTransaction();
      return { paymentsData: order.payment, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting payment: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },
}

export const paymentMutationResolver = {
  updatePayment: async (_parent: any, { paymentId, status }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to update payment
      if (!hasAccessTo('updatePayment', role)) {
        throw new UnauthorizedError('You do not have permission to update payment.');
      }

      const pay = await Payment.findById(paymentId).session(session);
      if (!pay) {
        throw new PaymentNotFoundError('Payment not found');
      }

      const order = await Order.findById(pay.orderId).session(session);
      if (!order) {
        throw new OrderNotFoundError('Order not found');
      }

      if (order.sellerId.toString() === user.id) {
        pay.sellerPaymentStatus = status;
      } else if (order.dispatcherId.toString() === user.id) {
        pay.dispatcherPaymentStatus = status;
      } else {
        throw new UnauthorizedError('Unauthorized');
      }

      pay.lastUpdateTime = new Date();
      pay.paymentDateTime = new Date();

      if (pay.sellerPaymentStatus === 'paid' && pay.dispatcherPaymentStatus === 'paid') {
        order.status = 'completed';
      } else {
        order.status = 'incomplete';
      }

      await order.save({ session });
      await pay.save({ session });

      await session.commitTransaction();
      return { message: 'Payment was successfully updated!', id: pay.id.toString(), statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();

      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof PaymentNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error updating payment: ' + (error as Error).message);
      return { message: 'An error occurred while processing payment', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  createPayment: async (_parent: any, { orderId, paymentMethod, currency, sellerAmount, dispatcherAmount }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to create a payment
      if (!hasAccessTo('createPayment', role)) {
        throw new UnauthorizedError('You do not have permission to create a payment.');
      }

      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new OrderNotFoundError('Order not found!');
      }
      if (order.buyerId.toString() !== user.id) {
        throw new UnauthorizedError('You are not authorized to create a payment for this order.');
      }
      if (!paymentMethods.includes(paymentMethod)) {
        throw new InvalidPaymentMethodError('Payment method is not allowed.');
      }
      if (!availableCurrency.includes(currency)) {
        throw new InvalidCurrencyError('Currency not available for transaction.');
      }
      if (sellerAmount < 0 || dispatcherAmount < 0) {
        throw new InvalidAmountError('Invalid amount.');
      }

      const pay = new Payment({
        orderId,
        paymentMethod,
        currency,
        sellerAmount,
        dispatcherAmount
      });
      await pay.save({ session });
      order.payment.push(pay.id);
      await order.save({ session });

      await session.commitTransaction();
      return { message: 'Payment was successfully created!', id: pay.id.toString(), statusCode: 201, ok: true };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error creating payment: ' + (error as Error).message);

      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof InvalidPaymentMethodError || error instanceof InvalidCurrencyError || error instanceof InvalidAmountError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      return { message: 'An error occurred while processing payment', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },
}
