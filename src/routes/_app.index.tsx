import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: () => (
    <div className="flex flex-col gap-4">
      <p>Hello "/"!</p>
    </div>
  ),
});
