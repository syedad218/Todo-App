import {
  SkeletonCheckbox,
  SkeletonText,
  SkeletonDelete,
  TodoSkeletonItem,
} from "styles/components";

const TodoItemSkeleton = ({ index }: { index: number }) => {
  return (
    <TodoSkeletonItem key={index}>
      <SkeletonCheckbox />
      <SkeletonText />
      <SkeletonDelete />
    </TodoSkeletonItem>
  );
};

export default TodoItemSkeleton;
