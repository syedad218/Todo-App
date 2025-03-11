import { z } from "zod";

export const envSchema = z.object({
  REACT_APP_API_URL: z.string().url().default("http://localhost:3001"),
  REACT_APP_QUERY_STALE_TIME: z.number().min(0),
  REACT_APP_QUERY_RETRY: z.number().min(0),
  REACT_APP_QUERY_DEVTOOLS: z.boolean().default(false),
  APP_ENV: z.enum(["test", "development", "production"]).default("development"),
  REACT_APP_REACT_SCAN_ENABLED: z.boolean().default(false),
});
