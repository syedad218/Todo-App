import { addTodo } from "services/todos";
import { Todo } from "types/todo";
import { toggleTodo, deleteTodo } from "services/todos";
import { TodosResponse } from "types/todo";
import { useOptimisticMutation } from "./useOptimisticMutation";
import { createTodo } from "lib/utils/todo";
import { TodoValueSchema } from "lib/schema/todo";
import { CONFIG } from "config";
import { useQueryClient } from "@tanstack/react-query";

const TODO_PER_PAGE = CONFIG.todosPerPage;

export interface ToggleMutationProps {
  id: string;
  done: boolean;
}

export const useTodoMutations = (
  searchTerm: string,
  page: number,
  isOptimisticUpdate: boolean = true
) => {
  const queryClient = useQueryClient();

  const invalidateTodos = () => {
    /** invalidate all todos queries irrespective of the page & search */
    queryClient.invalidateQueries({
      queryKey: ["todos"],
      refetchType: "all",
    });
  };

  const toggleTodoMutation = useOptimisticMutation<Todo, ToggleMutationProps>({
    queryKey: ["todos", searchTerm, page],
    mutationFn: ({ id, done }: ToggleMutationProps) => toggleTodo(id, done),
    updateFn: (oldData: TodosResponse, { id, done }: ToggleMutationProps) => {
      if (!isOptimisticUpdate) return oldData;
      const { data, headers } = oldData;
      return {
        data:
          data?.map((todo) =>
            todo.id === id ? { ...todo, done, isPending: true } : todo
          ) ?? [],
        headers,
      };
    },
  });

  const addTodoMutation = useOptimisticMutation<Todo, string>({
    queryKey: ["todos", searchTerm, page],
    mutationFn: (value: string) => addTodo(createTodo(value)),
    updateFn: (oldData: TodosResponse, value: string) => {
      if (!isOptimisticUpdate) return oldData;
      const parsedValue = TodoValueSchema.safeParse(value);
      if (!parsedValue.success) {
        throw new Error(parsedValue.error.errors[0].message);
      }
      const { data, headers } = oldData;
      const totalCount = Number(headers["x-total-count"]);
      return {
        data: [
          createTodo(value, true),
          ...(data ?? []).slice(0, TODO_PER_PAGE - 1),
        ],
        headers: { ...headers, "x-total-count": totalCount + 1 },
      };
    },
    onSuccess: () => {
      invalidateTodos();
    },
  });

  const deleteTodoMutation = useOptimisticMutation<void, string>({
    queryKey: ["todos", searchTerm, page],
    mutationFn: (id: string) => deleteTodo(id),
    updateFn: (oldData: TodosResponse, id: string) => {
      if (!isOptimisticUpdate) return oldData;
      const { data, headers } = oldData;
      const totalCount = Number(headers["x-total-count"]);
      return {
        data:
          data?.map((todo) =>
            todo.id === id ? { ...todo, isPending: true } : todo
          ) ?? [],
        headers: { ...headers, "x-total-count": totalCount - 1 },
      };
    },
    onSuccess: () => {
      invalidateTodos();
    },
  });

  return { toggleTodoMutation, addTodoMutation, deleteTodoMutation };
};
