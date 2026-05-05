import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";
import { Profile } from "@root/components/UserProfile/Profile";

export const Route = createFileRoute("/_app/users/$userId/profile")({
  component: () => (
    <TabsContent value="profile">
      <Profile />
    </TabsContent>
  ),
});
