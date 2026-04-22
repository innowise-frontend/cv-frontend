import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  validateSearch: ({ search }: { search?: string }) => {
    return {
      search: search,
    };
  },
  component: () => <div className="flex flex-col w-full">users table</div>,
});
