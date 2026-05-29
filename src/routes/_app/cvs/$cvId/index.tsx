import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/cvs/$cvId/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/cvs/$cvId/details",
      params,
      search: { search: undefined },
    });
  },
});
