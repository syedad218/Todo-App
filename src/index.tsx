import { scan } from "react-scan";
import React from "react";
import ReactDOM from "react-dom/client";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme } from "styles/theme";
import { GlobalStyle } from "styles/globalStyles";
import { ErrorBoundary, ErrorFallback } from "components/Error";
import { getQueryClient } from "lib/utils/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CONFIG, isQueryDevtoolsEnabled, isReactScanEnabled } from "config";
import { shouldForwardProps } from "lib/utils/shouldForwardProps";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";

scan({
  enabled: !!isReactScanEnabled,
});

const queryClient = getQueryClient(CONFIG.queryClientConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={shouldForwardProps}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary fallback={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={!!isQueryDevtoolsEnabled} />
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </StyleSheetManager>
  </React.StrictMode>
);
