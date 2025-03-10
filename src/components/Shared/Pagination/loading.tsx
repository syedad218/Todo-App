import { SkeletonText, SkeletonButton } from "styles/components";
import { PaginationContainer } from "./styles";

const PaginationSkeleton = () => {
  return (
    <PaginationContainer justify="space-between" align="center" gap="md">
      <SkeletonButton>Previous</SkeletonButton>
      <SkeletonText width="15%" style={{ flexGrow: 0 }} />
      <SkeletonButton>Next</SkeletonButton>
    </PaginationContainer>
  );
};

export default PaginationSkeleton;
