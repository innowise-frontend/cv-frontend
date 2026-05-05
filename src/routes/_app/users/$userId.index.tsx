import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/$userId/")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/users/$userId/profile", params });
  },
});
