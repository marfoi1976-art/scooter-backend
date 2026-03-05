import { Request, Response } from "express";
import TroubleshootingGuide from "../models/TroubleshootingGuide";
import { asyncHandler } from "../utils/asyncHandler";

export const listGuides = asyncHandler(async (req: Request, res: Response) => {
  const guides = await TroubleshootingGuide.find()
    .populate("relatedParts")
    .populate("relatedPrinciples")
    .populate("models");
  res.json(guides);
});
