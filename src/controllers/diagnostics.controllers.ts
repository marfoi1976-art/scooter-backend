import { Request, Response } from "express";
import { InferenceEngine } from "../services/inference.service";
import { EntityResolver } from "../services/entity-resolver.service";
import { AssistantFormatter } from "../services/assistant-formatter.service";

export const runDiagnostics = async (req: Request, res: Response) => {
  try {
    const { symptoms, model } = req.body;

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({ error: "Invalid or missing 'symptoms' array" });
    }

    const resolved = await EntityResolver.resolve(symptoms, model);
    const inference = await InferenceEngine.run(resolved);
    const formatted = AssistantFormatter.format(inference);

    return res.json(formatted);
  } catch (error) {
    console.error("Diagnostics error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
