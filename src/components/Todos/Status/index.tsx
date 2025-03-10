import React, { Suspense } from "react";
import { Pill, IndicatorDot } from "styles/components";
import { FlexContainer } from "styles/layouts";
import { useSummary } from "lib/hooks/useSummary";
import { Activity } from "lucide-react";
import { ProgressBar } from "components/Shared/ProgressBar";
import StatusSkeleton from "./loading";
import { ErrorBoundary } from "components/Error";
import StatusErrorFallback from "./error";
import { getPercentageProgress } from "lib/utils/todo";
import { StatusContainer } from "./styles";

const Status: React.FC = () => {
  const { data } = useSummary();
  const { total, done } = data;
  const undone = total - done;

  const percentageProgress = getPercentageProgress(total, done);

  return (
    <StatusContainer>
      <ProgressBar progress={percentageProgress} />
      <FlexContainer
        justify="space-between"
        align="center"
        gap="md"
        marginTop="lg"
      >
        <FlexContainer align="center" gap="sm">
          <Pill variant="success" data-testid="done-count">
            <IndicatorDot variant="success" />
            Done: {done}
          </Pill>
          <Pill data-testid="todo-count">
            <IndicatorDot />
            To Do: {undone}
          </Pill>
        </FlexContainer>
        <Pill data-testid="percentage-progress" variant="progress">
          <Activity size={16} />
          &nbsp;
          {percentageProgress}% completed
        </Pill>
      </FlexContainer>
    </StatusContainer>
  );
};

export default function StatusWrapper() {
  return (
    <ErrorBoundary fallback={StatusErrorFallback}>
      <Suspense fallback={<StatusSkeleton />}>
        <Status />
      </Suspense>
    </ErrorBoundary>
  );
}
