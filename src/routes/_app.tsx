import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="w-full h-full flex gap-20 px-10">
      <div>sidebar</div>
      <Outlet />
    </div>
  ),
});
