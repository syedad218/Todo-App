import { styled } from "styled-components";
import { Input } from "components/Shared/Input";
import { Button } from "styles/components";

export const AddInput = styled(Input)`
  border-radius: ${({ theme }) =>
    `${theme.borderRadius.small} 0 0 ${theme.borderRadius.small}`};
`;

export const AddButton = styled(Button)`
  border-radius: ${({ theme }) =>
    `0 ${theme.borderRadius.small} ${theme.borderRadius.small} 0`};
  &:hover {
    transform: translateY(0);
  }
`;
