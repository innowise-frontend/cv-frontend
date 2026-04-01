import { Sidebar } from "@root/components/Sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="w-full h-screen pt-11 pb-3 flex gap-20">
      <Sidebar />
      <Outlet />
    </div>
  ),
});
