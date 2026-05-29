import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";

export const Route = createFileRoute("/_app/cvs/$cvId/preview")({
  component: () => <TabsContent value="preview" />,
});
