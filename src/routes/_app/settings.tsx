import { createFileRoute } from "@tanstack/react-router";
import { SettingPage } from "@root/pages/SettingPage/SettingPage";

export const Route = createFileRoute("/_app/settings")({
  component: () => <SettingPage />,
});
