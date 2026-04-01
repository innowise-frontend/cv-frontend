import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verification")({
  component: () => <div>verification page</div>,
});
