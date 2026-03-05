import Model from "../models/Model";
import Part from "../models/Part";
import Principle from "../models/Principle";

export class EntityResolver {
  static async resolve(symptoms: string[], modelName?: string) {
    const normalizedSymptoms = symptoms.map((s) => s.toLowerCase().trim());

    let model = null;
    if (modelName) {
      model = await Model.findOne({ name: new RegExp(`^${modelName}$`, "i") });
    }

    const parts = await Part.find();
    const matchedParts = parts.filter((part) =>
      normalizedSymptoms.some((sym) => sym.includes(part.name.toLowerCase()))
    );

    const principles = await Principle.find();
    const matchedPrinciples = principles.filter((p) =>
      normalizedSymptoms.some((sym) => sym.includes(p.keyword.toLowerCase()))
    );

    return {
      symptoms: normalizedSymptoms,
      model,
      matchedParts,
      matchedPrinciples
    };
  }
}
