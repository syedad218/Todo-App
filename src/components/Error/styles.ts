import { styled } from "styled-components";
import { FlexContainer } from "styles/layouts";
import { Text } from "styles/components";

export const ErrorContainer = styled(FlexContainer)`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background.card};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  height: 360px;
`;

export const ErrorTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text.error};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
