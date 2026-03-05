import mongoose, { Schema, Document } from "mongoose";

export interface IModel extends Document {
  name: string;
  manufacturer: string;
}

const ModelSchema = new Schema<IModel>({
  name: { type: String, required: true, unique: true },
  manufacturer: { type: String, required: true }
});

export default mongoose.model<IModel>("Model", ModelSchema);
