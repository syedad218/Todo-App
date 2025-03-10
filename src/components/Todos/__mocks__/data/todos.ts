export const mockTodos = [
  { id: "1", value: "Test todo 1", done: false, createdAt: Date.now() },
  { id: "2", value: "Test todo 2", done: true, createdAt: Date.now() },
  { id: "3", value: "Test todo 3", done: true, createdAt: Date.now() },
];

export const mockStatus = {
  total: 3,
  done: 2,
};

export const mockToggleTodoMutation = {
  mutate: jest.fn(),
};

export const mockDeleteTodoMutation = {
  mutate: jest.fn(),
};

export const mockAddTodoMutation = {
  mutate: jest.fn(),
  error: null,
  isSuccess: false,
  isPending: false,
};

export const mockUseTodoSearch = {
  searchTerm: "",
  setSearchTerm: jest.fn(),
  handleSearch: jest.fn(),
  handleClearSearch: jest.fn(),
};

export const mockUsePagination = {
  hasNextPage: false,
  hasPreviousPage: false,
  hasNoPages: false,
  handleNextPage: jest.fn(),
  handlePreviousPage: jest.fn(),
};

export const mockUseUrlParams = {
  search: "",
  setSearch: jest.fn(),
  page: 1,
  setPage: jest.fn(),
};

export const mockUseTodo = {
  todos: mockTodos,
  totalTodos: 3,
  totalPages: 1,
  toggleTodoMutation: mockToggleTodoMutation,
  addTodoMutation: mockAddTodoMutation,
  deleteTodoMutation: mockDeleteTodoMutation,
};
