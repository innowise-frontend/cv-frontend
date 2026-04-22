import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: ({ context, location }) => {
    const isVerifyEmail = location.pathname.endsWith("/verify-email");

    if (context.auth.isAuthenticated && !isVerifyEmail) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});
