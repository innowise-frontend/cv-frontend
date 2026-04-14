import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ResetPasswordPage } from "@pages/ResetPasswordPage";

const searchSchema = z.object({
  token: z.string().nonempty(),
});

export const Route = createFileRoute("/_public/reset-password")({
  validateSearch: (search) => searchSchema.parse(search),
  component: () => <ResetPasswordPage />,
});
