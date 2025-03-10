import { z } from "zod";
import { TodoSchema } from "lib/schema/todo";

export type Todo = z.infer<typeof TodoSchema>;

export type TodosResponse = {
  data: Todo[];
  headers: Record<string, string>;
};
