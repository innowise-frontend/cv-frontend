import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";
import { CvProjectsTable } from "@root/pages/CvPage/components/CvProjects";

export const Route = createFileRoute("/_app/cvs/$cvId/projects")({
  validateSearch: ({ search }: { search?: string }) => ({
    search: search,
  }),
  component: function CvProjectsRoute() {
    const { cvId } = Route.useParams();

    return (
      <TabsContent value="projects" className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <CvProjectsTable key={cvId} />
      </TabsContent>
    );
  },
});
