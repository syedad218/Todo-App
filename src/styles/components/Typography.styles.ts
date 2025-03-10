import styled from "styled-components";
import type { ThemeType } from "styles/theme";

interface TextProps {
  size?: keyof ThemeType["typography"]["fontSizes"];
  variant?: keyof ThemeType["colors"]["text"];
  width?: string;
  flexGrow?: number;
  textDecoration?: string;
  padding?: keyof ThemeType["spacing"];
}

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bolder};
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Text = styled.p<TextProps>`
  font-size: ${({ theme, size }) =>
    theme.typography.fontSizes[size || "regular"]};
  color: ${({ theme, variant }) => theme.colors.text[variant || "primary"]};
  line-height: 1.5;
  width: ${({ width }) => width || "auto"};
  flex-grow: ${({ flexGrow }) => flexGrow || 0};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  padding: ${({ padding, theme }) => padding && theme.spacing[padding]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
