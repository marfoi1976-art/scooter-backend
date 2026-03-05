import { Router } from "express";
import { listModels } from "../controllers/models.controller";

const router = Router();

router.get("/", listModels);

export default router;
