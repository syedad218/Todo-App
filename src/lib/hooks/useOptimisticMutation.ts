import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "lib/utils/errorParser";
import toast from "react-hot-toast";

interface OptimisticMutationProps<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey: (string | number)[];
  updateFn: (oldData: any, variables: TVariables) => any;
  onSuccess?: () => void;
}

export const useOptimisticMutation = <TData, TVariables>({
  mutationFn,
  queryKey,
  updateFn,
  onSuccess,
}: OptimisticMutationProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, (old: TData | undefined) =>
        updateFn(old, variables)
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      toast.error(getErrorMessage(error));

      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
