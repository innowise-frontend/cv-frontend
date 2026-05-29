import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";

export const Route = createFileRoute("/_app/cvs/$cvId/skills")({
  component: () => <TabsContent value="skills" />,
});
