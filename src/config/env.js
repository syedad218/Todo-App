import { envSchema } from "../lib/schema/env.js";

const processEnv = envSchema.parse({
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  REACT_APP_QUERY_STALE_TIME: Number(process.env.REACT_APP_QUERY_STALE_TIME),
  REACT_APP_QUERY_RETRY: Number(process.env.REACT_APP_QUERY_RETRY),
  REACT_APP_QUERY_DEVTOOLS: process.env.REACT_APP_QUERY_DEVTOOLS === "true",
  APP_ENV: process.env.NODE_ENV,
  REACT_APP_REACT_SCAN_ENABLED:
    process.env.REACT_APP_REACT_SCAN_ENABLED === "true",
});

const env = {
  apiUrl: processEnv.REACT_APP_API_URL,
  queryStaleTime: Number(processEnv.REACT_APP_QUERY_STALE_TIME),
  queryRetry: Number(processEnv.REACT_APP_QUERY_RETRY),
  isQueryDevtoolsEnabled: processEnv.REACT_APP_QUERY_DEVTOOLS,
  isDev: processEnv.APP_ENV === "development",
  isReactScanEnabled: processEnv.REACT_APP_REACT_SCAN_ENABLED,
};

export default env;
