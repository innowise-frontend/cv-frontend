import { createFileRoute } from "@tanstack/react-router";
import { TestTable } from "@root/components/shared/Table/TestTable";

export const Route = createFileRoute("/_app/")({
  component: () => (
    <div className="flex flex-col gap-4 w-full">
      <TestTable />
    </div>
  ),
});
