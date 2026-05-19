import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Spinner } from "@components/shared";
import { Avatar } from "@components/UserProfile/Profile/components/Avatar";
import { Info } from "@components/UserProfile/Profile/components/Info";
import { ErrorPage } from "@root/pages/ErrorPage";
import { useUserProfile } from "./api";

export const Profile = () => {
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { data, isPending, isError } = useUserProfile(userId);

  if (isPending) {
    return <Spinner />;
  }

  if (isError || !data) {
    return <ErrorPage embedded error={t("page.profile.userNotFound")} />;
  }

  return (
    <div className="w-full py-3">
      <Avatar />
      <Info />
    </div>
  );
};
