import styled from "styled-components";
import type { ThemeType } from "styles/theme";

interface PillProps {
  variant?: "success" | "default" | "progress";
  size?: keyof ThemeType["typography"]["fontSizes"];
}

interface IndicatorDotProps extends PillProps {}

export const Pill = styled.div<PillProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.xlarge};
  background-color: ${({ theme, variant }) =>
    variant === "success"
      ? theme.colors.successLight
      : variant === "progress"
      ? theme.colors.primaryLight
      : theme.colors.background.secondary};
  color: ${({ theme, variant }) =>
    variant === "success"
      ? theme.colors.text.successDark
      : variant === "progress"
      ? theme.colors.text.primaryDark
      : theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  display: flex;
  align-items: center;
  font-size: ${({ theme, size }) =>
    theme.typography.fontSizes[size || "regular"]};
`;

export const IndicatorDot = styled.span<IndicatorDotProps>`
  display: inline-block;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${({ theme, variant }) =>
    variant === "success" ? theme.colors.success : "trasparent"};
  margin-right: ${({ theme }) => theme.spacing.sm};
  border: 2px solid
    ${({ theme, variant }) =>
      variant === "success" ? theme.colors.success : theme.colors.text.primary};
`;
