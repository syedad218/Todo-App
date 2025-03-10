import userEvent from "@testing-library/user-event";
import DeleteToDo from "components/Todos/DeleteToDo";
import { useTodo } from "lib/hooks/useTodo";
import { UseMutationResult } from "@tanstack/react-query";
import { render, screen } from "testUtils";
import { mockTodos } from "components/Todos/__mocks__";

jest.mock("lib/hooks/useTodo");

describe("DeleteToDo Component", () => {
  const mockTodo = mockTodos[0];

  const mockDeleteTodoMutation = {
    mutate: jest.fn(),
    isPending: false,
  } as Partial<
    UseMutationResult<void, Error, string, { previousData: void | undefined }>
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    (useTodo as jest.Mock).mockReturnValue({
      deleteTodoMutation: mockDeleteTodoMutation,
    });
  });

  it("renders the delete button and is not disabled", () => {
    render(
      <DeleteToDo
        todo={mockTodo}
        onDelete={mockDeleteTodoMutation.mutate as any}
        isPending={false}
      />
    );
    const deleteButton = screen.getByRole("button", {
      name: /Delete Test todo 1/i,
    });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).not.toBeDisabled();
  });

  it("calls onDelete.mutate when delete button is clicked", async () => {
    render(
      <DeleteToDo
        todo={mockTodo}
        onDelete={mockDeleteTodoMutation.mutate as any}
        isPending={false}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /Delete Test todo/i,
    });
    await userEvent.click(deleteButton);

    expect(mockDeleteTodoMutation.mutate).toHaveBeenCalledWith(mockTodo.id);
  });

  it("disables the delete button while deletion is in progress", () => {
    const pendingMutation = {
      ...mockDeleteTodoMutation,
      isPending: true,
    };

    render(
      <DeleteToDo
        todo={mockTodo}
        onDelete={pendingMutation.mutate as any}
        isPending={true}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /Delete Test todo/i,
    });
    expect(deleteButton).toBeDisabled();
  });
});
