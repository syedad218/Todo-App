import { Text } from "styles/components";
import { EmptyToDoContainer } from "./styles";

export default function EmptyToDo({ message }: { message: string }) {
  return (
    <EmptyToDoContainer margin="xxl" padding="xxl" variant="light">
      <Text size="regular" variant="secondary" data-testid="empty-todo-message">
        {message}
      </Text>
    </EmptyToDoContainer>
  );
}
