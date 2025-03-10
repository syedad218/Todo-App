import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchTodos, searchTodo } from "services/todos";
import { CONFIG } from "config";
import { useTodoMutations } from "./useTodoMutations";
import { TodosResponse } from "types/todo";

const TODO_PER_PAGE = CONFIG.todosPerPage;

export const getTodosQueryConfig = (searchTerm: string, page: number) => ({
  queryKey: ["todos", searchTerm, page],
  queryFn: () => (searchTerm ? searchTodo(searchTerm, page) : fetchTodos(page)),
});

export const useFetchTodos = (searchTerm: string, page: number) => {
  return useSuspenseQuery<TodosResponse>(getTodosQueryConfig(searchTerm, page));
};

export const useTodo = (searchTerm: string, page: number) => {
  const { data: todosResponse } = useFetchTodos(searchTerm, page);
  const { data: todos, headers } = todosResponse;

  const totalTodos = Number(headers["x-total-count"]);
  const totalPages = Math.ceil(totalTodos / TODO_PER_PAGE);

  const { toggleTodoMutation, addTodoMutation, deleteTodoMutation } =
    useTodoMutations(searchTerm, page);

  return {
    todos,
    toggleTodoMutation,
    addTodoMutation,
    deleteTodoMutation,
    totalTodos,
    totalPages,
  };
};
