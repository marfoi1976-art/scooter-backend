import mongoose, { Schema, Document } from "mongoose";

export interface IPrinciple extends Document {
  name: string;
  keyword: string;
  description: string;
}

const PrincipleSchema = new Schema<IPrinciple>({
  name: { type: String, required: true, unique: true },
  keyword: { type: String, required: true },
  description: { type: String, required: true }
});

export default mongoose.model<IPrinciple>("Principle", PrincipleSchema);
