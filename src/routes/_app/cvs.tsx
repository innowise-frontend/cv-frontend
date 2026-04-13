import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/cvs")({
  component: () => <div>user cvs</div>,
});
