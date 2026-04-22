import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Sidebar } from "@components/Sidebar";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context }) => {
    if (context.auth.isFirstLoad) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/auth", search: { mode: "login" } });
    }
  },
  component: () => (
    <div className="w-full h-screen pb-3 flex gap-20">
      <Sidebar />
      <Outlet />
    </div>
  ),
});
