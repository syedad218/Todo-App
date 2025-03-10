import { styled } from "styled-components";

export const Item = styled.li<{ completed: boolean; isPending: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.background.light};
  transition: ${({ theme }) => theme.transitions.default};
  cursor: ${({ isPending }) => (isPending ? "auto" : "pointer")};
  & > p {
    opacity: ${({ isPending, completed }) =>
      isPending ? 0.5 : completed ? 0.8 : 1};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;
