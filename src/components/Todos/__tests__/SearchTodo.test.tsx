import { render, screen } from "testUtils";
import userEvent from "@testing-library/user-event";
import SearchTodo from "components/Todos/SearchToDo";
import { mockUseTodoSearch } from "components/Todos/__mocks__/data/todos";
import { useTodoSearch } from "lib/hooks/useTodoSearch";

jest.mock("lib/hooks/useTodoSearch");

describe("SearchTodo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTodoSearch as jest.Mock).mockReturnValue(mockUseTodoSearch);
  });

  it("renders the search input", () => {
    render(<SearchTodo />);

    expect(screen.getByPlaceholderText(/search todos/i)).toBeInTheDocument();
  });

  it("updates search term when input changes", async () => {
    render(<SearchTodo />);

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    await userEvent.type(searchInput, "test search");

    expect(mockUseTodoSearch.handleSearch).toHaveBeenCalled();
  });

  it("clears search term when clear button is clicked", async () => {
    (useTodoSearch as jest.Mock).mockReturnValue({
      ...mockUseTodoSearch,
      searchTerm: "test search",
    });

    render(<SearchTodo />);

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    await userEvent.click(clearButton);

    expect(mockUseTodoSearch.handleClearSearch).toHaveBeenCalled();
  });

  it("displays the current search term in the input", () => {
    const currentSearchTerm = "current search";
    (useTodoSearch as jest.Mock).mockReturnValue({
      ...mockUseTodoSearch,
      searchTerm: currentSearchTerm,
    });

    render(<SearchTodo />);

    const searchInput = screen.getByPlaceholderText(/search todos/i);
    expect(searchInput).toHaveValue(currentSearchTerm);
  });

  it("does not show clear button when search term is empty", () => {
    (useTodoSearch as jest.Mock).mockReturnValue({
      ...mockUseTodoSearch,
      searchTerm: "",
    });

    render(<SearchTodo />);

    expect(
      screen.queryByRole("button", { name: /clear search/i })
    ).not.toBeInTheDocument();
  });
});
