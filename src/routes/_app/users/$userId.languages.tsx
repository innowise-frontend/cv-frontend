import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared/Tabs/Tabs";
import { Languages } from "@root/components/UsersProfile/Languages/Languages";

export const Route = createFileRoute("/_app/users/$userId/languages")({
  component: () => (
    <TabsContent value="languages">
      <Languages />
    </TabsContent>
  ),
});
