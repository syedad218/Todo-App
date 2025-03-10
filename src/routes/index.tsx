import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "App";
import Todos from "components/Todos/index";
import { ErrorBoundary } from "components/Error";
import { ErrorFallback } from "components/Error";
import { validatePageParam } from "lib/utils/routing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary fallback={ErrorFallback}>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/todos" replace />,
      },
      {
        path: "todos",
        element: <Todos />,
        loader: validatePageParam,
      },
    ],
  },
]);
