import { Router } from "express";
import { listParts, getPartById } from "../controllers/parts.controller";

const router = Router();

router.get("/", listParts);
router.get("/:id", getPartById);

export default router;
