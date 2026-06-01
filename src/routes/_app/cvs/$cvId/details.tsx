import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";
import { CvDetails } from "@root/pages/CvPage/components/CvDetails";

export const Route = createFileRoute("/_app/cvs/$cvId/details")({
  component: function CvDetailsRoute() {
    const { cvId } = Route.useParams();

    return (
      <TabsContent value="details" className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <CvDetails key={cvId} />
      </TabsContent>
    );
  },
});
