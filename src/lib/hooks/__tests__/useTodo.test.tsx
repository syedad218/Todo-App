import { renderHook, act } from "testUtils";
import { useTodo } from "lib/hooks/useTodo";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useOptimisticMutation } from "lib/hooks/useOptimisticMutation";
import {
  mockDeleteTodoMutation,
  mockTodos,
  mockToggleTodoMutation,
  mockAddTodoMutation,
} from "components/Todos/__mocks__";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useSuspenseQuery: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("lib/hooks/useOptimisticMutation", () => ({
  useOptimisticMutation: jest.fn(),
}));

describe("useTodo Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useSuspenseQuery as jest.Mock).mockReturnValue({
      data: { data: mockTodos, headers: { "x-total-count": "10" } },
    });

    (useOptimisticMutation as jest.Mock)
      .mockImplementationOnce(() => mockToggleTodoMutation)
      .mockImplementationOnce(() => mockAddTodoMutation)
      .mockImplementationOnce(() => mockDeleteTodoMutation);
  });

  it("should return todos and mutations", () => {
    const { result } = renderHook(() => useTodo("", 1));

    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.toggleTodoMutation).toBeDefined();
    expect(result.current.addTodoMutation).toBeDefined();
    expect(result.current.deleteTodoMutation).toBeDefined();
  });

  it("should pass search term to useSuspenseQuery", () => {
    const searchTerm = "test search";
    renderHook(() => useTodo(searchTerm, 1));

    expect(useSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["todos", searchTerm, 1],
      })
    );
  });

  it("should handle toggle todo mutation", async () => {
    const { result } = renderHook(() => useTodo("", 1));

    await act(async () => {
      result.current.toggleTodoMutation.mutate({ id: "1", done: true });
    });

    expect(mockToggleTodoMutation.mutate).toHaveBeenCalledWith({
      id: "1",
      done: true,
    });
  });

  it("should handle add todo mutation", async () => {
    const { result } = renderHook(() => useTodo("", 1));

    const newTodo = "New todo";
    await act(async () => {
      result.current.addTodoMutation.mutate(newTodo);
    });

    expect(mockAddTodoMutation.mutate).toHaveBeenCalledWith(newTodo);
  });

  it("should handle delete todo mutation", async () => {
    const { result } = renderHook(() => useTodo("", 1));

    await act(async () => {
      result.current.deleteTodoMutation.mutate("1");
    });

    expect(mockDeleteTodoMutation.mutate).toHaveBeenCalledWith("1");
  });

  it("should handle search term changes", () => {
    const searchTerm = "search test";
    renderHook(() => useTodo(searchTerm, 1));

    expect(useSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["todos", searchTerm, 1],
      })
    );
  });

  it("should handle empty search term", () => {
    renderHook(() => useTodo("", 1));

    expect(useSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["todos", "", 1],
      })
    );
  });
});
