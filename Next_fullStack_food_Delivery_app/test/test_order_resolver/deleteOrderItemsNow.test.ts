import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import { Types } from 'mongoose';
import Order from '@/models/order';
import { ordersMutationResolver } from '@/app/api/graphql/_resolvers/orders.resolver';
import { myLogger } from '@/app/api/upload/logger';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('deleteOrderItemsNow', function() {
  afterEach(function() {
    restore();
  });

  it('should return message after successfully deleting order items', async function() {
    // stud authRequest

    // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: new Types.ObjectId(),
        }
      }),
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const ids = [new Types.ObjectId().toString(), new Types.ObjectId().toString()];
    const result = await ordersMutationResolver.deleteOrderItemsNow(
      null,
      { ids },
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
    });
    expect(result).to.have.property('message', 'Order items may have been deleted successfully!');
  });
});