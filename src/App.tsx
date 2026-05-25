import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth/useAuth";
import { ErrorPage } from "./pages/ErrorPage";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  context: {
    auth: undefined!,
  },
  routeTree,
  notFoundMode: "root",
  defaultErrorComponent: () => <ErrorPage error={t("page.error.defaultErrorMessage")} />,
  defaultNotFoundComponent: () => <ErrorPage error={t("page.error.defaultNotFoundMessage")} />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  useEffect(() => {
    router.invalidate();
  }, [auth.isAuthenticated, auth.isFirstLoad, auth.isVerified, auth.isAdmin]);

  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
