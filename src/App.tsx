import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { ErrorPage } from "./pages/ErrorPage";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  context: {
    auth: undefined!,
  },
  routeTree,
  notFoundMode: "root",
  defaultErrorComponent: () => (
    <ErrorPage
      error={
        "Something went wrong. We’re already working on fixing it. \n Please try again or go back."
      }
    />
  ),
  defaultNotFoundComponent: () => (
    <ErrorPage
      error={
        "Hmm… this doesn’t seem to be the page you were looking for. \n Let’s get you back on track."
      }
    />
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

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
