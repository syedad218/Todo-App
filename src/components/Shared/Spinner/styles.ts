import styled from "styled-components";
import { keyframes } from "styled-components";
import { SpinnerProps } from ".";

export const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div<SpinnerProps>`
  border-radius: 50%;
  width: ${({ size, theme }) => theme.spacing[size ?? "md"]};
  height: ${({ size, theme }) => theme.spacing[size ?? "md"]};
  border: 2px solid
    ${({ theme, color }) => color || theme.colors.background.secondary};
  border-top-color: ${({ theme, color }) => color || theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`;
