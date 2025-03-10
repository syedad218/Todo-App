import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        if (value.trim()) {
          prev.set("search", value);
          // Reset to page 1 when search changes
          prev.set("page", "1");
        } else {
          prev.delete("search");
        }
        return prev;
      });
    },
    [setSearchParams]
  );

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set("page", page.toString());
        return prev;
      });
    },
    [setSearchParams]
  );

  return {
    search,
    page,
    setSearch,
    setPage,
  };
};
