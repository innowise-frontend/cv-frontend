import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context, location }) => {
    const isVerifyEmail = location.pathname.endsWith("/verify-email");
    const isNotFound = location.pathname.endsWith("/not-found");

    if (context.auth.isAuthenticated && !isVerifyEmail && !isNotFound) {
      throw redirect({ to: "/", search: { search: undefined } });
    }
  },
  component: () => <Outlet />,
});
