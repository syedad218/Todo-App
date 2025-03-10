import { Suspense } from "react";
import SearchTodo from "components/Todos/SearchToDo";
import TodosList from "./component";
import { ErrorBoundary, ErrorFallback } from "components/Error";
import TodosListLoading from "./loading";

export default function TodosListWrapper() {
  return (
    <>
      <SearchTodo />
      <ErrorBoundary fallback={ErrorFallback}>
        <Suspense fallback={<TodosListLoading />}>
          <TodosList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
