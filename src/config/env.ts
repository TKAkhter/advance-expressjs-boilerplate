import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  TZ: z.string().default("UTC"),
  BASE_URL: z.string().url(),
  BASE_URL_HTTPS: z.string().url().optional(),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  SERVER_TIMEOUT: z.string().default("150s"),
  LOG_FILE_DURATION: z.string().default("3d"),
  ALLOW_ORIGIN: z.string(),
  APP_URL: z.string().url(),
  LOGS_DIRECTORY: z.string(),

  // Basic Auth Secrets
  JWT_SECRET: z.string(),
  JWT_SECRET_EXPIRATION: z.string().default("1d"),
  HASH: z.string().transform((val) => parseInt(val, 10)),
  GENERATED_PASSWORD_LENGTH: z.string().default("10"),

  // DB Configuration
  REDIS_URL: z.string(),
  MONGODB_URI: z.string().url(),

  ENABLE_WINSTON: z.enum(["0", "1"]).default("0"),
  LOGS_TYPE: z.enum(["mongodb", "directory"]).default("mongodb"),
  MONGODB_ERROR_COLLECTION_NAME: z.string(),

  // Mail sender
  MAILGUN_API_KEY: z.string().optional(),
  MAILGUN_DOMAIN: z.string().optional(),
  MAILGUN_SENDER_EMAIL: z.string().optional(),
  MAILGUN_NAME: z.string().optional(),
});

export const env = envSchema.parse(process.env);
