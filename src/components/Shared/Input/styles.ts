import styled from "styled-components";

interface IconWrapperProps {
  position?: "left" | "right";
}

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  cursor: default;

  ${({ position, theme }) => {
    if (position === "left") {
      return `left: ${theme.spacing.md};`;
    }
    if (position === "right") {
      return `right: ${theme.spacing.md};`;
    }
    return "";
  }}
`;
