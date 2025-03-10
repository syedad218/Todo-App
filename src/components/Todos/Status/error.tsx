import { RefreshCcw } from "lucide-react";
import { MESSAGES } from "lib/constants";
import { getErrorMessage } from "lib/utils/errorParser";
import { Button, Text } from "styles/components";
import { FlexContainer } from "styles/layouts";
import { FallbackProps } from "react-error-boundary";
import { StatusContainer } from "./styles";

const StatusErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <StatusContainer>
      <FlexContainer justify="center" align="center">
        <Text variant="error" padding="md">
          {MESSAGES.ERROR_LOADING_STATUS} {getErrorMessage(error)}
        </Text>
      </FlexContainer>
      <FlexContainer justify="center" align="center">
        <Button variant="primary" size="sm" onClick={resetErrorBoundary}>
          <RefreshCcw size={16} />
          &nbsp; Try again
        </Button>
      </FlexContainer>
    </StatusContainer>
  );
};

export default StatusErrorFallback;
