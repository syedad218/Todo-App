import { RefreshCcw } from "lucide-react";
import { Button, Text } from "styles/components";

interface PaginationTextProps {
  page: number;
  totalPages: number;
  hasNoPages: boolean;
  isError?: boolean;
  resetErrorBoundary?: () => void;
}

export const PaginationText = ({
  page,
  totalPages,
  hasNoPages,
  isError,
  resetErrorBoundary,
}: PaginationTextProps) => {
  if (isError) {
    return (
      <Button variant="transparent" onClick={resetErrorBoundary} size="sm">
        <RefreshCcw size={16} />
        &nbsp; Try again
      </Button>
    );
  }

  return (
    <Text variant="secondary">
      {hasNoPages ? "No results" : `Page ${page} of ${totalPages}`}
    </Text>
  );
};
