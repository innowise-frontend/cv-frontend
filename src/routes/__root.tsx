import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not Found</div>,
});
