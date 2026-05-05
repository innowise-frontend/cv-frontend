import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ErrorPage } from "@root/pages/ErrorPage";
import { Avatar } from "./Avatar";
import { ProfileInformations } from "./ProfileInformations";
import { useUserProfile } from "./useUserProfile";

export const Profile = () => {
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { data, isPending, isError } = useUserProfile(userId);

  if (isPending) {
    return null;
  }

  if (isError || !data) {
    return <ErrorPage error={t("page.profile.userNotFound")} />;
  }

  return (
    <div className="w-full py-3">
      <Avatar />
      <ProfileInformations />
    </div>
  );
};
