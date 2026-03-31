import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot_password")({
  component: () => <div>forgot password</div>,
});
