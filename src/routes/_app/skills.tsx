import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/skills")({
  component: () => <div>users skills</div>,
});
