import { memo, Suspense } from "react";
import PaginationSkeleton from "./loading";
import { ErrorBoundary } from "components/Error";
import PaginationErrorFallback from "./error";
import { PaginationContainer } from "./styles";
import { usePagination } from "lib/hooks/usePagination";
import { PaginationText } from "./component";
import { Button } from "styles/components";
import { useUrlParams } from "lib/hooks/useUrlParams";
import { getTodosQueryConfig, useTodo } from "lib/hooks/useTodo";
import { useQueryClient } from "@tanstack/react-query";
import config from "config/env";

interface PaginationContentProps {
  page: number;
  hasNextPage: boolean;
  totalPages: number;
  hasNoPages: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  isError?: boolean;
  resetErrorBoundary?: () => void;
}

export const PaginationContent = memo(
  ({
    page,
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage,
    totalPages,
    hasNoPages,
    isError = false,
    resetErrorBoundary,
  }: PaginationContentProps) => {
    return (
      <PaginationContainer justify="space-between" align="center" gap="md">
        <Button
          variant="secondary"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage || isError}
          width="md"
          height="sm"
        >
          Previous
        </Button>
        <PaginationText
          page={page}
          totalPages={totalPages}
          hasNoPages={hasNoPages}
          isError={isError}
          resetErrorBoundary={resetErrorBoundary}
        />
        <Button
          variant="secondary"
          onClick={onNextPage}
          disabled={!hasNextPage || isError}
          width="md"
          height="sm"
        >
          Next
        </Button>
      </PaginationContainer>
    );
  }
);

export const Pagination = () => {
  const queryClient = useQueryClient();

  const { search, page, setPage } = useUrlParams();
  const { totalPages } = useTodo(search, page);

  const prefetchPage = (newPage: number) => {
    queryClient.prefetchQuery({
      ...getTodosQueryConfig(search, newPage),
      staleTime: config.queryStaleTime,
    });
  };

  const {
    hasNextPage,
    hasPreviousPage,
    hasNoPages,
    handleNextPage,
    handlePreviousPage,
  } = usePagination({
    totalPages,
    page,
    setPage,
    prefetchPage,
  });

  return (
    <PaginationContent
      page={page}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      totalPages={totalPages}
      hasNoPages={hasNoPages}
    />
  );
};

export default function PaginationWrapper() {
  return (
    <ErrorBoundary fallback={PaginationErrorFallback}>
      <Suspense fallback={<PaginationSkeleton />}>
        <Pagination />
      </Suspense>
    </ErrorBoundary>
  );
}
