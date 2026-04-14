import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { AuthPage } from "@pages/AuthPage/AuthPage";

const AuthSearchSchema = z.object({
  mode: z.enum(["login", "signup"]).catch("login"),
});

export const Route = createFileRoute("/_public/auth")({
  validateSearch: (search) => AuthSearchSchema.parse(search),
  component: () => <AuthPage />,
});
