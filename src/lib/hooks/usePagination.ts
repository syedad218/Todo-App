import { useCallback, useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  prefetchPage: (page: number) => void;
}

export const usePagination = ({
  totalPages,
  page,
  setPage,
  prefetchPage,
}: PaginationProps) => {
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const hasNoPages = totalPages === 0;
  const isInvalidPage = page > totalPages;

  const handleNextPage = useCallback(() => {
    if (hasNextPage) {
      if (prefetchPage) prefetchPage(page + 1);
      setPage(page + 1);
    }
  }, [hasNextPage, page, prefetchPage, setPage]);

  const handlePreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      if (prefetchPage) prefetchPage(page - 1);
      setPage(page - 1);
    }
  }, [hasPreviousPage, page, prefetchPage, setPage]);

  useEffect(() => {
    if (isInvalidPage) {
      setPage(1);
    }
  }, [isInvalidPage, setPage]);

  return {
    hasNextPage,
    hasPreviousPage,
    hasNoPages,
    handleNextPage,
    handlePreviousPage,
  };
};
