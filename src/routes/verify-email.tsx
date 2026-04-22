import { createFileRoute } from "@tanstack/react-router";
import { VerifyEmailPage } from "@root/pages/VerifyEmailPage";

export const Route = createFileRoute("/verify-email")({
  component: () => <VerifyEmailPage />,
});
