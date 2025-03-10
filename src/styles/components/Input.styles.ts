import styled from "styled-components";
import type { ThemeType } from "styles/theme";

interface BaseInputProps {
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  padding?: keyof ThemeType["spacing"];
  error?: boolean;
}

export const BaseInput = styled.input<BaseInputProps>`
  padding: ${({ theme, padding = "md" }) => theme.spacing[padding]};
  padding-left: ${({ theme, hasLeftIcon }) =>
    hasLeftIcon
      ? `calc(${theme.spacing.md} + 1rem + ${theme.spacing.sm})`
      : theme.spacing.md};
  padding-right: ${({ theme, hasRightIcon }) =>
    hasRightIcon
      ? `calc(${theme.spacing.md} + 1rem + ${theme.spacing.sm})`
      : theme.spacing.md};
  border: 2px solid
    ${({ theme, error }) =>
      error ? theme.colors.text.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.fontSizes.regular};
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) =>
      error ? theme.colors.text.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: ${({ theme }) => theme.spacing.sm};
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primaryDark};
`;
