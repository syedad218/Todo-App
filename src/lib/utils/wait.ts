export const wait = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const rejectAfter = (
  ms: number = 200,
  message: string = "Request timed out"
) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
