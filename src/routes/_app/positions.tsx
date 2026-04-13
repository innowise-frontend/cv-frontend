import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/positions")({
  component: () => <div>user admin positions</div>,
});
