import { createFileRoute } from "@tanstack/react-router";
import { TestTable } from "@root/components/shared/Table/TestTable";

export const Route = createFileRoute("/_app/")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  component: () => (
    <div className="flex flex-col w-full">
      <TestTable />
    </div>
  ),
});
