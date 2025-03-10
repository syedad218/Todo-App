import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "styles/components";
import { RefreshCcw } from "lucide-react";
import { getErrorMessage } from "lib/utils/errorParser";
import {
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
} from "components/Error/styles";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <ErrorContainer direction="column" align="center" justify="center">
      <ErrorTitle>Something went wrong! </ErrorTitle>
      <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>
      <Button onClick={resetErrorBoundary} variant="primary">
        <RefreshCcw size={16} />
        &nbsp;Try again
      </Button>
    </ErrorContainer>
  );
};
