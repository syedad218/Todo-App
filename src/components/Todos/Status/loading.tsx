import { SkeletonIndicatorDot, SkeletonPill } from "styles/components";
import { FlexContainer } from "styles/layouts";
import { ProgressBar } from "components/Shared/ProgressBar";
import { StatusContainer } from "./styles";

export default function StatusSkeleton() {
  return (
    <StatusContainer>
      <ProgressBar progress={0} />
      <FlexContainer
        justify="space-between"
        align="center"
        gap="md"
        marginTop="lg"
      >
        <FlexContainer align="center" gap="sm">
          <SkeletonPill variant="success">
            <SkeletonIndicatorDot variant="success" />
            Done: 0
          </SkeletonPill>
          <SkeletonPill>
            <SkeletonIndicatorDot />
            To Do: 0
          </SkeletonPill>
        </FlexContainer>
        <SkeletonPill variant="default">
          <SkeletonIndicatorDot />
          &nbsp; 20% completed
        </SkeletonPill>
      </FlexContainer>
    </StatusContainer>
  );
}
