import chai from 'chai';
import sinon from 'sinon';
import fetch, { Response } from 'node-fetch';
import { Product } from '@/models/product';
import Category from '@/models/category';
import { User, IUser } from '@/models/user';
import { productMutationResolver } from '@/app/api/graphql/_resolvers/products.resolver';
import { Query, Types } from 'mongoose';


const expect = chai.expect;
const { stub, restore } = sinon;

describe('createProduct', function() {

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

  it('should create a product', async function() {
    const user = {
      _id: new Types.ObjectId(),
      products: [],
      save: stub().resolves(),
    };
    const category = {
      _id: new Types.ObjectId()
    };
    const product = {
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      currency: 'Dollar',
      categoryId: category._id
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdCategoryStub = stub(Category, 'findById').resolves(category);
    const saveStub = stub(Product.prototype, 'save').resolves(product);
    const result = await productMutationResolver.createProduct(
      null, 
      {
          name: product.name,
          description: product.description,
          price: product.price,
          currency: product.currency,
          categoryId: category._id.toString() 
      },
      { req: {
        headers: {
         authorization: "fakeString"
        } 
       }
      });
    expect(result.statusCode).to.be.equal(200);
    expect(result.ok).to.be.true;
    expect(findByIdStub.calledOnce).to.be.true;
    expect(findByIdCategoryStub.calledOnce).to.be.true;
    expect(saveStub.calledOnce).to.be.true;
  });

  it('should return an error message if category does not exist', async function() {
    const user = {
      id: new Types.ObjectId(),
      products: [],
      save: stub().resolves()
    };
    const category = null;
    const product = {
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      currency: 'Dollar',
      categoryId: new Types.ObjectId()
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdCategoryStub = stub(Category, 'findById').resolves(category);
    const saveStub = stub(Product.prototype, 'save').resolves(product);
    const result = await productMutationResolver.createProduct(
        null, 
        {
            name: product.name,
            description: product.description,
            price: product.price,
            currency: product.currency,
            categoryId: product.categoryId.toString() 
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(result.message).to.be.equal('The product category ID must be specified!');
    expect(findByIdStub.calledOnce).to.be.false;
    expect(findByIdCategoryStub.calledOnce).to.be.true;
    expect(saveStub.called).to.be.false;
  });

  it('should return null if an error occurs', async function() {
    const user = {
      id: new Types.ObjectId(),
      products: [],
      save: stub().resolves()
    };
    const category = {
      _id: new Types.ObjectId()
    };
    const product = {
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      currency: 'Dollar',
      categoryId: category._id
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().throws(new Error('Error occurred'))
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdCategoryStub = stub(Category, 'findById').resolves(category);
    const saveStub = stub(Product.prototype, 'save').resolves(product);
    const result = await productMutationResolver.createProduct(
        null, 
        {
            name: product.name,
            description: product.description,
            price: product.price,
            currency: product.currency,
            categoryId: category._id.toString() 
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(result).to.deep.equal({ message: 'An error occurred!', statusCode: 500, ok: false });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(findByIdCategoryStub.calledOnce).to.be.true;
    expect(saveStub.called).to.be.false;
  });

  it('should return null if an error occurs when saving the product', async function() {
    const user = {
      id: new Types.ObjectId(),
      products: [],
      save: stub().resolves()
    };
    const category = {
      _id: new Types.ObjectId()
    };
    const product = {
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      currency: 'Dollar',
      categoryId: category._id
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user)
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdCategoryStub = stub(Category, 'findById').resolves(category);
    const saveStub = stub(Product.prototype, 'save').throws(new Error('Error occurred'));
    const result = await productMutationResolver.createProduct(
        null, 
        {
            name: product.name,
            description: product.description,
            price: product.price,
            currency: product.currency,
            categoryId: category._id.toString() 
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(result).to.deep.equal({ message: 'An error occurred!', statusCode: 500, ok: false });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(findByIdCategoryStub.calledOnce).to.be.true;
    expect(saveStub.called).to.be.true;
  });

  it('should verify that the user has the product', async function() {
    const user = {
      id: new Types.ObjectId(),
      products: [],
      save: stub().resolves()
    };
    const category = {
      _id: new Types.ObjectId()
    };
    const product = {
      _id: new Types.ObjectId(),
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      currency: 'Dollar',
      categoryId: category._id
    };
    const findByIdStub = stub(User, 'findById').returns({
      populate: stub().resolves(user),
    } as unknown as Query<unknown, unknown, {}, IUser, "findOne", {}>);
    const findByIdCategoryStub = stub(Category, 'findById').resolves(category);
    const saveStub = stub(Product.prototype, 'save').resolves(product);
    const result = await productMutationResolver.createProduct(
        null, 
        {
            name: product.name,
            description: product.description,
            price: product.price,
            currency: product.currency,
            categoryId: category._id.toString() 
        },
        { req: {
          headers: {
           authorization: "fakeString"
          } 
         }
        });
    expect(findByIdStub.calledOnce).to.be.true;
    expect(findByIdCategoryStub.calledOnce).to.be.true;
    expect(saveStub.calledOnce).to.be.true;
  });
});