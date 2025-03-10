import { nanoid } from "nanoid";
import type { Todo } from "types/todo";

export const createTodo = (value: string, isOptimistic = false): Todo => {
  return {
    id: nanoid(),
    value,
    done: false,
    createdAt: Date.now(),
    ...(isOptimistic && { isPending: true }),
  };
};

export const getPercentageProgress = (total: number, done: number) => {
  if (typeof done !== "number" || typeof total !== "number" || total <= 0) {
    return 0;
  }

  const validDone = Math.max(0, done);
  const cappedDone = Math.min(validDone, total);

  return Math.floor((cappedDone / total) * 100);
};

export const compareTodos = (prevTodo: Todo, nextTodo: Todo) => {
  return (
    prevTodo.id === nextTodo.id &&
    prevTodo.value === nextTodo.value &&
    prevTodo.done === nextTodo.done &&
    prevTodo.isPending === nextTodo.isPending
  );
};
