import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/verification")({
  component: () => <div>verification page</div>,
});
