import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User, IUser } from '@/models/user';
import { Product } from '@/models/product';
import { State, Country, Lga, Location } from '@/models/location';
import Category from '@/models/category';
import { redisClient } from '@/lib/initialize';
import { myLogger } from '@/app/api/upload/logger';
import _ from 'lodash';
import mongoose, { ObjectId } from 'mongoose';
import jwt  from 'jsonwebtoken';
import { MutationCreateUserArgs, MutationRegisterUserArgs, MutationForgotPasswordArgs, MutationUpdatePasswordArgs, QueryGetNewAccessTokenArgs, MutationCreateCategoriesArgs, MutationDeleteCategoryArgs, MutationUpdateUserArgs } from '@/lib/graphql-types';
import { UserAlreadyExistsError, ProductNotFoundError, CategoryNotFoundError, UnauthorizedError, CountryNotFoundError, StateNotFoundError, LgaNotFoundError, UserNotFoundError, InvalidCredentialsError,  CategoryAlreadyExistsError, InvalidCategoryFormatError } from '@/app/lib/errors';
import { hasAccessTo } from '@/app/api/graphql/utils';


export const userQueryResolvers = {
  category: async (_parent: any, { id }: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to view categories
      if (!hasAccessTo('viewCategories', role)) {
        throw new UnauthorizedError('You do not have permission to view categories.');
      }

      const categoryData = await Category.findById(id);
      if (!categoryData) {
        throw new CategoryNotFoundError('Category not found');
      }

      return { categoryData, statusCode: 200, ok: true };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof CategoryNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error fetching category: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  categories: async (_parent: any, _: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to view categories
      if (!hasAccessTo('viewCategories', role)) {
        throw new UnauthorizedError('You do not have permission to view categories.');
      }

      const categoriesData = await Category.find();
      return { categoriesData, statusCode: 200, ok: true };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      myLogger.error('Error fetching categories: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  findFoods: async (_parent: any, { productName }: any, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to find foods
      if (!hasAccessTo('findFoods', role)) {
        throw new UnauthorizedError('You do not have permission to find foods.');
      }

      // Find the product by their name
      const productsData = await Product.find({ name: _.trim(productName) }).session(session);
      if (!productsData || productsData.length === 0) {
        throw new ProductNotFoundError('No product was found!');
      }

      // Map the product data to include user information
      const foodsData = await Promise.all(productsData.map(async (data) => {
        const user = await User.findById(data.userId).session(session);
        return {
          id: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          currency: data.currency,
          userId: data.userId,
          username: user?.username,
          businessDescription: user?.businessDescription,
          products: user?.products,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
          createdAt: data.createdAt,
          photo: data.photo,
          addressSeller: user?.addressSeller,
        };
      }));

      await session.commitTransaction();
      return { foodsData, statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof ProductNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error fetching foods: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  getNewAccessToken: async (_parent: any, { refreshToken }: QueryGetNewAccessTokenArgs ) => {
    try {
      if (!refreshToken) {
        return { message: 'Refresh token is missing!', statusCode: 401, ok: false };
      }
      const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY as string);
      if (!verified) {
        return { message: 'Refresh token is invalid!', statusCode: 401, ok: false };
      }
      const user = await User.findById((verified as any).userId);
      if (!user) {
        return { message: 'User not found!', statusCode: 404, ok: false };
      }
      if (!user.isLoggedIn) {
        return { message: 'User is not logged in!', statusCode: 401, ok: false };
      }
      const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET_KEY as string, { expiresIn: `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN}d` });
      return { token: accessToken, ok: true, statusCode: 200 };
    } catch (error) {
      myLogger.error('Error getting new access token: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  user: async (_parent: any, _: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to view users
      if (!hasAccessTo('viewUsers', role)) {
        throw new UnauthorizedError('You do not have permission to view users.');
      }

      const userData = await User.findById(user.id);
      if (!userData) {
        throw new UserNotFoundError('User not found');
      }

      return { userData, statusCode: 200, ok: true };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error fetching user: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  users: async (_parent: any, _: any, { user }: any) => {
    const role = user.role;

    // Check if the user has access to view users
    if (!hasAccessTo('viewUsers', role)) {
      throw new UnauthorizedError('You do not have permission to view users.');
    }
    try {
      const usersData = await User.find();
      if (!usersData) {
        throw new UserNotFoundError();
      }
      return { usersData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error fetching users: ' + (error as Error).message);
      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },
}

export const userMutationResolvers = {
  createCategory: async (_parent: any, { name }: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to create categories
      if (!hasAccessTo('createCategory', role)) {
        throw new UnauthorizedError('You do not have permission to create categories.');
      }

      // Trim leading and ending whitespaces if any
      name = _.trim(name);
      const listCategories = ['Consumable Products', 'Non-Consumable Products'];

      // Define the category format regex
      const categoryFormat = /^([\w\s]+)\|[\w\s]+\|[\w\s]+$/;

      // Validate category format
      if (!categoryFormat.test(name)) {
        throw new InvalidCategoryFormatError('Invalid category format');
      }

      // Execute the regex and check if the result is not null
      const match = categoryFormat.exec(name);
      if (match && match[1]) {
        const mainName = match[1];
        if (!listCategories.includes(mainName)) {
          throw new InvalidCategoryFormatError('Invalid category name');
        }
      } else {
        throw new InvalidCategoryFormatError('Invalid category format');
      }

      // Check if category already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        throw new CategoryAlreadyExistsError('Category already exists');
      }

      // Create and save new category
      const category = new Category({ name });
      const categoryData = await category.save();
      return { categoryData, statusCode: 201, ok: true };

    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof InvalidCategoryFormatError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      if (error instanceof CategoryAlreadyExistsError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      myLogger.error('Error creating category: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  createCategories: async (_parent: any, { name }: MutationCreateCategoriesArgs, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to create categories
      if (!hasAccessTo('createCategories', role)) {
        throw new UnauthorizedError('You do not have permission to create categories.');
      }

      // Validate input
      if (!Array.isArray(name)) {
        throw new InvalidCategoryFormatError('Name must be an array');
      }
      if (name.length === 0) {
        throw new InvalidCategoryFormatError('Name cannot be empty');
      }

      const listCategories = ['Consumable Products', 'Non-Consumable Products'];
      const categoryFormat = /^([\w\s]+)\|[\w\s]+\|[\w\s]+$/;

      for (let singleName of name) {
        try {
          // Trim leading and ending whitespaces if any
          singleName = _.trim(singleName);

          // Validate category format
          if (!categoryFormat.test(singleName)) {
            throw new InvalidCategoryFormatError('Invalid category format');
          }

          // Validate input
          const match = categoryFormat.exec(singleName);
          if (match && match[1]) {
            const mainName = match[1];
            if (!listCategories.includes(mainName)) {
              throw new InvalidCategoryFormatError('Invalid category name');
            }
          } else {
            throw new InvalidCategoryFormatError('Invalid category format');
          }

          // Check if category already exists
          const existingCategory = await Category.findOne({ name: singleName });
          if (existingCategory) {
            throw new CategoryAlreadyExistsError('Category already exists');
          }

          // Create and save new category
          const category = new Category({ name: singleName });
          await category.save();
        } catch (error) {
          if (error instanceof InvalidCategoryFormatError || error instanceof CategoryAlreadyExistsError) {
            return { message: error.message, statusCode: 400, ok: false };
          }

          myLogger.error('Error creating category: ' + (error as Error).message);
          return { message: 'An error occurred!', statusCode: 500, ok: false };
        }
      }

      return { message: 'Many categories have been created successfully!', ok: true, statusCode: 201 };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof InvalidCategoryFormatError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      if (error instanceof CategoryAlreadyExistsError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      myLogger.error('Error creating categories: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  createUser: async (_parent: any, args: MutationCreateUserArgs, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user?.role;

      // Check if the user has access to create a user
      if (!hasAccessTo('createUser', role)) {
        throw new UnauthorizedError('You do not have permission to create a user.');
      }

      const { email, password, phoneNumber } = args;

      // Check if email or phoneNumber is provided
      if (!email && !phoneNumber) {
        throw new InvalidCredentialsError();
      }

      // Check if email or phoneNumber is already taken
      let existingUser;
      if (email) {
        existingUser = await User.findOne({ email }).session(session);
      } else if (phoneNumber) {
        existingUser = await User.findOne({ phoneNumber }).session(session);
      } else {
        existingUser = null;
        throw new InvalidCredentialsError();
      }

      if (existingUser) {
        throw new UserAlreadyExistsError();
      }

      // Determine username
      let username;
      if (email) {
        username = _.trim(email);
      } else if (phoneNumber) {
        username = _.trim(phoneNumber);
      }

      // Create new user
      const newUser = new User({
        username: _.trim(username),
        email: email ? _.trim(email) : '',
        passwordHash: _.trim(password),
        phoneNumber: phoneNumber ? _.trim(phoneNumber) : '',
        isRegistered: false, // Set isRegistered to false
      });
      const userData = await newUser.save({ session });
      await session.commitTransaction();
      return { userData, statusCode: 201, ok: true, message: 'User has been registered successfully!' };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error creating user: ' + (error as Error).message);

      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserAlreadyExistsError || error instanceof InvalidCredentialsError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      return { message: 'An error occurred while creating user', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  registerUser: async (_parent: any, args: MutationRegisterUserArgs, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user?.role;

      // Check if the user has access to register a user
      if (role && !hasAccessTo('registerUser', role)) {
        throw new UnauthorizedError('You do not have permission to register a user.');
      }

      const {
        username,
        email,
        phoneNumber,
        userType,
        firstName,
        lastName,
        vehicleNumber,
        latitude,
        longitude,
        lga,
        state,
        country,
        address
      } = args;

      // Check if user exists
      const existingUser = await User.findById(user.id).session(session);
      if (!existingUser) {
        throw new UserNotFoundError();
      }

      // Check if user is already registered
      if (existingUser.isRegistered) {
        return { message: 'User is already registered!', statusCode: 400, ok: false };
      }

      // Ensure address, lga, state, and country are provided
      if (!address || !lga || !state || !country) {
        throw new Error('Address, LGA, state, and country are mandatory.');
      }

      // Find location
      let locationId: mongoose.Types.ObjectId | undefined;
      // Find country
      let countryDoc = await Country.findOne({ name: country }).session(session);
      if (!countryDoc) {
        throw new CountryNotFoundError();
      }

      // Find state
      let stateDoc = await State.findOne({ name: state, country: countryDoc._id }).session(session);
      if (!stateDoc) {
        throw new StateNotFoundError();
      }

      // Find lga
      let lgaDoc = await Lga.findOne({ name: lga, state: stateDoc._id }).session(session);
      if (!lgaDoc) {
        throw new LgaNotFoundError();
      }

      // Create location
      const location = new Location({
        name: `${address}, ${lga}, ${state}, ${country}`,
        longitude,
        latitude
      });
      const savedLocation = await location.save({ session });
      locationId = savedLocation._id as mongoose.Types.ObjectId;

      // Update user
      existingUser.firstName = _.trim(firstName);
      existingUser.lastName = _.trim(lastName);
      existingUser.username = _.trim(username);
      existingUser.email = existingUser.email ? existingUser.email : _.trim(email);
      existingUser.phoneNumber = existingUser.phoneNumber ? existingUser.phoneNumber : _.trim(phoneNumber);
      if (userType && ["seller", "buyer", "dispatcher"].includes(userType)) {
        existingUser.userType = userType as IUser["userType"];
      }
      existingUser.vehicleNumber = vehicleNumber ? _.trim(vehicleNumber) : existingUser.vehicleNumber;
      existingUser.locations = locationId ? [locationId] : [];
      existingUser.isRegistered = true; // Set isRegistered to true

      const updatedUser = await existingUser.save({ session });
      await session.commitTransaction();
      return { userData: updatedUser, statusCode: 200, ok: true, message: 'User has been registered successfully!' };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error updating user: ' + (error as Error).message);

      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError || error instanceof CountryNotFoundError || error instanceof StateNotFoundError || error instanceof LgaNotFoundError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      return { message: 'An error occurred while updating user', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  deleteCategory: async (_parent: any, { id }: MutationDeleteCategoryArgs, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to delete categories
      if (!hasAccessTo('deleteCategory', role)) {
        throw new UnauthorizedError('You do not have permission to delete categories.');
      }

      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        throw new CategoryNotFoundError('Category not found');
      }

      return { message: 'Category has been deleted successfully!', statusCode: 200, ok: true };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof CategoryNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error deleting category: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  deleteUser: async (_parent: any, _: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to delete users
      if (!hasAccessTo('deleteUser', role)) {
        throw new UnauthorizedError('You do not have permission to delete users.');
      }

      const delUser = await User.findByIdAndUpdate(user.id, { isDeleted: true });
      if (!delUser) {
        throw new UserNotFoundError('Could not delete user!');
      }

      return { message: 'User deleted successfully!', statusCode: 200, ok: true };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error deleting user: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  forgotPassword: async (_parent: any, { email }: MutationForgotPasswordArgs) => {
      try {
        email = _.trim(email);
        const user = await User.findOne({ email });
        if (!user) {
          return { message: 'User was not found!', statusCode: 404, ok: true };
        }

        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        const token = uuidv4() + uuidv4();
        const resetPasswordToken = `${token} ${expiryDate.toISOString()}`;

        const updated = await User.findByIdAndUpdate(user.id, { resetPasswordToken });
        if (!updated) {
          return { message: 'Could not update user!', statusCode: 500, ok: true };
        }
        const user_data = {
          id: user.id,
          to: email,
          subject: "Reset token for forgot password",
          token,
          uri: undefined,
        };
        if (!redisClient) {
          myLogger.error('Redis client is not connected!, cannot queue user data for forgotten password');
          return { message: 'An error occurred!', statusCode: 500, ok: true };
        }
        // Add data to the queue
        redisClient.lPush('user_data_queue', JSON.stringify(user_data));
        return { message: 'Get the reset token from your email', statusCode: 200, ok: true };
      } catch (error) {
        myLogger.error('Error changing password: ' + (error as Error).message);
        return { message: 'An error occurred!', statusCode: 500, ok: true };
      }
  },

  updateUser: async (_parent: any, args: MutationUpdateUserArgs, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access to update users
      if (!hasAccessTo('updateUser', role)) {
        throw new UnauthorizedError('You do not have permission to update users.');
      }

      // Filter out undefined values from args
      const keys = Object.keys(args);
      const filteredArgs = keys.reduce((acc: Partial<MutationUpdateUserArgs>, key) => {
        if (args[key as keyof MutationUpdateUserArgs] !== undefined) {
          acc[key as keyof MutationUpdateUserArgs] = args[key as keyof MutationUpdateUserArgs];
        }
        return acc;
      }, {});

      const updated = await User.findByIdAndUpdate((user._id as ObjectId).toString(), filteredArgs, { new: true });
      if (!updated) {
        throw new UserNotFoundError('User not found');
      }

      return { message: 'Updated successfully', statusCode: 200, ok: true };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return { message: error.message, statusCode: 403, ok: false };
      }

      if (error instanceof UserNotFoundError) {
        return { message: error.message, statusCode: 404, ok: false };
      }

      myLogger.error('Error updating user: ' + (error as Error).message);
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  updatePassword: async (_parent: any, { email, password, token }: MutationUpdatePasswordArgs) => {
      try {
        email = _.trim(email);
        const user = await User.findOne({ email });
        if (!user) {
          return { message: 'User was not found!', statusCode: 404, ok: false };
        }

        const resetPasswordToken = user.resetPasswordToken;
        if (!resetPasswordToken) {
          return { message: 'Reset password token is missing!', statusCode: 401, ok: false };
        }

        const [storedToken, expiryDateStr] = resetPasswordToken.split(' ');
        const expiryDate = new Date(expiryDateStr);
        const presentDate = new Date();

        if (expiryDate <= presentDate) {
          return { message: 'Reset password token has expired!', statusCode: 401, ok: false };
        }

        if (token !== storedToken) {
          return { message: 'Invalid reset password token!', statusCode: 401, ok: false };
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(user.id, { passwordHash, resetPasswordToken: null });

        return { message: 'Password updated successfully', statusCode: 200, ok: true };
      } catch (error) {
        myLogger.error('Error updating password: ' + (error as Error).message);
        return { message: 'An error occurred!', statusCode: 500, ok: false };
      }
  },
}
