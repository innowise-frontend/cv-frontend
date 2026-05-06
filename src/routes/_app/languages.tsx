import { createFileRoute } from "@tanstack/react-router";
import { LanguagesPage } from "@pages/LanguagesPage";

export const Route = createFileRoute("/_app/languages")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  component: () => <LanguagesPage />,
});
