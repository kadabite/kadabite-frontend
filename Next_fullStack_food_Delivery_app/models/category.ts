import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the Category document
interface ICategory extends Document {
  name: string;
}

// Define the schema for the Category model
const categorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, unique: true, maxlength: 100 },
});

// Create the Category model
const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
export type { ICategory };
