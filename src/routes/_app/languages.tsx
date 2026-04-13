import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/languages")({
  component: () => <div>user languages</div>,
});
