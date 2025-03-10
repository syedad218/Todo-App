import { RefreshCcw } from "lucide-react";
import { FallbackProps } from "react-error-boundary";
import { AddInput, AddButton } from "./styles";
import { FlexContainer } from "styles/layouts";

const AddToDoErrorFallback = ({ resetErrorBoundary, error }: FallbackProps) => {
  return (
    <form>
      <FlexContainer>
        <AddInput disabled placeholder={error?.message} />
        <AddButton onClick={resetErrorBoundary} variant="primary">
          <RefreshCcw size={24} strokeWidth={2.5} />
        </AddButton>
      </FlexContainer>
    </form>
  );
};

export default AddToDoErrorFallback;
