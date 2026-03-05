import { Router } from "express";
import { listGuides } from "../controllers/guides.controller";

const router = Router();

router.get("/", listGuides);

export default router;
