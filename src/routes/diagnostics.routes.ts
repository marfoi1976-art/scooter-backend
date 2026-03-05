import { Router } from "express";
import { runDiagnostics } from "../controllers/diagnostics.controllers";

const router = Router();

router.post("/run", runDiagnostics);

export default router;
