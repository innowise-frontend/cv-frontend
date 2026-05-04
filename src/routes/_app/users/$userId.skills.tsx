import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared/Tabs/Tabs";
import { Skills } from "@root/components/UsersProfile/Skills/Skills";

export const Route = createFileRoute("/_app/users/$userId/skills")({
  component: () => (
    <TabsContent value="skills">
      <Skills />
    </TabsContent>
  ),
});
