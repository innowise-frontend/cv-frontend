import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sonner } from "@components/shared/Sonner/Sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <Sonner />
      <Outlet />
    </>
  ),
});
