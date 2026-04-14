import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});
