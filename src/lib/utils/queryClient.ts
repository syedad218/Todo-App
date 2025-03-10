import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const getQueryClient = (config: QueryClientConfig) => {
  const queryClient = new QueryClient(config);

  return queryClient;
};
