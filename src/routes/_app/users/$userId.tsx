import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserProfilePage } from "@root/pages/UserProfilePage";

export const Route = createFileRoute("/_app/users/$userId")({
  component: () => (
    <UserProfilePage>
      <Outlet />
    </UserProfilePage>
  ),
});
