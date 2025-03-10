import { fireEvent, render, screen } from "testUtils";
import App from "App";
import { useTodo } from "lib/hooks/useTodo";
import { Routes, Route } from "react-router-dom";
import Todos from "components/Todos/index";
import { mockStatus } from "components/Todos/__mocks__";
import { useSummary } from "lib/hooks/useSummary";
import { useTodoMutations } from "lib/hooks/useTodoMutations";

jest.mock("lib/hooks/useTodo");
jest.mock("lib/hooks/useSummary");
jest.mock("lib/hooks/useTodoMutations");

export const TestAppWrapper = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="todos" element={<Todos />} />
    </Route>
  </Routes>
);

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTodo as jest.Mock).mockReturnValue({
      todos: [],
      addTodoMutation: { mutate: jest.fn() },
      toggleTodoMutation: { mutate: jest.fn() },
      deleteTodoMutation: { mutate: jest.fn() },
      searchTerm: "",
    });

    (useSummary as jest.Mock).mockReturnValue({
      data: mockStatus,
    });

    (useTodoMutations as jest.Mock).mockReturnValue({
      addTodoMutation: { mutate: jest.fn() },
      toggleTodoMutation: { mutate: jest.fn() },
      deleteTodoMutation: { mutate: jest.fn() },
    });
  });

  it("renders the main app container", () => {
    render(<TestAppWrapper />);

    expect(screen.getByTestId("app-container")).toBeInTheDocument();
  });

  it("renders the app title", () => {
    render(<TestAppWrapper />);

    expect(screen.getByText("My Todos")).toBeInTheDocument();
  });

  it("renders all major components", () => {
    render(<TestAppWrapper />);

    expect(
      screen.getByPlaceholderText(/what needs to be done/i)
    ).toBeInTheDocument(); // AddToDo input
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument(); // AddToDo button
    expect(screen.getByTestId("empty-todo-message")).toBeInTheDocument(); // Empty state from TodosList
  });

  it("renders with todos when they exist", () => {
    (useTodo as jest.Mock).mockReturnValue({
      todos: [
        { id: "1", value: "Test todo 1", done: false, createdAt: Date.now() },
        { id: "2", value: "Test todo 2", done: true, createdAt: Date.now() },
      ],
      addTodoMutation: { mutate: jest.fn() },
      toggleTodoMutation: { mutate: jest.fn() },
      deleteTodoMutation: { mutate: jest.fn() },
      searchTerm: "",
    });

    render(<TestAppWrapper />);

    expect(screen.getByText("Test todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test todo 2")).toBeInTheDocument();
  });

  it("adds a todo when the form is submitted", () => {
    const mockAddTodo = jest.fn();
    const mockTodos = [
      { id: "1", value: "New todo", done: false, createdAt: Date.now() },
    ];

    (useTodoMutations as jest.Mock).mockReturnValue({
      addTodoMutation: { mutate: mockAddTodo },
    });

    const { rerender } = render(<TestAppWrapper />);

    const input = screen.getByTestId("add-todo-input");
    const button = screen.getByTestId("add-todo-button");

    // check if New todo is not in the document before adding
    expect(screen.queryByText("New todo")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "New todo" } });
    fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith("New todo");

    (useTodo as jest.Mock).mockReturnValue({
      todos: mockTodos,
      addTodoMutation: { mutate: mockAddTodo },
      toggleTodoMutation: { mutate: jest.fn() },
      deleteTodoMutation: { mutate: jest.fn() },
      searchTerm: "",
    });

    rerender(<TestAppWrapper />);

    expect(screen.getByText("New todo")).toBeInTheDocument();
  });
});
