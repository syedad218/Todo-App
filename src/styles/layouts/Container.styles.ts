import styled from "styled-components";
import type { DefaultTheme } from "styled-components";

type SpacingKey = keyof DefaultTheme["spacing"];

export const AppContainer = styled.div`
  max-width: 600px;
  margin: 1rem auto;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

export const FlexContainer = styled.div<{
  justify?: string;
  align?: string;
  direction?: string;
  gap?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  padding?: SpacingKey;
}>`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "stretch"};
  flex-direction: ${({ direction }) => direction || "row"};
  gap: ${({ gap, theme }) => (gap ? theme.spacing[gap] : "0")};
  margin-top: ${({ marginTop, theme }) =>
    marginTop ? theme.spacing[marginTop] : "0"};
  margin-bottom: ${({ marginBottom, theme }) =>
    marginBottom ? theme.spacing[marginBottom] : "0"};
  padding: ${({ padding, theme }) => (padding ? theme.spacing[padding] : "0")};
`;

export const SpacedContainer = styled.div<{
  margin?: SpacingKey;
  padding?: SpacingKey;
  variant?: keyof DefaultTheme["colors"]["background"];
}>`
  margin: ${(props) =>
    props.margin ? props.theme.spacing[props.margin] : "0"};
  padding: ${(props) =>
    props.padding ? props.theme.spacing[props.padding] : "0"};
  background-color: ${({ theme, variant }) =>
    variant ? theme.colors.background[variant] : theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;
