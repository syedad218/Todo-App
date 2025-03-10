import type { Todo } from "types/todo";
import { Text, Checkbox } from "styles/components";
import { memo } from "react";
import DeleteTodo from "components/Todos/DeleteToDo";
import { compareTodos } from "lib/utils/todo";
import { Item } from "./styles";

interface TodoItemProps {
  todo: Todo;
  completed: boolean;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  isPending: boolean;
}

const TodoItem = ({
  todo,
  completed,
  onToggle,
  onDelete,
  isPending,
}: TodoItemProps) => {
  const handleToggle = () => {
    onToggle(todo.id, !completed);
  };

  return (
    <Item
      key={todo.id}
      completed={completed}
      onClick={handleToggle}
      isPending={isPending}
      data-testid={`todo-item-${todo.id}`}
    >
      <Checkbox
        checked={completed}
        readOnly
        data-testid={`todo-item-${todo.id}-checkbox`}
      />
      <Text textDecoration={completed ? "line-through" : "none"} flexGrow={1}>
        {todo.value}
      </Text>
      <DeleteTodo todo={todo} onDelete={onDelete} isPending={isPending} />
    </Item>
  );
};

export default memo(TodoItem, (prevProps, nextProps) => {
  return compareTodos(prevProps.todo, nextProps.todo);
});
