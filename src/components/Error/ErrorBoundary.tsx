import React from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback: React.ComponentType<FallbackProps>;
}

export const ErrorBoundary: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
  fallback,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          FallbackComponent={fallback}
          onReset={reset}
          onError={(error) => {
            console.error("Error caught by boundary:", error);
          }}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
