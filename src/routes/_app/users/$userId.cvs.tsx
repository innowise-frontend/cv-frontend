import { createFileRoute, redirect } from "@tanstack/react-router";
import { TabsContent } from "@root/components/shared";
import { CvsTable } from "@root/pages/UserCvsPage/components/CvsTable/CvsTable";

export const Route = createFileRoute("/_app/users/$userId/cvs")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  beforeLoad: ({ context }) => {
    if (!context.auth.isAdmin) {
      throw redirect({ to: "/not-found" });
    }
  },
  component: () => (
    <TabsContent value="cvs">
      <CvsTable />
    </TabsContent>
  ),
});
