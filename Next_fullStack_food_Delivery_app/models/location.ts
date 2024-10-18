import mongoose, { Document, Schema, Model, ObjectId, CallbackError } from 'mongoose';

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
  lgas: mongoose.Schema.Types.ObjectId[];
  country: mongoose.Schema.Types.ObjectId;
}

interface ICountry extends Document {
  name: string;
  states: mongoose.Schema.Types.ObjectId[];
}

// Define schemas with type annotations
const locationSchema: Schema<ILocation> = new Schema({
  name: { type: String, required: true, unique: true },
  longitude: { type: String },
  latitude: { type: String },
});

const lgaSchema = new Schema<ILga>({
  name: { type: String, required: true, unique: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
});

const stateSchema = new Schema<IState>({
  name: { type: String, required: true, unique: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  lgas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lga' }]
});

const countrySchema: Schema<ICountry> = new Schema({
  name: { type: String, required: true, unique: true },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }]
});

stateSchema.pre<IState>('save', async function (next: (err?: CallbackError | undefined) => void) {
  try {
    const countryId = this.country;
    let country = await Country.findById(countryId as ObjectId);
    if (country) {
      const test = country.states.find((item) => item.toString() === (this._id as ObjectId).toString());
      if (!test) {
        country.states.push(this._id as ObjectId);
        await country.save();
      }
    }
    next();
  } catch (error) {
    next(error as CallbackError);
  } 
});

lgaSchema.pre<ILga>('save', async function (next: (err?: CallbackError | undefined) => void) {
  try {
    const stateId = this.state;
    let state = await State.findById(stateId as ObjectId);
    if (state) {
      const test = state.lgas.find((item) => item.toString() === (this._id as ObjectId).toString());
      if (!test) {
        state.lgas.push(this._id as mongoose.Schema.Types.ObjectId);
        await state.save();
      }
    }
    next();
  } catch (error) {
    next(error as CallbackError);
  } 
});

// Create models with type annotations
export const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>('Location', locationSchema);
export const Lga: Model<ILga> = mongoose.models.Lga || mongoose.model<ILga>('Lga', lgaSchema);
export const State: Model<IState> = mongoose.models.State || mongoose.model<IState>('State', stateSchema);
export const Country: Model<ICountry> = mongoose.models.Country || mongoose.model<ICountry>('Country', countrySchema);
