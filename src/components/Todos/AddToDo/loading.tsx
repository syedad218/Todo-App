import { FlexContainer } from "styles/layouts";
import Spinner from "components/Shared/Spinner";
import { AddInput, AddButton } from "./styles";

export default function AddToDoLoading() {
  return (
    <FlexContainer>
      <AddInput readOnly placeholder="What needs to be done?" />
      <AddButton variant="primary" disabled={true} size="sm" width="xs">
        <Spinner size="md" />
      </AddButton>
    </FlexContainer>
  );
}
