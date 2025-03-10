import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

export const SkeletonCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.background.secondary};
`;

export const SkeletonText = styled.div<{ size?: string; width?: string }>`
  height: ${({ theme, size }) => theme.typography.fontSizes[size || "regular"]};
  line-height: 1.5;
  flex-grow: 1;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.skeleton.lighter};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton.lighter} 0px,
    ${({ theme }) => theme.colors.skeleton.lightest} 40px,
    ${({ theme }) => theme.colors.skeleton.lighter} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  width: ${({ width }) => width || "auto"};
`;

export const SkeletonDelete = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.skeleton.lighter};
  margin-left: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const TodoSkeletonItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.background.light};
  height: 65px;
`;

export const SkeletonPill = styled.div<{ variant?: "success" | "default" }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.xlarge};
  background-color: ${({ theme, variant }) => theme.colors.skeleton.lighter};

  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton.lighter} 0px,
    ${({ theme }) => theme.colors.skeleton.lightest} 40px,
    ${({ theme }) => theme.colors.skeleton.lighter} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.transparent};
`;

export const SkeletonIndicatorDot = styled.div<{
  variant?: "success" | "default";
}>`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${({ theme, variant }) => theme.colors.skeleton.lighter};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonButton = styled.div`
  width: ${({ theme }) => theme.buttons.width.md};
  height: ${({ theme }) => theme.buttons.height.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.skeleton.lighter};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;
