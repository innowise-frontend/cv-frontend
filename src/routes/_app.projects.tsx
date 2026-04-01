import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/projects")({
  component: () => <div>user admin projects</div>,
});
