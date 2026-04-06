import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@components/Sidebar";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="w-full h-screen pt-11 pb-3 flex gap-20">
      <Sidebar />
      <Outlet />
    </div>
  ),
});
