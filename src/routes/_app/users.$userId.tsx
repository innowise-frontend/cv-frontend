import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/$userId")({
  component: () => <div>Hello "/_app/users/$userId"!</div>,
});
