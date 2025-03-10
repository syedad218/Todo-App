import { SpacedContainer } from "styles/layouts";
import { Text } from "styles/components";
import { useTodo } from "lib/hooks/useTodo";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import EmptyToDo from "components/Todos/EmptyToDo";
import TodoItem from "components/Todos/TodoItem";
import { MESSAGES } from "lib/constants";
import { TodoList } from "./styles";
import { CONFIG } from "config";
import { useUrlParams } from "lib/hooks/useUrlParams";

const TODO_PER_PAGE = CONFIG.todosPerPage;

const TodosList = () => {
  const { search, page } = useUrlParams();

  const { todos, totalTodos, toggleTodoMutation, deleteTodoMutation } = useTodo(
    search,
    page
  );

  const { isSuccess: isDeleteSuccess } = deleteTodoMutation;

  const navigate = useNavigate();

  useEffect(() => {
    if (isDeleteSuccess && todos.length === 0) {
      if (page > 1) {
        navigate(`/todos?page=${page - 1}`);
      } else {
        navigate(`/todos`);
      }
    }
  }, [isDeleteSuccess, todos.length, navigate, page]);

  const startTodoIndex = useMemo(() => (page - 1) * TODO_PER_PAGE + 1, [page]);
  const endTodoIndex = useMemo(
    () => Math.min(page * TODO_PER_PAGE, totalTodos),
    [page, totalTodos]
  );

  const handleToggle = useCallback(
    (id: string, done: boolean) => {
      toggleTodoMutation.mutate({ id, done });
    },
    [toggleTodoMutation]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteTodoMutation.mutate(id);
    },
    [deleteTodoMutation]
  );

  if (todos.length === 0) {
    return (
      <EmptyToDo
        message={search ? MESSAGES.EMPTY_SEARCH : MESSAGES.EMPTY_TODO}
      />
    );
  }

  return (
    <SpacedContainer margin="lg">
      <Text size="small" variant="secondary" data-testid="todos-count">
        Showing {startTodoIndex}-{endTodoIndex} of {totalTodos} tasks
      </Text>
      <TodoList role="list" aria-label="Todo items">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completed={todo.done}
            onToggle={handleToggle}
            onDelete={handleDelete}
            isPending={todo.isPending ?? false}
          />
        ))}
      </TodoList>
    </SpacedContainer>
  );
};

export default TodosList;
