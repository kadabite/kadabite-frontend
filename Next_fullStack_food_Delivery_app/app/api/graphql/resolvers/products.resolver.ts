import { myLogger } from '@/app/api/upload/logger';
import { IProduct, Product } from '@/models/product';
import Category from '@/models/category';
import { User } from '@/models/user';
import _ from 'lodash';
import mongoose, { ObjectId } from 'mongoose';
import { UnauthorizedError,
  CategoryNotFoundError,
  ProductAlreadyExistsError,
  ProductNotFoundError,
  UserNotFoundError } from '@/app/lib/errors';
import { hasAccessTo } from '@/app/api/graphql/utils';

export const productQueryResolver = {
  getProduct: async (_parent: any, { id }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get product
      if (!hasAccessTo('viewProducts', role)) {
        throw new UnauthorizedError('You do not have permission to get product.');
      }

      // Find the product by ID
      const productData = await Product.findById(id).session(session);
      if (!productData) {
        throw new ProductNotFoundError('No product was found!');
      }

      await session.commitTransaction();
      return { productData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof ProductNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getUserProducts: async (_parent: any, _: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get their products
      if (!hasAccessTo('viewProducts', role)) {
        throw new UnauthorizedError('You do not have permission to get your products.');
      }

      // Find the user and populate their products
      const userMe = await User.findById((user._id as ObjectId).toString()).populate('products').session(session);
      if (!userMe) {
        throw new UserNotFoundError('User not found!');
      }
      const productsData = userMe.products;

      await session.commitTransaction();
      return { productsData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting user products: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getAllProducts: async (_parent: any, p0: null, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get all products
      if (!hasAccessTo('viewProducts', role)) {
        throw new UnauthorizedError('You do not have permission to get all products.');
      }

      // Find all products
      const productsData = await Product.find().session(session);
      if (!productsData || productsData.length === 0) {
        return { message: 'No product was found!', statusCode: 404, ok: false };
      }

      await session.commitTransaction();
      return { productsData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      myLogger.error('Error getting all products: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getAllProductsOfUsersByCategory: async (_parent: any, { categoryId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to get products by category
      if (!hasAccessTo('viewProducts', role)) {
        throw new UnauthorizedError('You do not have permission to get products by category.');
      }

      const userMe = await User.findById((user._id as ObjectId).toString()).populate('products').session(session);
      if (!userMe) {
        throw new UserNotFoundError('User not found!');
      }

      // Type guard to check if product is populated
      const isProductPopulated = (product: mongoose.Types.ObjectId | IProduct): product is IProduct => {
        return (product as IProduct).categoryId !== undefined;
      };

      if (userMe.products && userMe.products.length > 0 && isProductPopulated(userMe.products[0])) {
        const productsData = userMe.products.filter(product => isProductPopulated(product) && product.categoryId.toString() === categoryId);
        await session.commitTransaction();
        return { productsData, statusCode: 200, ok: true };
      } else {
        throw new Error('User products not populated!');
      }
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error getting products: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },
}

export const productMutationResolver = {
  createProduct: async (_parent: any, args: { name: any; description: any; price: any; currency: any; categoryId: any; }, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to create a product
      if (!hasAccessTo('createProduct', role)) {
        throw new UnauthorizedError('You do not have permission to create a product.');
      }

      let { name, description, price, currency, categoryId } = args;
      // Trim whitespace from the input
      name = _.trim(name);
      description = _.trim(description);
      currency = _.trim(currency);

      // Get the category information, return error message if false
      const category = await Category.findById(categoryId).session(session);
      if (!category) {
        throw new CategoryNotFoundError('The product category ID must be specified!');
      }

      // Check if product name already exists for the user
      const userMe = await User.findById(user.id).populate('products').session(session);
      if (!userMe) {
        throw new UserNotFoundError('User not found!');
      }

      // Type guard to check if product is populated
      const isProductPopulated = (product: mongoose.Types.ObjectId | IProduct): product is IProduct => {
        return (product as IProduct).categoryId !== undefined;
      };

      if (userMe.products) {
        if (userMe.products.find((obj) => isProductPopulated(obj) && obj.name === name)) {
          throw new ProductAlreadyExistsError('Product name already exists');
        }
      }

      const productData = new Product({ name, description, price, currency, categoryId: category._id, userId: user._id });
      await productData.save({ session }); // Save the product first

      userMe.products.push(productData.id);
      await userMe.save({ session });

      await session.commitTransaction();
      // Return the created product
      return { productData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError || error instanceof CategoryNotFoundError || error instanceof ProductAlreadyExistsError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      myLogger.error('Error creating product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  deleteProduct: async (_parent: any, { id }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to delete a product
      if (!hasAccessTo('deleteProduct', role)) {
        throw new UnauthorizedError('You do not have permission to delete a product.');
      }

      const userData = await User.findById(user.id).populate('products').session(session);
      if (!userData) {
        throw new UserNotFoundError('User not found!');
      }

      const index = userData.products.map(item => item.toString()).indexOf(id);
      if (index === -1) {
        throw new ProductNotFoundError('This product does not exist for this user!');
      }

      userData.products.splice(index, 1);
      const product = await Product.findByIdAndDelete(id).session(session);
      if (product) {
        await userData.save({ session });
        await session.commitTransaction();
        return { message: 'Successfully deleted!', statusCode: 200, ok: true };
      } else {
        throw new ProductNotFoundError('Could not delete product!');
      }
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError || error instanceof ProductNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error deleting product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  updateProduct: async (_parent: any, { id, product, categoryId }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to update a product
      if (!hasAccessTo('updateProduct', role)) {
        throw new UnauthorizedError('You do not have permission to update a product.');
      }

      // Sanitize user's input
      const keys = Object.keys(product);
      const newProduct = keys
        .filter(key => !(key === 'id' || key === 'createdAt' || key === 'updatedAt'))
        .reduce((obj, key) => {
          if (key === 'description' || key === 'photo' || key === 'name') {
            (obj as Record<string, any>)[key] = _.trim(product[key]);
          } else {
            (obj as Record<string, any>)[key] = product[key];
          }
          return obj;
        }, {} as Record<string, any>);

      // Get the user data
      const userData = await User.findById(user.id).populate('products').session(session);
      if (!userData) {
        throw new UserNotFoundError('User not found!');
      }

      const index = userData.products.map(item => item.toString()).indexOf(id);
      if (index === -1) {
        throw new ProductNotFoundError('This product does not exist for this user!');
      }

      newProduct.updatedAt = new Date().toString();
      const category = await Category.findById(categoryId).session(session);
      if (!category) {
        throw new CategoryNotFoundError('This category does not exist!');
      }

      // Find the product and update it
      const productData = await Product.findByIdAndUpdate(id, newProduct, { new: true }).session(session);
      if (!productData) {
        throw new ProductNotFoundError('Could not update product!');
      }

      await session.commitTransaction();
      return { productData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError || error instanceof CategoryNotFoundError || error instanceof ProductNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error updating product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },
}
