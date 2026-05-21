import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { ErrorPage } from "@root/pages/ErrorPage";

export const Route = createFileRoute("/_public/not-found")({
  component: () => <ErrorPage error={t("page.error.defaultNotFoundMessage")} />,
});
