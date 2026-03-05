import { Request, Response } from "express";
import Model from "../models/Model";
import { asyncHandler } from "../utils/asyncHandler";

export const listModels = asyncHandler(async (req: Request, res: Response) => {
  const models = await Model.find();
  res.json(models);
});
