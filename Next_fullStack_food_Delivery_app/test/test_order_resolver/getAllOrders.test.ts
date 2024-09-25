import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import Order from '@/models/order';
import { ordersQueryResolver } from '@/app/api/graphql/_resolvers/orders.resolver';
import { Types } from 'mongoose';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('getAllOrders', function() {
  afterEach(function() {
    restore();
  });

  it('should return all orders', async function() {
    // stud authRequest
     const mockResponse = {
      ok: true,
      json: stub().resolves({
         user: {
          _id: new Types.ObjectId(),
         },
         isAdmin: true
      })
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const orders = [
      {
        id: '1',
        buyerId: '1',
        sellerId: '2',
        dispatcherId: '3',
        orderItems: ['1', '2'],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        buyerId: '1',
        sellerId: '2',
        dispatcherId: '3',
        orderItems: ['1', '2'],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const findStub = stub(Order, 'find').resolves(orders);
    const result = await ordersQueryResolver.getAllOrders(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
    expect(result.statusCode).to.equal(200);
    expect(result.ok).to.be.true;
    expect(findStub.calledOnce).to.be.true;
  });

  it('should return empty array if there are no orders', async function() {
     const mockResponse = {
      ok: true,
      json: stub().resolves({
         user: {
          _id: new Types.ObjectId(),
         },
         isAdmin: true
      })
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const findStub = stub(Order, 'find').resolves([]);
    const result = await ordersQueryResolver.getAllOrders(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
      expect(result.statusCode).to.equal(200);
      expect(result.ok).to.be.true;
      expect(findStub.calledOnce).to.be.true;
  });

  it('should return empty array if there is an error', async function() {
    // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
         user: {
          _id: new Types.ObjectId(),
         },
         isAdmin: true
      })
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const findStub = stub(Order, 'find').rejects(new Error('error'));
    const result = await ordersQueryResolver.getAllOrders(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
      expect(result.statusCode).to.equal(500);
      expect(result.ok).to.be.false;
      expect(findStub.calledOnce).to.be.true;
  });
});