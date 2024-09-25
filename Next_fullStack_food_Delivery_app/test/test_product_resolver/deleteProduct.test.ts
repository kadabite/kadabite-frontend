import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import { Product } from '@/models/product';
import { User, IUser } from '@/models/user';
import { productMutationResolver } from '@/app/api/graphql/_resolvers/products.resolver';
import { Types, Query } from 'mongoose';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('deleteProduct', function() {
  beforeEach(function() {
    // Create a mock Response object
    const mockResponse = {
      ok: true,
      json: stub().resolves({
        user: {
          _id: new Types.ObjectId(),
        },
        isAdmin: true
      }),
      status: 200
    }
    // Stub the fetch function to return the mock Response
    stub(fetch, 'default').resolves(mockResponse as unknown as Response);
  });

  afterEach(function() {
    restore();
  });

  it('should delete a product', async function() {
    const productId = new Types.ObjectId();
    const user = {
      id: new Types.ObjectId(),
      products: [productId],
      save: stub().resolves(),
      populate: stub().resolvesThis()
    };
    const product = {
      _id: productId,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      currency: 'Dollar',
      categoryId: new Types.ObjectId()
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdProductStub = stub(Product, 'findByIdAndDelete').resolves(product);
    const result = await productMutationResolver.deleteProduct(
        null, 
        {
            id: productId.toString()
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(result).to.deep.equal({ 'message': 'Successfully deleted!', statusCode: 200, ok: true });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(findByIdProductStub.calledOnce).to.be.true;
  });

  it('should return an error message if the product does not exist', async function() {
    const productId = new Types.ObjectId();
    const user = {
      id: new Types.ObjectId(),
      products: [],
      save: stub().resolves(),
      populate: stub().resolvesThis()
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const result = await productMutationResolver.deleteProduct(
        null, 
        {
            id: productId.toString()
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(result).to.deep.equal({ 'message': 'This Product does not exist for this user!', statusCode: 404, ok: false });
    expect(findByIdStub.calledOnce).to.be.true;
  });

  it('should return an error message if the product could not be deleted', async function() {
    const productId = new Types.ObjectId();
    const user = {
      id: new Types.ObjectId(),
      products: [productId],
      save: stub().resolves(),
      populate: stub().resolvesThis()
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdProductStub = stub(Product, 'findByIdAndDelete').resolves(null);
    const result = await productMutationResolver.deleteProduct(
        null, 
        {
            id: productId.toString()
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
    });
    expect(result).to.deep.equal({ 'message': 'Could not delete product!', statusCode: 401, ok: false });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(findByIdProductStub.calledOnce).to.be.true;
  });

  it('should return an error message if an exception occurs', async function() {
    const productId = new Types.ObjectId();
    const user = {
      id: new Types.ObjectId(),
      products: [productId],
      save: stub().resolves(),
      populate: stub().throws()
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const result = await productMutationResolver.deleteProduct(
        null, 
        {
            id: productId.toString()
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(result).to.deep.equal({ 'message': 'An error occurred!', statusCode: 500, ok: false });
    expect(findByIdStub.calledOnce).to.be.true;
  });
});