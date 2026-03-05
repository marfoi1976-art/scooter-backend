import { Request, Response } from "express";
import Part from "../models/Part";
import { asyncHandler } from "../utils/asyncHandler";

export const listParts = asyncHandler(async (req: Request, res: Response) => {
  const parts = await Part.find().populate("models");
  res.json(parts);
});

export const getPartById = asyncHandler(async (req: Request, res: Response) => {
  const part = await Part.findById(req.params.id).populate("models");
  if (!part) return res.status(404).json({ error: "Part not found" });
  res.json(part);
});
