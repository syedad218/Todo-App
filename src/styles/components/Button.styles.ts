import styled from "styled-components";
import type { ThemeType } from "styles/theme";

interface ButtonProps {
  variant?: "primary" | "secondary" | "destructive" | "transparent";
  size?: keyof ThemeType["spacing"];
  fullWidth?: boolean;
  width?: keyof ThemeType["buttons"]["width"];
  padding?: string;
  height?: keyof ThemeType["buttons"]["height"];
}

export const Button = styled.button<ButtonProps>`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  font-size: ${({ theme }) => theme.typography.fontSizes.regular};
  width: ${({ fullWidth, width, theme }) =>
    fullWidth ? "100%" : width ? theme.buttons.width[width] : "auto"};
  height: ${({ height, theme }) =>
    height ? theme.buttons.height[height] : "auto"};
  padding: ${({ size, theme, padding }) =>
    padding ?? theme.spacing[size || "md"]};
  background-color: ${({ theme, variant }) =>
    theme.colors[variant || "primary"]};
  color: ${({ variant, theme }) =>
    variant === "transparent"
      ? theme.colors.primary
      : variant === "primary" || variant === "destructive"
      ? "white"
      : theme.colors.text.primary};

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ theme, variant }) =>
      theme.colors[variant || "primary"]};
  }

  &:disabled {
    opacity: 0.6;
    cursor: auto;
    &:hover {
      transform: translateY(0);
    }
  }
`;
