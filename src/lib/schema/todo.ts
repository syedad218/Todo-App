import { z } from "zod";

export const MAX_TODO_LENGTH = 50;
export const MIN_TODO_LENGTH = 5;

export const TodoValueSchema = z
  .string()
  .min(
    MIN_TODO_LENGTH,
    `Todo cannot be less than ${MIN_TODO_LENGTH} characters`
  )
  .max(MAX_TODO_LENGTH, `Todo cannot exceed ${MAX_TODO_LENGTH} characters`)
  .transform((val) => val.trim());

export const TodoSchema = z.object({
  id: z.string(),
  value: TodoValueSchema,
  done: z.boolean(),
  createdAt: z.number(),
  isPending: z.boolean().optional(),
});
