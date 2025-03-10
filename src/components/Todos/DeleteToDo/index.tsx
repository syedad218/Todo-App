import { Trash2 } from "lucide-react";
import { Button } from "styles/components";
import { Todo } from "types/todo";

interface DeleteToDoProps {
  todo: Todo;
  onDelete: (id: string) => void;
  isPending: boolean;
}

export default function DeleteToDo({
  todo,
  onDelete,
  isPending,
}: DeleteToDoProps) {
  return (
    <Button
      size="xs"
      variant="transparent"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(todo.id);
      }}
      disabled={isPending}
      aria-label={`Delete ${todo.value}`}
    >
      <Trash2 size={21} strokeWidth={2} color="red" />
    </Button>
  );
}
