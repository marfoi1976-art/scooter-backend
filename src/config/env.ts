import dotenv from "dotenv";

dotenv.config();

const required = ["MONGO_URI", "PORT"] as const;

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

export const ENV = {
  MONGO_URI: process.env.MONGO_URI as string,
  PORT: parseInt(process.env.PORT || "3000", 10)
};
