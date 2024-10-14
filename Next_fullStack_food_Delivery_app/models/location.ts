import { ObjectEncodingOptions } from 'fs';
import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';

// Define interfaces for each schema
interface ILocation extends Document {
  name: string;
  longitude: string;
  latitude: string;
}

interface ILga extends Document {
  name: string;
  state: mongoose.Schema.Types.ObjectId;
}

interface IState extends Document {
  name: string;
  lgas: [];
  country: mongoose.Schema.Types.ObjectId;
}

interface ICountry extends Document {
  name: string;
  states: [];
}

// Define schemas with type annotations
const locationSchema: Schema<ILocation> = new Schema({
  name: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
});

const lgaSchema: Schema<ILga> = new Schema({
  name: { type: String, required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State'}
});

const stateSchema: Schema<IState> = new Schema({
  name: { type: String, required: true },
  lgas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lga' }],
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country'}
});

stateSchema.pre<IState>('save', async function(next) {
  const countryId = this.country;
  let country = await Country.findById(countryId as ObjectId);
  if (country) {
    const test = country.states.find((item) => item == this._id)
    if (!test) country.states.push(this._id as never)
    await country.save();
    return next();
  }
  next();
});

lgaSchema.pre<ILga>('save', async function(next) {
  const stateId = this.state;
  let state = await State.findById(stateId as ObjectId);
  if (state) {
    const test = state.lgas.find((item) => item == this._id)
    if (!test) state.lgas.push(this._id as never)
    await state.save();
    return next();
  }
  next();
});
const countrySchema: Schema<ICountry> = new Schema({
  name: { type: String, required: true },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }]
});

// Create models with type annotations
export const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', locationSchema);
export const Lga: Model<ILga> = mongoose.models.Lga || mongoose.model<ILga>('Lga', lgaSchema);
export const State: Model<IState> = mongoose.models.State || mongoose.model<IState>('State', stateSchema);
export const Country: Model<ICountry> = mongoose.models.Country || mongoose.model<ICountry>('Country', countrySchema);