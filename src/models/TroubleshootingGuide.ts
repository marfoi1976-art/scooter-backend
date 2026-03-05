import mongoose, { Schema, Document } from "mongoose";

export interface ITroubleshootingGuide extends Document {
  title: string;
  keywords: string[];
  steps: string[];
  relatedParts: mongoose.Types.ObjectId[];
  relatedPrinciples: mongoose.Types.ObjectId[];
  models: mongoose.Types.ObjectId[];
}

const TroubleshootingGuideSchema = new Schema<ITroubleshootingGuide>({
  title: { type: String, required: true },
  keywords: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  relatedParts: [{ type: Schema.Types.ObjectId, ref: "Part" }],
  relatedPrinciples: [{ type: Schema.Types.ObjectId, ref: "Principle" }],
  models: [{ type: Schema.Types.ObjectId, ref: "Model" }]
});

export default mongoose.model<ITroubleshootingGuide>(
  "TroubleshootingGuide",
  TroubleshootingGuideSchema
);
