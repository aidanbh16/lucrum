import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
    PORT: process.env.PORT || "3001",
    DEV_DATABASE_URL: getEnv("DEV_DATABASE_URL"),
    JWT_SECRET: getEnv("JWT_SECRET"),
};