import { FallbackProps } from "react-error-boundary";
import { PaginationContent } from "./index";

const PaginationErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <PaginationContent
      resetErrorBoundary={resetErrorBoundary}
      isError={true}
      page={1}
      hasNextPage={false}
      hasPreviousPage={false}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalPages={0}
      hasNoPages={false}
    />
  );
};

export default PaginationErrorFallback;
