import { createFileRoute, notFound, isNotFound } from "@tanstack/react-router";
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
      throw notFound();
    }
  },
  errorComponent: ({ error }) => {
    if (isNotFound(error)) {
      throw error;
    }
  },
  component: () => (
    <TabsContent value="cvs">
      <CvsTable />
    </TabsContent>
  ),
});
