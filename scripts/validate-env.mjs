import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

try {
  await import("../src/config/env.js");
  console.log("✅ Environment variables are valid");
  process.exit(0);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("\n❌ Invalid or missing environment variables:");
    error.errors.forEach((err) => {
      console.error(`\n${err.path.join(".")}: ${err.message}`);
    });
    console.error("\nPlease check your environment variables and try again.\n");
  } else {
    console.error(
      "\n❌ An unexpected error occurred while validating environment variables\n"
    );
    console.error(error);
  }
  process.exit(1);
}
