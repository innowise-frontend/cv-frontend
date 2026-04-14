import { createFileRoute } from "@tanstack/react-router";
import { VerificationPage } from "@pages/VerificationPage";

export const Route = createFileRoute("/verify-email")({
  component: () => <VerificationPage />,
});
