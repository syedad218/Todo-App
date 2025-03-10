import { SpacedContainer } from "styles/layouts";
import TodoItemSkeleton from "components/Todos/TodoItem/loading";
import { SkeletonText } from "styles/components";
import { TodoList } from "./styles";

const TodoSkeleton = ({ count }: { count: number }) => {
  return (
    <TodoList>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <TodoItemSkeleton key={index} index={index} />
        ))}
    </TodoList>
  );
};

const TodosListLoadingSkeleton = () => {
  return (
    <>
      <SpacedContainer margin="lg">
        <SkeletonText size="medium" width="20%" />
        <TodoSkeleton count={5} />
      </SpacedContainer>
    </>
  );
};

export default TodosListLoadingSkeleton;
