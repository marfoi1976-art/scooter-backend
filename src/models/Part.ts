import mongoose, { Schema, Document } from "mongoose";

export type SkillLevel = "beginner" | "intermediate" | "expert";
export type RiskLevel = "low" | "medium" | "critical";

export interface IPart extends Document {
  name: string;
  category: string;
  description: string;
  models: mongoose.Types.ObjectId[];

  // ─── SAFETY LAYER ───────────────────────────────────────────────
  // These fields exist because of Robert.
  // A person should never be able to order or install a part
  // without knowing exactly what they are getting into.

  skillLevelRequired: SkillLevel;       // What level of experience is needed
  toolsRequired: string[];              // Exact tools needed before starting
  safetyWarnings: string[];             // Warnings shown BEFORE purchase and install
  installationRisk: RiskLevel;          // How dangerous a wrong install is
  wrongInstallConsequences: string;     // What ACTUALLY happens if this goes wrong
  verificationSteps: string[];          // Steps to verify correct installation
  compatibilityNotes: string;           // What to check before ordering
}

const PartSchema = new Schema<IPart>({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  models: [{ type: Schema.Types.ObjectId, ref: "Model" }],

  // Safety fields
  skillLevelRequired: {
    type: String,
    enum: ["beginner", "intermediate", "expert"],
    required: true,
    default: "intermediate"
  },
  toolsRequired: [{ type: String }],
  safetyWarnings: [{ type: String }],
  installationRisk: {
    type: String,
    enum: ["low", "medium", "critical"],
    required: true,
    default: "medium"
  },
  wrongInstallConsequences: { type: String, required: true },
  verificationSteps: [{ type: String }],
  compatibilityNotes: { type: String, default: "" }
});

export default mongoose.model<IPart>("Part", PartSchema);
