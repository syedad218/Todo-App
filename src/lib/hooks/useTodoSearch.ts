import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useUrlParams } from "./useUrlParams";

export const useTodoSearch = () => {
  const { search, setSearch } = useUrlParams();
  const [searchTerm, setSearchTerm] = useState(search);

  const { debouncedValue: debouncedSearchTerm, cancel: cancelDebounce } =
    useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    cancelDebounce();
    setSearchTerm("");
    setSearch("");
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
    handleClearSearch,
  };
};
