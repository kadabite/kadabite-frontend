import { myLogger } from '@/app/api/upload/logger';
import Order from '@/models/order';
import { OrderItem } from '@/models/orderItem';
import { User } from '@/models/user';
import { Product } from '@/models/product'
import _ from 'lodash';
import mongoose from 'mongoose';
import { IPayment } from '@/models/payment';
import { SellerNotFoundError,
  DispatcherNotFoundError,
  ProductNotFoundError,
  DispatcherNotAvailableError,
  InvalidInputError,
  PaymentError,
  UnauthorizedError,
  OrderItemNotFoundError,
  OrderNotFoundError,
  InvalidOrderItemsError, 
  UserNotFoundError} from '@/app/lib/errors'
import { hasAccessTo } from '@/app/api/graphql/utils';
import {  deleteOrderItems } from '@/app/api/graphql/utils';


export const ordersQueryResolver = {
  getOrderById: async (_parent: any, { orderId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get order by ID
      if (!hasAccessTo('viewOrders', role)) {
        throw new UnauthorizedError('You do not have permission to get order by ID.');
      }

      // This endpoint retrieves a single order by ID
      const orderData = await Order.findOne({
        _id: orderId,
        $or: [
          { buyerId: user.id },
          { sellerId: user.id },
          { dispatcherId: user.id },
        ],
      }).session(session);

      if (!orderData) {
        throw new OrderNotFoundError('Order not found!');
      }

      await session.commitTransaction();
      return { orderData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting order by ID: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getAllOrders: async (_parent: any, _: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get all orders
      if (!hasAccessTo('viewAllOrders', role)) {
        throw new UnauthorizedError('You do not have permission to get all orders.');
      }

      // This endpoint retrieves all orders
      const ordersData = await Order.find().session(session);

      await session.commitTransaction();
      return { ordersData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting all orders: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getMyOrders: async (_parent: any, _: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get their orders
      if (!hasAccessTo('viewOrders', role)) {
        throw new UnauthorizedError('You do not have permission to get your orders.');
      }

      // This endpoint will get all the user's orders as a buyer
      const ordersData = await Order.find({
        buyerId: user.id,
      }).session(session);

      await session.commitTransaction();
      return { ordersData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting my orders: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getMyOrderItems: async (_parent: any, { orderId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get order items
      if (!hasAccessTo('viewOrders', role)) {
        throw new UnauthorizedError('You do not have permission to get order items.');
      }

      // This endpoint will get all the order items of the user's order
      // In this endpoint, we are finding a single order with id = orderId where the user is 
      // either a seller, buyer, or dispatcher.
      const order = await Order.findOne({
        $or: [
          { buyerId: user.id },
          { sellerId:  user.id },
          { dispatcherId:  user.id },
        ],
        _id: orderId,
      }).session(session);

      if (!order) {
        throw new OrderNotFoundError('Order not found!');
      }

      const orderItems = await OrderItem.find({ _id: { $in: order.orderItems } }).session(session);

      await session.commitTransaction();
      return { orderItems, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting my order items: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getTheOrderAsSeller: async (_parent: any, _: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get orders as seller
      if (!hasAccessTo('viewOrders', role)) {
        throw new UnauthorizedError('You do not have permission to get orders as seller.');
      }

      // This endpoint retrieves a seller's order
      const ordersData = await Order.find({
        sellerId: user.id
      }).session(session);

      await session.commitTransaction();
      return { ordersData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting order as seller: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getTheOrderAsDispatcher: async (_parent: any, _: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get orders as dispatcher
      if (!hasAccessTo('viewOrders', role)) {
        throw new UnauthorizedError('You do not have permission to get orders as dispatcher.');
      }

      // This endpoint retrieves a dispatcher's order
      const ordersData = await Order.find({
        dispatcherId: user.id
      }).session(session);

      await session.commitTransaction();
      return { ordersData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting order as dispatcher: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },
}

export const ordersMutationResolver = {
  updateOrderItems: async (_parent: any, { orderId, orderItems }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to update order items
      if (!hasAccessTo('updateOrderItems', role)) {
        throw new UnauthorizedError('You do not have permission to update order items.');
      }

      // Validate order items
      if (!orderItems) {
        throw new InvalidOrderItemsError('Order items must be provided!');
      }
      if (!Array.isArray(orderItems)) {
        throw new InvalidOrderItemsError('Order items must be an array!');
      }

      const order = await Order.findById(orderId).populate('payment').session(session);
      if (!order) {
        throw new OrderNotFoundError('Order does not exist!');
      }
      if (!(order.buyerId.toString() === user.id)) {
        throw new UnauthorizedError('You are not authorized to update this order item!');
      }

      // Type guard to check if payment is populated
      const isPaymentPopulated = (payment: mongoose.Types.ObjectId | IPayment): payment is IPayment => {
        return (payment as IPayment).sellerPaymentStatus !== undefined;
      };

      if (order.payment && order.payment.length > 0 && isPaymentPopulated(order.payment[0])) {
        if (order.payment[0].sellerPaymentStatus === 'paid' || order.payment[0].dispatcherPaymentStatus === 'paid') {
          throw new UnauthorizedError('You cannot update a paid order item!');
        }
      }

      for (const item of orderItems) {
        const orderItem = await OrderItem.findById(item.id).session(session);
        if (orderItem && order.orderItems.includes(item.id)) {
          orderItem.quantity = item.quantity;
          await orderItem.save({ session });
        }
      }

      await session.commitTransaction();
      return { message: 'Order items updated successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof InvalidOrderItemsError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      myLogger.error('Error updating order items: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  deleteAnOrderItem: async (_parent: any, { orderId, orderItemId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to delete order items
      if (!hasAccessTo('deleteOrder', role)) {
        throw new UnauthorizedError('You do not have permission to delete order items.');
      }

      const order = await Order.findById(orderId).populate('payment').session(session);
      if (!order) {
        throw new OrderNotFoundError('Order does not exist!');
      }
      if (!(order.buyerId.toString() === user.id || order.sellerId.toString() === user.id)) {
        throw new UnauthorizedError('You are not authorized to delete this order item!');
      }

      // Type guard to check if payment is populated
      const isPaymentPopulated = (payment: mongoose.Types.ObjectId | IPayment): payment is IPayment => {
        return (payment as IPayment).sellerPaymentStatus !== undefined;
      };

      if (order.payment && order.payment.length > 0 && isPaymentPopulated(order.payment[0])) {
        if (order.payment[0].sellerPaymentStatus === 'paid' || order.payment[0].dispatcherPaymentStatus === 'paid') {
          throw new UnauthorizedError('You cannot delete a paid order item!');
        }
        if (order.payment[0].sellerPaymentStatus === 'inprocess' || order.payment[0].dispatcherPaymentStatus === 'inprocess') {
          const lastUpdateTime = new Date(order.payment[0].lastUpdateTime);
          const currentTime = new Date();
          const oneHourAgo = new Date(currentTime.getTime() - 3600000);
          if (oneHourAgo < lastUpdateTime) {
            throw new UnauthorizedError('You cannot delete an order item that is in process!');
          }
        }
      }

      const index = order.orderItems.map(item => item.toString()).indexOf(orderItemId);
      if (index === -1) {
        throw new OrderItemNotFoundError('Order item does not exist!');
      }
      order.orderItems.splice(index, 1);
      // Delete the order item
      await OrderItem.findByIdAndDelete(orderItemId).session(session);
      // This save must be called to update the total Amount in the order
      await order.save({ session });

      await session.commitTransaction();
      return { message: 'Order item was deleted successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof OrderItemNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error deleting order items: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  deleteOrder: async (_parent: any, { orderId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to delete orders
      if (!hasAccessTo('deleteOrder', role)) {
        throw new UnauthorizedError('You do not have permission to delete orders.');
      }

      const order = await Order.findById(orderId).populate('payment').session(session);
      if (!order) {
        throw new OrderNotFoundError('Order does not exist!');
      }
      if (!(order.buyerId.toString() === user.id || order.sellerId.toString() === user.id)) {
        throw new UnauthorizedError('You are not authorized to delete this order!');
      }

      // Type guard to check if payment is populated
      const isPaymentPopulated = (payment: mongoose.Types.ObjectId | IPayment): payment is IPayment => {
        return (payment as IPayment).sellerPaymentStatus !== undefined;
      };

      if (order.payment && order.payment.length > 0 && isPaymentPopulated(order.payment[0])) {
        if (order.payment[0].sellerPaymentStatus === 'paid' || order.payment[0].dispatcherPaymentStatus === 'paid') {
          throw new PaymentError('You cannot delete a paid order!');
        }
        if (order.payment[0].sellerPaymentStatus === 'inprocess' || order.payment[0].dispatcherPaymentStatus === 'inprocess') {
          const lastUpdateTime = new Date(order.payment[0].lastUpdateTime);
          const currentTime = new Date();
          const oneHourAgo = new Date(currentTime.getTime() - 3600000);
          if (oneHourAgo < lastUpdateTime) {
            throw new PaymentError('You cannot delete an order that is in process!');
          }
        }
      }

      await deleteOrderItems(order.orderItems);

      for (const payment of order.payment) {
        if (isPaymentPopulated(payment)) {
          payment.isDeleted = true;
          payment.lastUpdateTime = new Date();
          await payment.save({ session });
        }
      }

      await Order.findByIdAndDelete(orderId).session(session);
      await session.commitTransaction();
      return { message: 'Order was deleted successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof PaymentError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      myLogger.error('Error deleting order: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  updateOrder: async (_parent: any, { orderId, deliveryAddress, recievedByBuyer, deliveredByDispatcher }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to update orders
      if (!hasAccessTo('updateOrder', role)) {
        throw new UnauthorizedError('You do not have permission to update orders.');
      }

      const order = await Order.findById(orderId).session(session);
      if (!order) {
        throw new OrderNotFoundError('Order does not exist!');
      }
      if (!(order.buyerId.toString() === user.id || order.dispatcherId.toString() === user.id)) {
        throw new UnauthorizedError('You are not authorized to update this order!');
      }

      if (deliveryAddress && order.buyerId.toString() === user.id) {
        order.deliveryAddress = _.trim(deliveryAddress);
      } else if (recievedByBuyer && order.buyerId.toString() === user.id) {
        order.recievedByBuyer = true;
      } else if (deliveredByDispatcher && order.dispatcherId.toString() === user.id) {
        order.deliveredByDispatcher = true;
      } else {
        throw new InvalidInputError('An error occurred in your input');
      }

      await order.save({ session });
      await session.commitTransaction();
      return {
        message: 'Order was updated successfully!',
        id: orderId,
        statusCode: 200,
        ok: true
      };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof InvalidInputError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      myLogger.error('An error occurred while updating order: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  deleteOrderItemsNow: async (_parent: any, { ids }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to delete order items
      if (!hasAccessTo('deleteOrderItems', role)) {
        throw new UnauthorizedError('You do not have permission to delete order items.');
      }

      if (!Array.isArray(ids) || ids.length === 0) {
        throw new OrderItemNotFoundError('Order item IDs must be provided and must be an array.');
      }

      for (const id of ids) {
        const orderItem = await OrderItem.findById(id).session(session);
        if (!orderItem) {
          throw new OrderItemNotFoundError(`Order item with ID ${id} does not exist!`);
        }
        await OrderItem.findByIdAndDelete(id).session(session);
      }

      await session.commitTransaction();
      return { message: 'Order items have been deleted successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof OrderItemNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error deleting order items: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  createOrder: async (_parent: any, args: { sellerId: any; dispatcherId: any; deliveryAddress: any; orderItems: any; }, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to create orders
      if (!hasAccessTo('createOrder', role)) {
        throw new UnauthorizedError('You do not have permission to create orders.');
      }

      const {
        sellerId,
        dispatcherId,
        deliveryAddress,
        orderItems,
      } = args;
      const buyerId = user.id;
      let createdItems = [];

      // Verify if the seller exists
      const seller = await User.findById(sellerId).session(session);
      if (!seller) {
        throw new SellerNotFoundError('Seller does not exist!');
      }

      // Verify if the dispatcher exists and is available
      if (dispatcherId) {
        const dispatcher = await User.findById(dispatcherId).session(session);
        if (!dispatcher) {
          throw new DispatcherNotFoundError('Dispatcher does not exist!');
        }
        if (dispatcher.dispatcherStatus !== 'available') {
          throw new DispatcherNotAvailableError('Dispatcher is not available!');
        }
      }

      let currency;
      let totalAmount = 0;

      // Create each item one by one
      for (const data of orderItems) {
        // Verify if the product exists
        const product = await Product.findById(data.productId).session(session);
        if (!product) {
          throw new ProductNotFoundError('Product does not exist!');
        }

        // Get currency
        currency = product.currency;

        // Calculate total amount
        if (!data.quantity) data.quantity = 1;
        totalAmount += product.price * data.quantity;

        const item = new OrderItem(data);
        await item.save({ session });
        createdItems.push(item.id);
      }

      // Create the order
      const newOrder = new Order({
        sellerId,
        dispatcherId,
        buyerId,
        deliveryAddress: _.trim(deliveryAddress),
        currency,
        totalAmount,
        orderItems: createdItems,
      });
      await newOrder.save({ session });

      await session.commitTransaction();
      return { message: 'Order was created successfully!', id: newOrder._id, statusCode: 201, ok: true };
    } catch (error) {
      await session.abortTransaction();

      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof SellerNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof DispatcherNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      if (error instanceof DispatcherNotAvailableError) {
        return { message: error.message, statusCode: 401, ok: false };
      }

      if (error instanceof ProductNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error creating orders: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },
}
