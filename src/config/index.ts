import env from "./env";
import { QueryClientConfig } from "@tanstack/react-query";

type Config = {
  baseUrl: string;
  queryClientConfig: QueryClientConfig;
  isQueryDevtoolsEnabled: boolean;
  todosPerPage: number;
  isDev: boolean;
  isReactScanEnabled: boolean;
};

export const CONFIG: Config = {
  /** Base URL for the API */
  baseUrl: env.apiUrl,
  /** Query client config */
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: env.queryStaleTime,
        retry: env.queryRetry,
      },
    },
  },
  /** React Query devtools panel visibility */
  isQueryDevtoolsEnabled: env.isQueryDevtoolsEnabled,
  /** Number of todos per page */
  todosPerPage: 5,
  isDev: env.isDev,
  /** To enable react-scan */
  isReactScanEnabled: env.isReactScanEnabled,
};

/** Development tools configuration flags */
export const isReactScanEnabled: boolean =
  CONFIG.isDev && CONFIG.isReactScanEnabled;
export const isQueryDevtoolsEnabled: boolean =
  CONFIG.isDev && CONFIG.isQueryDevtoolsEnabled;
