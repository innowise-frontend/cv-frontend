import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Sonner } from "@components/shared/Sonner/Sonner";
import { AuthContextType } from "@root/context/AuthContext";
import { getMobileDevice } from "@root/lib/getMobileDevice/getMobileDevice";
import { ErrorPage } from "@root/pages/ErrorPage";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { t } = useTranslation();
    const isMobileDevice = getMobileDevice();

    if (isMobileDevice) {
      return <ErrorPage error={t("page.error.mobileNotSupportedMessage")} deviceError />;
    }

    return (
      <>
        <Sonner />
        <Outlet />
      </>
    );
  },
});
