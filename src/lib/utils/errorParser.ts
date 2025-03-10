import type { ZodError } from "zod";
import { MESSAGES } from "lib/constants";

function formatFieldName(path: (string | number)[]): string {
  // Convert array paths like ["0", "createdAt"] to "Created At"
  return path.filter((segment) => typeof segment === "string").join("");
}

export function parseZodError(error: ZodError): string {
  return error.errors
    .map((err) => {
      // Get the path to the field (e.g., "email", "user.name")
      const field = formatFieldName(err.path);

      // Convert validation errors to user-friendly messages
      switch (err.code) {
        case "invalid_type":
          if (err.received === "undefined") {
            return `${field} is required`;
          }
          return `${field} should be a ${err.expected}`;
        case "too_small":
          return `${field} is too short`;
        case "too_big":
          return `${field} is too long`;
        case "invalid_string":
          if (err.validation === "email") {
            return "Please enter a valid email address";
          }
          return `${field} is invalid`;
        case "custom":
          return err.message;
        default:
          return err.message;
      }
    })
    .join(", ");
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return MESSAGES.UNKNOWN_ERROR;
};
