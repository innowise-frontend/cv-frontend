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
    <div className="flex h-screen gap-20 overflow-hidden pb-3">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden  pt-4  pr-6">
        <Outlet />
      </main>
    </div>
  ),
});
