import chai from 'chai';
import sinon from 'sinon';
import { Types } from 'mongoose';
import Order from '@/models/order';
import fetch, { Response } from 'node-fetch';
import { Payment } from '@/models/payment';
import { paymentMutationResolver } from '@/app/api/graphql/_resolvers/payment.resolver';
import { myLogger } from '@/app/api/upload/logger';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('updatePayment', function() {
  afterEach(function() {
    restore();
  });

  it('should update successfully update payment status', async function() {
    const orderId = new Types.ObjectId();
    const paymentId = new Types.ObjectId();
    const status = 'paid';


    const payment = {
        _id: paymentId,
        orderId,
        sellerPaymentStatus: 'paid',
        dispatcherPaymentStatus: 'paid',
        lastUpdateTime: new Date().toString(),
        paymentDateTime: new Date().toString(),
        save: stub().resolves()
    };
    const order = {
        _id: orderId,
        sellerId: new Types.ObjectId(),
        dispatcherId: new Types.ObjectId(),
        save: stub().resolves()
    };

    // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: order.sellerId.toString(),
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(order)
    
    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
             authorization: "fakeString"
            } 
           }
        });

    expect(result).to.be.an('object');
    // expect(payment.save.calledOnce).to.be.true;
    // expect(order.save.calledOnce).to.be.true;
    expect(result).to.have.property('message', 'Payment was successfully updated!');
    expect(result).to.have.property('id').that.is.a('string');
  });

  it('should throw error if payment not found', async function() {

    const paymentId = new Types.ObjectId();
    const status = 'paid';

    const userId = new Types.ObjectId().toString()
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    stub(Payment, 'findById').resolves(null);
    
    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
             authorization: "fakeString"
            } 
           }
        });

    expect(result).to.be.an('object');
    expect(result).to.have.property('message', 'Payment not found');
  });

  it('should throw error if order not found', async function() {
    const paymentId = new Types.ObjectId();
    const status = 'paid';
    const userId = new Types.ObjectId().toString()
    // stud authRequest
    // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const payment = {
        _id: paymentId,
        orderId: new Types.ObjectId(),
        sellerPaymentStatus: 'paid',
        dispatcherPaymentStatus: 'paid',
        lastUpdateTime: new Date().toString(),
        paymentDateTime: new Date().toString(),
        save: stub().resolves()
    };

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(null)
    
    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
              authorization: "fakeString"
            } 
            } 
        });

    expect(result).to.be.an('object');
    expect(result).to.have.property('message', 'Order not found');
  });

  it('should throw error if seller is not user', async function() {
        
    const orderId = new Types.ObjectId();
    const paymentId = new Types.ObjectId();
    const status = 'paid';
    const userId = new Types.ObjectId().toString();

    // stud authRequest
    // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const payment = {
        _id: paymentId,
        orderId,
        sellerPaymentStatus: 'paid',
        dispatcherPaymentStatus: 'paid',
        lastUpdateTime: new Date().toString(),
        paymentDateTime: new Date().toString(),
        save: stub().resolves()
    };

    const order = {
        _id: orderId,
        sellerId: new Types.ObjectId(),
        dispatcherId: new Types.ObjectId(),
        save: stub().resolves()
    };

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(order)
    
    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
              authorization: "fakeString"
            } 
            } 
    });

    expect(result).to.be.an('object');
    expect(result).to.have.property('message', 'Unauthorized');
  });

  it('should throw error if dispatcher is not user', async function() {
    const orderId = new Types.ObjectId();
    const paymentId = new Types.ObjectId();
    const status = 'paid';
    const userId = new Types.ObjectId().toString()
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const payment = {
        _id: paymentId,
        orderId,
        sellerPaymentStatus: 'paid',
        dispatcherPaymentStatus: 'paid',
        lastUpdateTime: new Date().toString(),
        paymentDateTime: new Date().toString(),
        save: stub().resolves()
    };
    const order = {
        _id: orderId,
        sellerId: new Types.ObjectId(),
        dispatcherId: new Types.ObjectId(),
        save: stub().resolves()
    };

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(order)
    
    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
             authorization: "fakeString"
            } 
           } 
        });

    expect(result).to.be.an('object');
    expect(result).to.have.property('message', 'Unauthorized');
  });
  
  it('should make order.status to be incomplete if payment status is not paid', async function() {
    const orderId = new Types.ObjectId();
    const paymentId = new Types.ObjectId();
    const status = 'unpaid';
    const userId = new Types.ObjectId().toString()
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const payment = {
      _id: paymentId,
      orderId,
      sellerPaymentStatus: 'paid',
      dispatcherPaymentStatus: 'paid',
      lastUpdateTime: new Date().toString(),
      paymentDateTime: new Date().toString(),
      save: stub().resolves()
    };
    const order = {
      _id: orderId,
      sellerId: userId,
      dispatcherId: new Types.ObjectId(),
      save: stub().resolves()
    };

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(order)
    
    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
             authorization: "fakeString"
            } 
           }
    });
    expect(order.status).to.equal('incomplete');
  });
  
  it('should make order.status to be complete if payment status is paid', async function() {
    const orderId = new Types.ObjectId();
    const paymentId = new Types.ObjectId();
    const status = 'paid';
    const userId = new Types.ObjectId().toString()
    
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const payment = {
        _id: paymentId,
        orderId,
        sellerPaymentStatus: 'paid',
        dispatcherPaymentStatus: 'paid',
        lastUpdateTime: new Date().toString(),
        paymentDateTime: new Date().toString(),
        save: stub().resolves()
    };
    const order = {
        _id: orderId,
        sellerId: userId,
        dispatcherId: new Types.ObjectId(),
        save: stub().resolves()
    };

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(order)
    
    await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
             authorization: "fakeString"
            } 
           }
    });
    expect(order.status).to.equal('completed');
  })

  it('should return error if an exception is thrown', async function() {
    const orderId = new Types.ObjectId();
    const paymentId = new Types.ObjectId();
    const status = 'paid';
    const userId = new Types.ObjectId().toString()
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: userId,
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const payment = {
        _id: paymentId,
        orderId,
        sellerPaymentStatus: 'paid',
        dispatcherPaymentStatus: 'paid',
        lastUpdateTime: new Date().toString(),
        paymentDateTime: new Date().toString(),
        save: stub().throws(new Error('An error occurred while processing payment'))
    };
    const order = {
        _id: orderId,
        sellerId: userId,
        dispatcherId: new Types.ObjectId(),
        save: stub().throws(new Error('An error occurred while processing payment'))
    };

    stub(Payment, 'findById').resolves(payment)
    stub(Order, 'findById').resolves(order)
    const stubLogger = stub(myLogger, 'error');

    const result = await paymentMutationResolver.updatePayment(
        null,
        { paymentId, status },
        { req: {
            headers: {
             authorization: "fakeString"
            } 
           }
        });

    expect(stubLogger.called).to.be.true;
    expect(result).to.be.an('object');
    expect(result).to.have.property('message', 'An error occurred while processing payment');
    stubLogger.restore();
  });
});
