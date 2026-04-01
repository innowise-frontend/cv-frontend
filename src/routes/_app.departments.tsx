import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/departments")({
  component: () => <div>user admin departments</div>,
});
