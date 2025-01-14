import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["local", "development", "production"]).default("local"),
  TZ: z.string().default("UTC"),
  BASE_URL: z.string().url(),
  BASE_URL_HTTPS: z.string().url().optional(),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  SERVER_TIMEOUT: z.string().default("150s"),
  LOG_FILE_DURATION: z.string().default("3d"),
  ALLOW_ORIGIN: z.string(),
  APP_URL: z.string().url(),

  // Redis Configuration
  REDIS_URL: z.string(),
  REDIS_CACHE_TIME: z.string().default("3600"),

  // Basic Auth Secrets
  JWT_SECRET: z.string(),
  JWT_SECRET_EXPIRATION: z.string(),
  HASH: z.string().transform((val) => parseInt(val, 10)),

  MONGODB_URI: z.string().url(),
  ENABLE_WINSTON: z.enum(["0", "1"]).default("0"),
  ENABLE_CACHE: z.enum(["0", "1"]).default("0"),

  // Mail sender
  MAILGUN_API_KEY: z.string().optional(),
  MAILGUN_DOMAIN: z.string().optional(),
  MAILGUN_SENDER_EMAIL: z.string().optional(),
  MAILGUN_NAME: z.string().optional(),
});

export const env = envSchema.parse(process.env);
