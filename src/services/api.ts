import { z } from "zod";
import { parseZodError } from "lib/utils/errorParser";
import { HTTP_CODES } from "lib/constants";

export type ApiResponse<T> = {
  data: T;
  headers: Record<string, string>;
};

/**
 * API error class to handle API-specific errors
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

/**
 * Generic API call handler with error handling and response validation
 */
export async function apiCall<T>(
  url: string,
  options: RequestInit = {},
  schema?: z.ZodType<T>
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(
        `${response.statusText}: ${error?.message}`,
        response.status
      );
    }

    const headers = Object.fromEntries(response.headers.entries());
    const data = await response.json();

    // If schema is provided, validate the response
    if (schema) {
      return {
        data: schema.parse(data),
        headers,
      };
    }

    return { data, headers };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request aborted", HTTP_CODES.ABORTED);
    } else if (error instanceof z.ZodError) {
      throw new ApiError(
        `Response validation error: ${parseZodError(error)}`,
        HTTP_CODES.BAD_REQUEST
      );
    } else if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      HTTP_CODES.INTERNAL_SERVER_ERROR
    );
  }
}
