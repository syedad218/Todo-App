import { SearchInput } from "components/Shared/Input";
import { SpacedContainer } from "styles/layouts";
import { CircleX } from "lucide-react";
import { Button } from "styles/components";
import styled from "styled-components";
import { useTodoSearch } from "lib/hooks/useTodoSearch";

const ClearButton = styled(Button)`
  padding: 0;
  pointer-events: auto;
`;

const SearchTodo = () => {
  const { searchTerm, handleSearch, handleClearSearch } = useTodoSearch();

  const renderClearButton = () => {
    if (!searchTerm?.trim()) return null;

    return (
      <ClearButton
        variant="transparent"
        size="sm"
        onClick={handleClearSearch}
        aria-label="Clear search"
      >
        <CircleX size={21} />
      </ClearButton>
    );
  };

  return (
    <SpacedContainer margin="md">
      <SearchInput
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleSearch}
        aria-label="Search todos"
        padding="sm"
        rightIcon={renderClearButton()}
        data-testid="todos-search-input"
      />
    </SpacedContainer>
  );
};

export default SearchTodo;
