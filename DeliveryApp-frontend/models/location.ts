import mongoose, { Document, Schema, Model } from 'mongoose';

// Define interfaces for each schema
interface ILocation extends Document {
  name: string;
  longitude: string;
  latitude: string;
}

interface ILga extends Document {
  name: string;
}

interface IState extends Document {
  name: string;
  lga: ILga[];
}

interface ICountry extends Document {
  name: string;
  state: IState[];
}

// Define schemas with type annotations
const locationSchema: Schema<ILocation> = new Schema({
  name: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
});

const lgaSchema: Schema<ILga> = new Schema({
  name: { type: String, required: true },
});

const stateSchema: Schema<IState> = new Schema({
  name: { type: String, required: true },
  lga: { type: [lgaSchema], required: true },
});

const countrySchema: Schema<ICountry> = new Schema({
  name: { type: String, required: true },
  state: { type: [stateSchema], required: true },
});

// Create models with type annotations
export const Location: Model<ILocation> = mongoose.model<ILocation>('Location', locationSchema);
export const Lga: Model<ILga> = mongoose.model<ILga>('Lga', lgaSchema);
export const State: Model<IState> = mongoose.model<IState>('State', stateSchema);
export const Country: Model<ICountry> = mongoose.model<ICountry>('Country', countrySchema);