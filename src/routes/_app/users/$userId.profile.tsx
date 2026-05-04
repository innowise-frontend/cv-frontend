import { createFileRoute } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared/Tabs/Tabs";
import { Profile } from "@root/components/UsersProfile/Profile/Profile";

export const Route = createFileRoute("/_app/users/$userId/profile")({
  component: () => (
    <TabsContent value="profile">
      <Profile />
    </TabsContent>
  ),
});
