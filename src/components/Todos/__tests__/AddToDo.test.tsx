import userEvent from "@testing-library/user-event";
import AddToDo from "components/Todos/AddToDo";
import { useTodoMutations } from "lib/hooks/useTodoMutations";
import { render, screen } from "testUtils";
import { mockAddTodoMutation } from "components/Todos/__mocks__";

jest.mock("lib/hooks/useTodoMutations");

describe("AddToDo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTodoMutations as jest.Mock).mockReturnValue({
      addTodoMutation: mockAddTodoMutation,
    });
  });

  it("renders the add todo form", () => {
    render(<AddToDo />);

    expect(
      screen.getByPlaceholderText(/what needs to be done/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument();
  });

  it("allows entering text in the input field", async () => {
    render(<AddToDo />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await userEvent.type(input, "New todo item");

    expect(input).toHaveValue("New todo item");
  });

  it("calls addTodoMutation.mutate when form is submitted with valid input", async () => {
    const { rerender } = render(<AddToDo />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    await userEvent.type(input, "New todo item");
    await userEvent.click(submitButton);

    expect(mockAddTodoMutation.mutate).toHaveBeenCalledWith("New todo item");

    mockAddTodoMutation.isSuccess = true;

    rerender(<AddToDo />);

    expect(input).toHaveValue("");
  });

  it("does not call addTodoMutation.mutate when form is submitted with empty input", async () => {
    render(<AddToDo />);

    const submitButton = screen.getByRole("button", { name: /add todo/i });
    await userEvent.click(submitButton);

    expect(mockAddTodoMutation.mutate).not.toHaveBeenCalled();
  });
});
