import { User } from '@/models/user';
import { State, Country, Lga, Location } from '@/models/location';
import { redisClient } from '@/lib/initialize';
import { myLogger } from '@/app/api/upload/logger';
import { authRequest } from '@/app/api/datasource/user.data';
import _ from 'lodash';
import mongoose, { ObjectId } from 'mongoose';
import { MutationAddUserLocationArgs, MutationUpdateUserLocationArgs } from '@/lib/graphql-types';
import addressesData, { Addresses } from '@/app/api/datasource/addresses.data';
import { UserNotFoundError, CountryNotFoundError, StateNotFoundError, LgaNotFoundError, UnauthorizedError, LocationNotFoundError, DeletionError } from '@/app/lib/errors';
import { hasAccessTo } from '@/app/api/graphql/utils';


export const locationQueryResolvers = {

  getCountries: async (_parent: any, _: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access
      if (!hasAccessTo('viewCountries', role)) {
        throw new UnauthorizedError('You do not have permission to view Countries.');
      }
      if (!redisClient) {
        myLogger.error('Redis client is not connected!');
      } else {
        const cachedData = await redisClient.get('countries');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          return { countriesData: parsedData, statusCode: 200, ok: true };
        }
      }

      const countriesData = await Country.find();
      if (!countriesData) return { message: 'No country was found!', statusCode: 404, ok: false }
      const transformedData = countriesData.map((country: any) => ({
        id: country._id,
        name: country.name,
      }));
      if (redisClient) await redisClient.setEx('countries', 86400, JSON.stringify(transformedData));
      return { countriesData: transformedData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error fetching countries: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  getLgas: async (_parent: any, { state }: { state: string }, { user}: any) => {
    try {
      const role = user.role;

      // Check if the user has access
      if (!hasAccessTo('viewLgas', role)) {
        throw new UnauthorizedError('You do not have permission to view lgas.');
      }
      // check if the state is in the cache
      if (!redisClient) {
        myLogger.error('Redis client is not connected!');
      } else {
        const cachedData = await redisClient.get(state);
        if (cachedData) {
          return { lgasData: JSON.parse(cachedData), statusCode: 200, ok: true };
        }
      }
      const stateData = await State.findOne({ name: state });
      if (!stateData) return { message: 'State not found!', statusCode: 404, ok: false };
      const data = await stateData.populate('lgas');
      const oldDta = data.lgas;
      const lgasData = oldDta.map((lga: any) => ({
        id: lga._id,
        name: lga.name,
      }));
      // save it in redis cache for 24hours
      if (redisClient) await redisClient.setEx(state, 86400, JSON.stringify(lgasData));
      return { lgasData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error fetching lgas: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  getStates: async (_parent: any, { country }: { country: string }, { user }: any) => {
    try {
       const role = user.role;

      // Check if the user has access
      if (!hasAccessTo('viewStates', role)) {
        throw new UnauthorizedError('You do not have permission to view States.');
      }
      // check if the country is in the cache
      if (!redisClient) {
        myLogger.error('Redis client is not connected!');
      } else {
        const cachedData = await redisClient.get(country);
        if (cachedData) {
          return { statesData: JSON.parse(cachedData), statusCode: 200, ok: true };
        }
      }
      const countryData = await Country.findOne({ name: country });
      if (!countryData) return { message: 'Country not found!', statusCode: 404, ok: false };
      const data = await countryData.populate('states');
      let oldData = data.states;
      const statesData = oldData.map((state: any) => ({
        id: state._id,
        name: state.name,
        }));
      // save it in redis cache for 24hours
      if (redisClient) await redisClient.setEx(country, 86400, JSON.stringify(statesData));
      return { statesData, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error fetching states: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },

  getUserLocations: async (_parent: any, _: any, { user }: any) => {
    try {
      const role = user.role;

      // Check if the user has access
      if (!hasAccessTo('viewLocations', role)) {
        throw new UnauthorizedError('You do not have permission to view user location.');
      }

      const userInfo = await User.findById(user.id).populate('locations');
      if (!userInfo) {
        return { message: 'User not found!', statusCode: 404, ok: false };
      }
      return { locationsData: userInfo.locations, statusCode: 200, ok: true };
    } catch (error) {
      myLogger.error('Error fetching user locations: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };

      return { message: 'An error occurred!', statusCode: 500, ok: false };
    }
  },
};

export const locationMutationResolvers = {

  createLocation: async (_parent: any, { location }: { location: string }, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
       const role = user.role;

      // Check if the user has access to create Location
      if (!hasAccessTo('createLocation', role)) {
        throw new UnauthorizedError('You do not have permission to create Location.');
      }


      const addresses = addressesData[location as keyof Addresses];
      if (!addresses) {
        throw new CountryNotFoundError('The country was not found in the data provided!');
      }

      // Create the country
      let country = await Country.findOne({ name: location }).session(session);
      if (!country) {
        country = new Country({ name: location });
        await country.save({ session });
      }

      for (const state of Object.keys(addresses)) {
        let myState = await State.findOne({ name: state, country: country._id }).session(session);
        if (!myState) {
          myState = new State({ name: state, country: country._id });
          await myState.save({ session });
        }
        for (const lga of addresses[state as keyof Addresses]) {
          let myLga = await Lga.findOne({ name: lga, state: myState._id }).session(session);
          if (!myLga) {
            myLga = new Lga({ name: lga, state: myState._id });
            await myLga.save({ session });
          }
        }
      }
      await session.commitTransaction();
      return { message: 'Location created successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error creating location: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      if (error instanceof CountryNotFoundError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  addUserLocation: async (_parent: any, { address, lga, state, country, longitude, latitude }: MutationAddUserLocationArgs, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to add user location to user
      if (!hasAccessTo('addUserLocation', role)) {
        throw new UnauthorizedError('You do not have permission to add user location!');
      }

      let locationId;

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
      locationId = savedLocation._id;

      // Add location to user

      const userInfo = await User.findById(user.id).session(session);
      if (!userInfo) {
        throw new UserNotFoundError();
      }
      userInfo.locations.push(locationId as any);
      await userInfo.save({ session });
      await session.commitTransaction();
      return { locationId, statusCode: 201, ok: true, message: 'Location has been created successfully!' };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error creating location: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      if (error instanceof UserNotFoundError || error instanceof CountryNotFoundError || error instanceof StateNotFoundError || error instanceof LgaNotFoundError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      return { message: 'An error occurred while creating location', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  deleteUserLocation: async (_parent: any, { locationId }: { locationId: string }, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to delete user's location
      if (!hasAccessTo('deleteUserLocation', role)) {
        throw new UnauthorizedError('You do not have permission to delete User Location.');
      }


      const userInfo = await User.findById(user.id).session(session);
      if (!userInfo) {
        throw new UserNotFoundError();
      }

      const index = userInfo.locations.findIndex((location: any) => location.toString() === locationId);
      if (index === -1) {
        throw new LocationNotFoundError();
      }

      userInfo.locations.splice(index, 1);
      const location = await Location.findByIdAndDelete(locationId).session(session);
      if (!location) {
        throw new DeletionError();
      }

      await userInfo.save({ session });
      await session.commitTransaction();
      return { message: 'Location deleted successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error deleting location: ' + (error as Error).message);
      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      if (error instanceof UserNotFoundError || error instanceof LocationNotFoundError || error instanceof DeletionError) {
        return { message: error.message, statusCode: 400, ok: false };
      }

      return { message: 'An error occurred!', statusCode: 500, ok: false };
    } finally {
      session.endSession();
    }
  },

  updateUserLocation: async (_parent: any, { locationId, address, lga, state, country, longitude, latitude }: MutationUpdateUserLocationArgs, { user }: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const role = user.role;

      // Check if the user has access to update User Location
      if (!hasAccessTo('updateUserLocation', role)) {
        throw new UnauthorizedError('You do not have permission to update User Location.');
      }

      const userInfo = await User.findById(user.id).session(session);
      if (!userInfo) {
        throw new UserNotFoundError();
      }

      const index = userInfo.locations.findIndex((location: any) => location.toString() === locationId);
      if (index === -1) {
        throw new LocationNotFoundError();
      }

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

      // Update location
      const location = await Location.findByIdAndUpdate(locationId, {
        name: `${address}, ${lga}, ${state}, ${country}`,
        longitude,
        latitude
      }).session(session);
      if (!location) {
        throw new LocationNotFoundError();
      }

      await session.commitTransaction();
      return { message: 'Location updated successfully!', statusCode: 200, ok: true };
    } catch (error) {
      await session.abortTransaction();
      myLogger.error('Error updating location: ' + (error as Error).message);

      if (error instanceof UnauthorizedError) return { message: error.message, statusCode: 401, ok: false };
      if (error instanceof UserNotFoundError || error instanceof CountryNotFoundError || error instanceof StateNotFoundError || error instanceof LgaNotFoundError || error instanceof LocationNotFoundError) { 
        return { message: error.message, statusCode: 400, ok: false };
      }
    } finally {
      session.endSession();
    }
  }
};
