import React, { act } from "react";
import { render as rtlRender } from "@testing-library/react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { shouldForwardProps } from "lib/utils/shouldForwardProps";
import { getQueryClient } from "lib/utils/queryClient";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const queryClient = getQueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Providers = ({
  children,
  initialEntries = ["/todos"],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProps}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
            <Routes>
              <Route path="*" element={children} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

function render(ui: React.ReactElement, options = {}) {
  const { initialEntries, ...restOptions } = options as any;
  return rtlRender(ui, {
    wrapper: (props) => (
      <Providers initialEntries={initialEntries} {...props} />
    ),
    ...restOptions,
  });
}

export * from "@testing-library/react";
export { render, act };
