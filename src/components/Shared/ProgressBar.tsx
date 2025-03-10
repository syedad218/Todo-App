import React from "react";
import { ProgressBarContainer, ProgressBarFill } from "styles/components";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={normalizedProgress} />
    </ProgressBarContainer>
  );
};
