import { createFileRoute } from "@tanstack/react-router";
import { LanguagesPage } from "@pages/LanguagesPage";

export const Route = createFileRoute("/_app/languages")({
  component: () => <LanguagesPage />,
});
