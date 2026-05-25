import { createFileRoute } from "@tanstack/react-router";
import { UserCvsPage } from "@root/pages/UserCvsPage/UserCvsPage";

export const Route = createFileRoute("/_app/cvs")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search,
    };
  },
  component: () => <UserCvsPage />,
});
