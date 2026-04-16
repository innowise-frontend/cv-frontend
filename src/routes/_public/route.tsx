import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated && !context.auth.isFirstLoad) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});
