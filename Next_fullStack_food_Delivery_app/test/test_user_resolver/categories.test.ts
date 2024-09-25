import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import Category from '@/models/category';
import { userQueryResolvers } from '@/app/api/graphql/_resolvers/user&category.resolver';
import { Types } from 'mongoose';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('categories', function() {
  afterEach(function() {
    restore();
  });

  it('should return all the categories', async function() {
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: new Types.ObjectId(),
         }
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const categories = [
      {
        id: new Types.ObjectId(),
        name: 'category1',
      },
      {
        id: new Types.ObjectId(),
        name: 'category2',
      },
    ]
    const findStub = stub(Category, 'find').resolves(categories);
    const result = await userQueryResolvers.categories(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
    expect(result).to.deep.equal({ categoriesData: categories, statusCode: 200, ok: true });
    expect(findStub.calledOnce).to.be.true;
  });

  it('should return an empty array if there are no categories', async function() {
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: new Types.ObjectId(),
         }
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);

    const findStub = stub(Category, 'find').resolves([]);
    const result = await userQueryResolvers.categories(
      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
    expect(result).to.deep.equal({ categoriesData: [], statusCode: 200, ok: true });
    expect(findStub.calledOnce).to.be.true;
  });

  it('should return an empty array if an exception is raised', async function() {
    // stud authRequest
    // stud authRequest
   // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().returns({
        user: {
          _id: new Types.ObjectId(),
         }
      }),
      status: 200
    };
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
    const findStub = stub(Category, 'find').throws(new Error('Error fetching category'));
    const result = await userQueryResolvers.categories(

      null,
      null,
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      }
    );
    expect(result).to.deep.equal({ message: 'An error occurred!', statusCode: 500, ok: false });
    expect(findStub.calledOnce).to.be.true;
  });
});

