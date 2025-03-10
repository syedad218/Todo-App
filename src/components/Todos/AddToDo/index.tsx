import { Suspense } from "react";
import { Text } from "styles/components";
import { FlexContainer } from "styles/layouts";
import AddToDoLoadingSkeleton from "./loading";
import { Plus } from "lucide-react";
import { ErrorBoundary } from "components/Error";
import AddToDoErrorFallback from "./error";
import { AddInput, AddButton } from "./styles";
import Spinner from "components/Shared/Spinner";
import { MESSAGES } from "lib/constants";
import { useAddTodoForm } from "lib/hooks/useAddTodoForm";

const AddToDo = () => {
  const { inputValue, handleInputChange, handleSubmit, addTodoMutation } =
    useAddTodoForm();

  const { error, isPending } = addTodoMutation;

  return (
    <form onSubmit={handleSubmit} aria-label="Add todo form">
      <FlexContainer>
        <AddInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder={MESSAGES.ADD_TODO_INPUT_PLACEHOLDER}
          data-testid="add-todo-input"
          error={error?.message}
          disabled={isPending}
          autoFocus
          aria-label="Todo input"
        />
        <AddButton
          type="submit"
          variant="primary"
          disabled={isPending}
          size="sm"
          width="xs"
          aria-label="Add todo"
          data-testid="add-todo-button"
        >
          {isPending ? (
            <Spinner size="md" aria-label={MESSAGES.ADD_TODO_PENDING} />
          ) : (
            <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
          )}
        </AddButton>
      </FlexContainer>
      {error?.message && (
        <Text
          data-testid="add-todo-error"
          size="small"
          variant="error"
          padding="xs"
          role="alert"
        >
          {error.message}
        </Text>
      )}
    </form>
  );
};

export default function AddToDoWrapper() {
  return (
    <ErrorBoundary fallback={AddToDoErrorFallback}>
      <Suspense fallback={<AddToDoLoadingSkeleton />}>
        <AddToDo />
      </Suspense>
    </ErrorBoundary>
  );
}
