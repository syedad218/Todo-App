import { apiCall } from "services/api";
import { TodoSchema } from "lib/schema/todo";
import type { Todo, TodosResponse } from "types/todo";
import { z } from "zod";
import { CONFIG } from "config";
import { wait } from "lib/utils/wait"; // simulate a slow response

const TODO_BASE_URL = `${CONFIG.baseUrl}/todos`;
const TODO_PER_PAGE = CONFIG.todosPerPage;

export const fetchTodos = async (
  page: number,
  signal?: AbortSignal
): Promise<TodosResponse> => {
  await wait();

  const { data, headers } = await apiCall<Todo[]>(
    `${TODO_BASE_URL}?_page=${page}&_limit=${TODO_PER_PAGE}`,
    {
      signal,
    },
    z.array(TodoSchema)
  );

  return { data, headers };
};

export const toggleTodo = async (id: string, done: boolean): Promise<Todo> => {
  await wait();

  const { data } = await apiCall<Todo>(
    `${TODO_BASE_URL}/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ done }),
    },
    TodoSchema
  );

  return data;
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  await wait();

  const { data } = await apiCall<Todo>(
    TODO_BASE_URL,
    {
      method: "POST",
      body: JSON.stringify(todo),
    },
    TodoSchema
  );

  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await wait();

  const { data } = await apiCall<void>(`${TODO_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return data;
};

export const searchTodo = async (
  searchTerm: string,
  page: number,
  signal?: AbortSignal
): Promise<TodosResponse> => {
  await wait();

  const { data, headers } = await apiCall<Todo[]>(
    `${TODO_BASE_URL}?q=${searchTerm}&_page=${page}&_limit=${TODO_PER_PAGE}`,
    {
      method: "GET",
      signal,
    },
    z.array(TodoSchema)
  );

  return { data, headers };
};

export const getSummary = async (): Promise<{
  total: number;
  done: number;
}> => {
  await wait();

  const { data } = await apiCall<{
    total: number;
    done: number;
  }>(`${TODO_BASE_URL}?summary=true`, {
    method: "GET",
  });

  return data;
};
