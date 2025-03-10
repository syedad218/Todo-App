import { useSuspenseQuery } from "@tanstack/react-query";
import { getSummary } from "services/todos";

export const useSummary = () => {
  return useSuspenseQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
};
