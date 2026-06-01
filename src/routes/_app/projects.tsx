import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@pages/ProjectsPage";

export const Route = createFileRoute("/_app/projects")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  component: () => <ProjectsPage />,
});
