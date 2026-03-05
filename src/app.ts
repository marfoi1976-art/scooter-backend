import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import diagnosticsRoutes from "./routes/diagnostics.routes";
import modelsRoutes from "./routes/models.routes";
import partsRoutes from "./routes/parts.routes";
import principlesRoutes from "./routes/principles.routes";
import guidesRoutes from "./routes/guides.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/diagnostics", diagnosticsRoutes);
app.use("/api/models", modelsRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/principles", principlesRoutes);
app.use("/api/guides", guidesRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Central error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

export default app;
