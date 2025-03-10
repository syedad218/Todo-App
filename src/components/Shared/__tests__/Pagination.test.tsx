import { render, screen, fireEvent } from "testUtils";
import { PaginationContent, Pagination } from "components/Shared/Pagination";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTodo } from "lib/hooks/useTodo";
import { usePagination } from "lib/hooks/usePagination";
import { mockUsePagination } from "components/Todos/__mocks__/data/todos";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
}));

jest.mock("lib/hooks/useTodo", () => ({
  useTodo: jest.fn(),
  getTodosQueryConfig: jest.fn(),
}));

jest.mock("lib/hooks/useTodo", () => ({
  useTodo: jest.fn(),
  getTodosQueryConfig: jest.fn(),
}));

jest.mock("lib/hooks/usePagination", () => ({
  usePagination: jest.fn(),
}));

describe("PaginationContent", () => {
  const mockOnNextPage = jest.fn();
  const mockOnPreviousPage = jest.fn();
  const mockResetErrorBoundary = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePagination as jest.Mock).mockReturnValue(mockUsePagination);
  });

  it("renders pagination controls correctly", () => {
    render(
      <PaginationContent
        page={1}
        totalPages={5}
        hasNextPage={true}
        hasNoPages={false}
        hasPreviousPage={false}
        onNextPage={mockOnNextPage}
        onPreviousPage={mockOnPreviousPage}
      />
    );

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(
      <PaginationContent
        page={1}
        totalPages={5}
        hasNextPage={true}
        hasNoPages={false}
        hasPreviousPage={false}
        onNextPage={mockOnNextPage}
        onPreviousPage={mockOnPreviousPage}
      />
    );

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
    fireEvent.click(prevButton);
    expect(mockOnPreviousPage).not.toHaveBeenCalled();
  });

  it("disables Next button on last page", () => {
    render(
      <PaginationContent
        page={5}
        totalPages={5}
        hasNextPage={false}
        hasNoPages={false}
        hasPreviousPage={true}
        onNextPage={mockOnNextPage}
        onPreviousPage={mockOnPreviousPage}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(mockOnNextPage).not.toHaveBeenCalled();
  });

  it("shows 'No results' when page is greater than total pages", () => {
    render(
      <PaginationContent
        page={6}
        totalPages={5}
        hasNextPage={false}
        hasNoPages={true}
        hasPreviousPage={true}
        onNextPage={mockOnNextPage}
        onPreviousPage={mockOnPreviousPage}
      />
    );
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("shows 'No results' when totalPages is 0", () => {
    render(
      <PaginationContent
        page={1}
        totalPages={0}
        hasNextPage={false}
        hasNoPages={true}
        hasPreviousPage={false}
        onNextPage={mockOnNextPage}
        onPreviousPage={mockOnPreviousPage}
      />
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("shows error state with retry button", () => {
    render(
      <PaginationContent
        page={1}
        totalPages={5}
        hasNextPage={true}
        hasNoPages={false}
        hasPreviousPage={false}
        onNextPage={mockOnNextPage}
        onPreviousPage={mockOnPreviousPage}
        isError={true}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    );

    expect(screen.getByText("Try again")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Try again"));
    expect(mockResetErrorBoundary).toHaveBeenCalled();
  });
});

describe("Pagination", () => {
  const mockSetSearchParams = jest.fn();
  const mockPrefetchQuery = jest.fn();
  const mockUseTodo = useTodo as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams("page=1&search=test"),
      mockSetSearchParams,
    ]);
    (useQueryClient as jest.Mock).mockReturnValue({
      prefetchQuery: mockPrefetchQuery,
    });
    mockUseTodo.mockReturnValue({ totalPages: 5 });

    (usePagination as jest.Mock).mockReturnValue(mockUsePagination);
  });

  it("renders pagination with correct initial state", () => {
    render(<Pagination />);
    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  it("handles page change correctly", () => {
    (usePagination as jest.Mock).mockReturnValue({
      ...mockUsePagination,
      hasNextPage: true,
    });
    render(<Pagination />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockUsePagination.handleNextPage).toHaveBeenCalled();
  });

  it("updates page when search params change", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams("page=2&search=test"),
      mockSetSearchParams,
    ]);

    (usePagination as jest.Mock).mockReturnValue({
      ...mockUsePagination,
      page: 2,
      totalPages: 5,
      hasNextPage: true,
      hasPreviousPage: true,
    });

    render(<Pagination />);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });
});
