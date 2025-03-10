import { act, fireEvent, render, screen, waitFor } from "testUtils";
import userEvent from "@testing-library/user-event";
import TodosList from "components/Todos/TodoList";
import { useTodo } from "lib/hooks/useTodo";
import {
  mockDeleteTodoMutation,
  mockTodos,
  mockToggleTodoMutation,
} from "components/Todos/__mocks__";
import { MESSAGES } from "lib/constants";
import { useDebounce } from "lib/hooks/useDebounce";
import { useTodoMutations } from "lib/hooks/useTodoMutations";

jest.mock("lib/hooks/useTodo");
jest.mock("lib/hooks/useDebounce");
jest.mock("lib/hooks/useTodoMutations");
describe("TodosList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTodo as jest.Mock).mockReturnValue({
      todos: mockTodos,
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: mockDeleteTodoMutation,
    });

    (useTodoMutations as jest.Mock).mockReturnValue({
      addTodoMutation: { mutate: jest.fn() },
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: mockDeleteTodoMutation,
    });

    (useDebounce as jest.Mock).mockReturnValue({
      debouncedValue: "",
      cancel: jest.fn(),
    });
  });

  it("renders the list of todos", () => {
    render(<TodosList search="" page={1} />);

    expect(screen.getByTestId("todo-item-1").textContent).toBe("Test todo 1");
    expect(screen.getByTestId("todo-item-2").textContent).toBe("Test todo 2");
  });

  it("renders empty state when no todos exist", () => {
    (useTodo as jest.Mock).mockReturnValue({
      todos: [],
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: mockDeleteTodoMutation,
    });

    render(<TodosList search="" page={1} />);

    expect(screen.getByTestId("empty-todo-message").textContent).toContain(
      MESSAGES.EMPTY_TODO
    );
  });

  it("calls toggleTodoMutation when item is clicked", async () => {
    render(<TodosList search="" page={1} />);

    const item = screen.getByTestId("todo-item-1");
    await userEvent.click(item);

    expect(mockToggleTodoMutation.mutate).toHaveBeenCalledWith({
      id: "1",
      done: true,
    });
  });

  it("calls deleteTodoMutation when delete button is clicked", async () => {
    render(<TodosList search="" page={1} />);

    const deleteButton = screen.getByRole("button", {
      name: /Delete Test todo 1/i,
    });
    await userEvent.click(deleteButton);

    expect(mockDeleteTodoMutation.mutate).toHaveBeenCalledWith("1");
  });

  it("displays completed todos with strikethrough style", () => {
    render(<TodosList search="" page={1} />);

    const completedTodo = screen.getByText("Test todo 2");
    expect(completedTodo).toHaveStyle({ textDecoration: "line-through" });
  });

  it("updates search input when user types in the search input", async () => {
    (useTodo as jest.Mock).mockReturnValue({
      todos: mockTodos,
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: mockDeleteTodoMutation,
    });

    const { rerender } = render(<TodosList search="" page={1} />);

    const input = screen.getByTestId("todos-search-input");
    await act(() => userEvent.type(input, "Test todo 1"));

    expect(input).toHaveValue("Test todo 1");

    (useTodo as jest.Mock).mockReturnValue({
      todos: mockTodos.filter((todo) => todo.value.includes("Test todo 1")),
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: mockDeleteTodoMutation,
    });

    (useDebounce as jest.Mock).mockReturnValue({
      debouncedValue: "Test todo 1",
      cancel: jest.fn(),
    });

    rerender(<TodosList search="Test todo 1" page={1} />);

    // check if the todos are filtered
    await act(async () => {
      // wait for the debounce delay
      await new Promise((resolve) => setTimeout(resolve, 350));
    });

    expect(screen.getByTestId("todo-item-1").textContent).toBe("Test todo 1");
    expect(screen.queryByTestId("todo-item-2")).not.toBeInTheDocument();
  });

  it("toggles a todo when the checkbox is clicked", async () => {
    const mockToggleTodo = jest.fn();

    const mockUseTodo = {
      todos: mockTodos.slice(0, 1),
      toggleTodoMutation: { mutate: mockToggleTodo },
      addTodoMutation: { mutate: jest.fn() },
      deleteTodoMutation: { mutate: jest.fn() },
      searchTerm: "",
      setSearchTerm: jest.fn(),
    };

    (useTodo as jest.Mock).mockReturnValue(mockUseTodo);

    const { rerender } = render(<TodosList search="" page={1} />);

    const checkbox = screen.getByTestId("todo-item-1-checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledWith({ id: "1", done: true });

    (useTodo as jest.Mock).mockReturnValue({
      ...mockUseTodo,
      todos: mockTodos.slice(0, 1).map((todo) => ({ ...todo, done: true })),
    });

    rerender(<TodosList search="" page={2} />);

    expect(checkbox).toBeChecked();
  });

  it("deletes a todo when the delete button is clicked", async () => {
    const mockDeleteTodo = jest.fn();

    (useTodo as jest.Mock).mockReturnValue({
      todos: mockTodos,
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: { mutate: mockDeleteTodo },
      searchTerm: "",
    });

    const { rerender } = render(<TodosList search="" page={1} />);

    const deleteButton = screen.getByRole("button", {
      name: /Delete Test todo 1/i,
    });

    await userEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodos[0].id);

    (useTodo as jest.Mock).mockReturnValue({
      todos: mockTodos.filter((todo) => todo.id !== "1"),
      toggleTodoMutation: mockToggleTodoMutation,
      deleteTodoMutation: mockDeleteTodoMutation,
      searchTerm: "",
    });

    rerender(<TodosList search="" page={2} />);

    await waitFor(() => {
      expect(screen.queryByTestId("todo-item-1")).not.toBeInTheDocument();
    });
  });
});
