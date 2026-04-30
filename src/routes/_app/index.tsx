import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "@root/pages/UsersPage";

export const Route = createFileRoute("/_app/")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  component: () => <UsersPage />,
});
