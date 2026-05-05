import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";
import { Skills } from "@root/components/UserProfile/Skills";

export const Route = createFileRoute("/_app/users/$userId/skills")({
  component: () => (
    <TabsContent value="skills">
      <Skills />
    </TabsContent>
  ),
});
