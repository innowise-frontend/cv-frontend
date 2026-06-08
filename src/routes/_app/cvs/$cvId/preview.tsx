import { createFileRoute } from "@tanstack/react-router";
import { CvPreview } from "@pages/CvPage";
import { TabsContent } from "@root/components/shared";

export const Route = createFileRoute("/_app/cvs/$cvId/preview")({
  component: function CvPreviewRoute() {
    const { cvId } = Route.useParams();

    return (
      <TabsContent value="preview" className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <CvPreview key={cvId} />
      </TabsContent>
    );
  },
});
