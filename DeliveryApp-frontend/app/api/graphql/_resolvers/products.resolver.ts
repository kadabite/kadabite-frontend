import { myLogger } from '@/app/api/upload/logger';
import { IProduct, Product } from '@/models/product';
import Category from '@/models/category';
import { User } from '@/models/user';
import { authRequest } from '@/app/api/graphql/utils';
import _ from 'lodash';
import mongoose from 'mongoose';


export const productQueryResolver = {
  getProduct: async (_parent: any, { id }: any) => {
    try {
      const productData = await Product.findById(id);
      if (!productData) return { message: 'No product was found!', statusCode: 404, ok: false }
      return { productData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error getting product: ' + (error as Error).message);
      return { message: 'An error occured!', statusCode: 500, ok: false };
    }
  },

  getUserProducts: async (_parent: any, _: any, { req }: any) => {
    // authenticate user
    const response = await authRequest(req.headers.authorization);
    if (!response.ok) {
      const message = await response.json();
      return { statusCode: response.status, message: message.message, ok: response.ok };
    }
    const { user } = await response.json();

    try {
      const userMe = await User.findById(user._id).populate('products');
      if (!userMe) {
        return { message: 'User not found!', statusCode: 404, ok: false };
      }
      const productsData = userMe.products;
      return { productsData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error getting users product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  getAllProducts: async (_parent: any) => {
    try {
      const productsData = await Product.find();
      if (!productsData) return { message: 'No product was found!', statusCode: 404, ok: false }
      return { productsData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error getting all products: ' + (error as Error).message);
      return { message: 'An error occured!', statusCode: 500, ok: false };
    }
  },

  getAllProductsOfUsersByCategory: async (_parent: any, { categoryId }: any, { req }: any) => {
    // authenticate user
    const response = await authRequest(req.headers.authorization);
    if (!response.ok) {
      const message = await response.json();
      return { statusCode: response.status, message: message.message, ok: response.ok };
    }
    const { user } = await response.json();

    try {
      const userMe = await User.findById(user._id).populate('products');
      if (!userMe) {
        return { message: 'User not found!', statusCode: 404, ok: false };
      }

      // Type guard to check if payment is populated
      const isProductPopulated = (product: mongoose.Types.ObjectId | IProduct): product is IProduct => {
        return (product as IProduct).categoryId !== undefined;
      };
      if (userMe.products && userMe.products.length > 0 && isProductPopulated(userMe.products[0])) {
        const productsData = userMe.products.filter(product => isProductPopulated(product) && product.categoryId.toString() === categoryId);
        return { productsData, statusCode: 200, ok: true };
      } else {
        return { message: 'User products not populated!', statusCode: 404, ok: false };
      }
    } catch (error) {
      myLogger.error('Error getting products ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },
}

export const productMutationResolver = {
  createProduct: async (_parent: any, args: { name: any; description: any; price: any; currency: any; categoryId: any; }, { req }: any) => {
    // authenticate user
    const response = await authRequest(req.headers.authorization);
    if (!response.ok) {
      const message = await response.json();
      return { statusCode: response.status, message: message.message, ok: response.ok };
    }
    const { user } = await response.json();

    try {

      let { name, description, price, currency, categoryId } = args;
      // trim whitespace from the input
      name = _.trim(name);
      description = _.trim(description);
      currency = _.trim(currency);

      // Get the category information, return error message if false
      const category = await Category.findById(categoryId);
      if (!category) return { 'message': 'The product category ID must be specified!', statusCode: 400, ok: false };
      // check if product name already exist for the user
      const userMe = await User.findById(user._id).populate('products');
      if (!userMe) {
        return { message: 'User not found!', statusCode: 404, ok: false };
      }
      // Type guard to check if payment is populated
      const isProductPopulated = (product: mongoose.Types.ObjectId | IProduct): product is IProduct => {
        return (product as IProduct).categoryId !== undefined;
      };
      if (userMe.products) {
        if (userMe.products.find((obj) => isProductPopulated(obj) && obj.name === name)) return { 'message': 'product name already exist', statusCode: 400, ok: false }
      }
      const productData = new Product({ name, description, price, currency, categoryId: category._id, userId: user._id });
      await productData.save(); // Save the product first

      // const userMe = await User.findById(user._id);
      userMe.products.push(productData.id);
      await userMe.save();

      // Return the created product
      return { productData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error creating product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  deleteProduct: async (_parent: any, { id }: any, { req }: any) => {
    // authenticate user
    const response = await authRequest(req.headers.authorization);
    if (!response.ok) {
      const message = await response.json();
      return { statusCode: response.status, message: message.message, ok: response.ok };
    }
    const { user } = await response.json();

    try {
      const userData = await User.findById(user._id).populate('products');
      if (!userData) return { 'message': 'User not found!', statusCode: 404, ok: false };
      const index = userData.products.map(item => item.toString()).indexOf(id);
      if (index == -1) return { 'message': 'This Product does not exist for this user!', statusCode: 404, ok: false };
      userData.products.splice(index, 1);
      const product = await Product.findByIdAndDelete(id);
      if (product) {
        await userData.save();
        return { 'message': 'Successfully deleted!', statusCode: 200, ok: true };
      } else return { 'message': 'Could not delete product!', statusCode: 401, ok: false };
    } catch (error) {
      myLogger.error('Error deleting product: ' + (error as Error).message);
      return { 'message': 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  updateProduct: async (_parent: any, { id, product, categoryId }: any, { req }: any) => {
    // authenticate user
    const response = await authRequest(req.headers.authorization);
    if (!response.ok) {
      const message = await response.json();
      return { statusCode: response.status, message: message.message, ok: response.ok };
    }
    const { user } = await response.json();

    try {
      // Sanitize users input
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
      const userData = await User.findById(user._id).populate('products');
      if (!userData) return { 'message': 'User not found!', statusCode: 404, ok: false };
      const index = userData.products.map(item => item.toString()).indexOf(id);
      if (index == -1) return { 'message': 'This Product does not exist for this user!', statusCode: 404, ok: false };
      newProduct.updatedAt = new Date().toString();
      const category = await Category.findById(categoryId);
      if (!category) return { 'message': 'This category does not exist!', statusCode: 404, ok: false };
      // Find the product and update it
      const productData = await Product.findByIdAndUpdate(id, product);
      if (!productData) return { 'message': 'Could not update product!', statusCode: 400, ok: false };
      return { productData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error updating product: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  }
}
