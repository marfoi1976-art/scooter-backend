import app from "./app";
import { connectDB } from "./config/database";
import { ENV } from "./config/env";

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
};

startServer();
