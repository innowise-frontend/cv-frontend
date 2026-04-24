import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Sonner } from "@components/shared/Sonner/Sonner";
import { AuthContextType } from "@root/context/AuthContext";

interface RouterContext {
  auth: AuthContextType;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Sonner />
      <Outlet />
    </>
  ),
});
