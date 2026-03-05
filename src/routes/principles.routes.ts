import { Router } from "express";
import { listPrinciples } from "../controllers/principles.controller";

const router = Router();

router.get("/", listPrinciples);

export default router;
