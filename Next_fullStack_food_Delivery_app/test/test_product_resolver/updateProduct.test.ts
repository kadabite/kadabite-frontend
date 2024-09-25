import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import { Product } from '@/models/product';
import Category from '@/models/category';
import { User } from '@/models/user';
import { productMutationResolver } from '@/app/api/graphql/_resolvers/products.resolver';
import { Types } from 'mongoose';

const expect = chai.expect;
const { stub, restore } = sinon;

describe('updateProduct', function() {

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

  it('should update a product', async function() {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();
    const product = {
      id: productId,
      name: 'product1',
      description: 'description1',
      price: 100,
      currency: 'Naira',
      categoryId
    };
    const category = {
      id: categoryId,
      name: 'category1'
    };
    const user = {
      id: new Types.ObjectId(),
      products: [productId],
      populate: stub().returnsThis()
    };
    
    const findByIdAndUpdateStub = stub(Product, 'findByIdAndUpdate').resolves(product);
    const findByIdUserStub = stub(User, 'findById').returns(user);
    
    const categoryStub = stub(Category, 'findById').returns(category);
    const id = productId.toString();
    const result = await productMutationResolver.updateProduct(
      null,
      { id, product, categoryId},
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });

    expect(result.statusCode).to.equal(200);
    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
    expect(findByIdUserStub.calledOnce).to.be.true;
    expect(categoryStub.calledOnce).to.be.true;
    expect(findByIdUserStub.calledOnce).to.be.true;
  });

  it('should throw an error if the product is not found', async function() {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();
    const product = {
      id: productId,
      name: 'product1',
      description: 'description1',
      price: 100,
      currency: 'Naira',
      categoryId
    };
    const category = {
        id: categoryId,
        name: 'category1'
        };
    const user = {
      id: new Types.ObjectId(),
      products: [],
      populate: stub().returnsThis()
    };
    
    const findByIdAndUpdateStub = stub(Product, 'findByIdAndUpdate').resolves(null);
    const findByIdUserStub = stub(User, 'findById').returns(user);
    
    const categoryStub = stub(Category, 'findById').returns(category);
    const id = productId.toString();
    const result = await productMutationResolver.updateProduct(
      null,
      { id, product, categoryId},
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
    expect(result).to.deep.equal({ 'message': 'This Product does not exist for this user!', statusCode: 404, ok: false });
    expect(findByIdAndUpdateStub.calledOnce).to.be.false;
    expect(findByIdUserStub.calledOnce).to.be.true;
    expect(categoryStub.calledOnce).to.be.false;
    expect(findByIdUserStub.calledOnce).to.be.true;
  });

  it('should return an error if category is not found', async function() {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();
    const product = {
      id: productId,
      name: 'product1',
      description: 'description1',
      price: 100,
      currency: 'Naira',
      categoryId
    };
    const user = {
      id: new Types.ObjectId(),
      products: [productId],
      populate: stub().returnsThis()
    };
    
    const findByIdAndUpdateStub = stub(Product, 'findByIdAndUpdate').resolves(product);
    const findByIdUserStub = stub(User, 'findById').returns(user);
    
    const categoryStub = stub(Category, 'findById').returns();
    const id = productId.toString();
    const result = await productMutationResolver.updateProduct(
      null,
      { id, product, categoryId},
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });

    expect(result).to.deep.equal({ 'message': 'This category does not exist!', statusCode: 404, ok: false });
    expect(findByIdAndUpdateStub.calledOnce).to.be.false;
    expect(findByIdUserStub.calledOnce).to.be.true;
    expect(categoryStub.calledOnce).to.be.true;
    expect(findByIdUserStub.calledOnce).to.be.true;
  });

  it('should return an error if product could not be updated', async function() {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();
    const product = {
      id: productId,
      name: 'product1',
      description: 'description1',
      price: 100,
      currency: 'Naira',
      categoryId
    };
    const category = {
        id: categoryId,
        name: 'category1'
        };
    const user = {
      id: new Types.ObjectId(),
      products: [productId],
      populate: stub().returnsThis()
    };
    
    const findByIdAndUpdateStub = stub(Product, 'findByIdAndUpdate').throws(new Error('An error occured!'));
    const findByIdUserStub = stub(User, 'findById').returns(user);
    
    const categoryStub = stub(Category, 'findById').returns(category);
    const id = productId.toString();
    const result = await productMutationResolver.updateProduct(
      null,
      { id, product, categoryId},
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });

    expect(result).to.deep.equal({ message: 'An error occurred!', statusCode: 500, ok: false});
    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
    expect(findByIdUserStub.calledOnce).to.be.true;
    expect(categoryStub.calledOnce).to.be.true;
    expect(findByIdUserStub.calledOnce).to.be.true;
  });
});
