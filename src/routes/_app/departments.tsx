import { createFileRoute, isNotFound, notFound } from "@tanstack/react-router";
import { DepartmentsPage } from "@pages/DepartmentsPage";

export const Route = createFileRoute("/_app/departments")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
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
  component: () => <DepartmentsPage />,
});
