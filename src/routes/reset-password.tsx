import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ResetPassword } from "@root/pages/ResetPassword";

const searchSchema = z.object({
  token: z.string().nonempty(),
});

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search) => searchSchema.parse(search),
  component: () => <ResetPassword />,
});
