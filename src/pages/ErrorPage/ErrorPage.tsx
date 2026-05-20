import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import ErrorIcon from "@assets/icon/ErrorIcon.svg?react";
import { Button } from "@components/shared";
import { cn } from "@root/lib/utils";
import { ErrorPageProps } from "./types";

export const ErrorPage = ({ error, deviceError, embedded = false }: ErrorPageProps) => {
  const { history } = useRouter();
  const { t } = useTranslation();

  const handleGoBack = () => {
    history.back();
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        embedded ? "h-full min-h-0" : "h-screen",
      )}
    >
      <div className="flex w-140 flex-col items-center justify-center gap-6">
        <ErrorIcon />
        <p className="text-4xl">{t("page.error.oops")}</p>
        <p className="whitespace-pre-line">{error}</p>
        {!deviceError && (
          <Button variant="filled" className="w-55" onClick={handleGoBack}>
            {t("page.error.goBack")}
          </Button>
        )}
      </div>
    </div>
  );
};
