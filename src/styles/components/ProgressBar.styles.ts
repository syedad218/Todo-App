import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.success};
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;
