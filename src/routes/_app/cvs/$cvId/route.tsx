import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CvPage } from "@root/pages/CvPage/CvPage";

export const Route = createFileRoute("/_app/cvs/$cvId")({
  component: () => (
    <CvPage>
      <Outlet />
    </CvPage>
  ),
});
