import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/cvs")({
  validateSearch: ({ search }: { search?: string }) => ({ search }),
  component: () => <Outlet />,
});
