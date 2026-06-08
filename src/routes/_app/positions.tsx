import { createFileRoute, isNotFound, notFound } from "@tanstack/react-router";
import { PositionsPage } from "@pages/PositionsPage";

export const Route = createFileRoute("/_app/positions")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAdmin) {
      throw notFound();
    }
  },
  errorComponent: ({ error }) => {
    if (isNotFound(error)) {
      throw error;
    }
  },
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  component: () => <PositionsPage />,
});
