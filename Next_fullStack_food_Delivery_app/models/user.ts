import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IProduct } from '@/models/product';

// Define the interface for the User document
interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  username: string;
  passwordHash: string;
  email: string;
  phoneNumber: string;
  resetPasswordToken?: string;
  createdAt: Date;
  updatedAt: Date;
  lgaId?: mongoose.Types.ObjectId;
  vehicleNumber?: string;
  isLoggedIn: boolean;
  isDeleted: boolean;
  role: string;
  userType: 'seller' | 'buyer' | 'dispatcher';
  sellerStatus: 'available' | 'busy' | 'null';
  dispatcherStatus: 'available' | 'busy' | 'null';
  buyerStatus: 'available' | 'busy' | 'null';
  photo?: string;
  products: mongoose.Types.ObjectId[] | IProduct[];
  addressSeller?: mongoose.Types.ObjectId;
  addressBuyer?: mongoose.Types.ObjectId;
  addressDispatcher?: mongoose.Types.ObjectId;
  businessDescription?: string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, maxlength: 50 },
  lastName: { type: String, maxlength: 50 },
  username: { type: String, required: true, unique: true, collation: { locale: 'en', strength: 2 }, maxlength: 50 },
  passwordHash: { type: String },
  email: { type: String, required: true, unique: true, collation: { locale: 'en', strength: 2 }, maxlength: 100 },
  phoneNumber: { type: String, required: true, unique: true, collation: { locale: 'en', strength: 2 }, maxlength: 50 },
  resetPasswordToken: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  lgaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  vehicleNumber: { type: String },
  isLoggedIn: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  userType: { type: String, enum: ['seller', 'buyer', 'dispatcher'], default: 'buyer' },
  sellerStatus: { type: String, enum: ['available', 'busy', 'null'], default: 'null' },
  dispatcherStatus: { type: String, enum: ['available', 'busy', 'null'], default: 'null' },
  buyerStatus: { type: String, enum: ['available', 'busy', 'null'], default: 'null' },
  photo: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  addressSeller: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  addressBuyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  addressDispatcher: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  businessDescription: { type: String, maxlength: 300 },
});

// Pre-save hook to hash the password
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Create the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export { userSchema, User };
export type { IUser };
