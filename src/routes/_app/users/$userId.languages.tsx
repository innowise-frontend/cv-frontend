import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";
import { Languages } from "@root/components/UserProfile/Languages";

export const Route = createFileRoute("/_app/users/$userId/languages")({
  component: () => (
    <TabsContent value="languages">
      <Languages />
    </TabsContent>
  ),
});
