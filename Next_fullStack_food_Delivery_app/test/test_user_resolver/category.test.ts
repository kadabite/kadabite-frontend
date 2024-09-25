import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import Category from '@/models/category';
import { userQueryResolvers } from '@/app/api/graphql/_resolvers/user&category.resolver';
import { Types } from 'mongoose';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('category', function() {
  afterEach(function() {
    restore();
  });

  it('should return a category base on their id', async function() {
    const id = new Types.ObjectId();
    const category = { name: 'test', _id: id };
    const findByIdStub = stub(Category, 'findById').returns(category);
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: id,
         }
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const result = await userQueryResolvers.category(
      {},
      { id },
      { req: {
        headers: {
         authorization: "fakeString"
        }
      }
    });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(result).to.deep.equal({ categoryData: category, statusCode: 200, ok: true });
  });

  it('should return null if the category is not found', async function() {
    const id = new Types.ObjectId();
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: id,
         }
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const findByIdStub = stub(Category, 'findById').returns(null);

    const result = await userQueryResolvers.category(
      {},
      { id },
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });

    expect(findByIdStub.calledOnce).to.be.true;
    expect(result).to.deep.equal({ categoryData: null, statusCode: 200, ok: true });
  });

  it('should return null if an exception is raised', async function() {
    const id = new Types.ObjectId();
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: id,
         }
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const findByIdStub = stub(Category, 'findById').throws(new Error('Error fetching category'));

    const result = await userQueryResolvers.category(
      {},
      { id },
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(result).to.deep.equal({ message: 'An error occurred!', statusCode: 500, ok: false });
  });
});

