# Todo App V2 - Complete Rewrite and Modern Architecture

## Overview

This rewrites the Todo application from a class-based component architecture to a modern React application with improved architecture, functionality, and user experience. The application has been rebuilt using modern React patterns, TypeScript, React Router, React Query, and styled-components.

## Key Changes

### Architecture & Structure

- Migrated to functional components with Hooks
- Added React Router, error boundaries, and schema validation using Zod
- Implemented React Query for data fetching and caching

### UI/UX

- Added loading states using Suspense, toast notifications and pagination for progressive user experience
- Implemented real-time search and summary statistics
- Created reusable components for maintainability

### Data Handling

- Implemented optimistic updates and custom server endpoints
- Added efficient cache invalidation and prefetching
- Implemented pagination to improve data fetching performance & server resource utilization

**Example: React Query with Optimistic Updates**

```tsx
// Optimistic update with React Query
export const useTodoMutations = (searchTerm: string, page: number) => {
  const toggleTodoMutation = useOptimisticMutation<Todo, ToggleMutationProps>({
    queryKey: ["todos", searchTerm, page],
    mutationFn: ({ id, done }: ToggleMutationProps) => toggleTodo(id, done),
    updateFn: (oldData: TodosResponse, { id, done }: ToggleMutationProps) => {
      return {
        data:
          data?.map((todo) =>
            todo.id === id ? { ...todo, done, isPending: true } : todo
          ) ?? [],
        headers,
      };
    },
  });

  // isPending variable is used in the UI to show indication to the user of an ongoing mutation operation
  // Additional mutations implementations...

  return {
    toggleTodo: toggleTodoMutation.mutate,
    addTodo: addTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
};
```

### Developer Experience

- Added unit tests for components and hooks
- Implemented environment variable validation and proper error handling
- Upgraded dependencies to latest versions

## Technical Details

### Dependencies Added

- `@tanstack/react-query`: For efficient data fetching and caching ❤️
- `react-router-dom`: For application routing (page and search params)
- `zod`: For schema validation
- `react-hot-toast`: For toast notifications
- `react-error-boundary`: For error handling
- `lucide-react`: For modern icons
- Upgraded `styled-components` to v6

### Key Features

1. **Todo Management**:

   - Add, delete, toggle, and search todos
   - Optimistic updates for better UX
   - Pagination support
   - Summary section for todos
   - Real-time search functionality
   - Support URL search params for pagination and search query

2. **Performance**:

   - Debounced search to reduce API calls
   - Efficient data caching & invalidations using React Query
   - Optimized re-renders by `memo` memoization of components and a custom compare function

   **Example: Memoized Todo Component**

   ```tsx
   const TodoItem = ({
     todo,
     completed,
     onToggle,
     onDelete,
     isPending,
   }: TodoItemProps) => {
     const handleToggle = () => {
       onToggle(todo.id, !completed);
     };

     return (
       <Item completed={completed} isPending={isPending}>
         <Checkbox
           type="checkbox"
           checked={completed}
           onChange={handleToggle}
         />
         <Text completed={completed}>{todo.value}</Text>
         <DeleteTodo id={todo.id} onDelete={onDelete} />
       </Item>
     );
   };

   // Using memo for performance optimization, preventing re-renders when the todo object hasn't changed
   export default memo(TodoItem, compareTodos);
   ```

3. **Error Handling**:

   - Granular error boundaries around critical sections & components
   - Graceful degradation with fallbacks UI and a retry button
   - User-friendly error messages

## Migration Notes

- Environment setup requires `.env` file (template provided in `.env.dist`)
- copy `.env.dist` to `.env` and set the correct values
- Run `yarn install` to install the new dependencies
- Run `yarn start:server` to start the server
- Run `yarn start` to start the development client

## Notes

- For simluating a slow network response, each request uses a `wait` function that sleeps for 500 milliseconds
- Development tools in dev mode can be enabled by setting the following environment variables: React Query DevTools (`REACT_APP_QUERY_DEVTOOLS=true`) and React Scan (`REACT_APP_REACT_SCAN_ENABLED=true`)
- React Query is used to debug the data fetching and caching behavior
- React Scan is used to debug the React components and their performance and re-renders
