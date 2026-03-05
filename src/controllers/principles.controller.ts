import { Request, Response } from "express";
import Principle from "../models/Principle";
import { asyncHandler } from "../utils/asyncHandler";

export const listPrinciples = asyncHandler(async (req: Request, res: Response) => {
  const principles = await Principle.find();
  res.json(principles);
});
