import { styled } from "styled-components";

export const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  width: 100%;
  position: relative;
  height: 360px;
`;
