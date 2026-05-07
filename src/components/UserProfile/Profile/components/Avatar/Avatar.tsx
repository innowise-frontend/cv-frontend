import { useParams } from "@tanstack/react-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import DownloadIcon from "@root/assets/icon/DownloadIcon.svg?react";
import { Avatar as AvatarComponent } from "@root/components/shared/Avatar/Avatar";
import { useAuth } from "@root/hooks/useAuth/useAuth";
import { cn, getErrorToastMessage } from "@root/lib";
import { useUserProfile, useUserProfileMutations } from "../../api";
import { AVATAR_ACCEPT, MAX_AVATAR_BYTES } from "../../constants";
import { prepareAvatarForUpload } from "../../utils";

export const Avatar = () => {
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { isAdmin, userId: authUserId } = useAuth();
  const { data } = useUserProfile(userId);
  const { uploadAvatar } = useUserProfileMutations(userId);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const fullName = data?.user.profile.full_name ?? "";

  const avatar = data?.user.profile.avatar ?? null;

  const isEditable = isAdmin || userId === authUserId;

  async function handleAvatarFile(file: File) {
    const prepared = await prepareAvatarForUpload(file, MAX_AVATAR_BYTES, t);

    if (!prepared.ok) {
      toast.error(getErrorToastMessage(new Error(prepared.message)));

      return;
    }

    try {
      await uploadAvatar.mutateAsync({ userId, ...prepared.avatar });
    } catch (e) {
      toast.error(getErrorToastMessage(e));
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-16">
      <AvatarComponent
        name={fullName}
        imageSrc={avatar ?? ""}
        className="size-30 rounded-full text-4xl"
      />

      {isEditable && (
        <>
          <input
            ref={avatarInputRef}
            type="file"
            accept={AVATAR_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              e.currentTarget.value = "";
              if (file) void handleAvatarFile(file);
            }}
          />
          <div className="flex items-center flex-col gap-1">
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className={cn(
                "flex max-w-full items-center gap-3 rounded-md text-left outline-none text-gray-2 dark:text-gray-8",
              )}
            >
              <DownloadIcon className="size-6 shrink-0 text-gray-2 dark:text-gray-8 " />
              <span className="text-xl font-semibold">{t("page.profile.uploadAvatar")}</span>
            </button>
            <p className="text-base text-gray-4 dark:text-gray-5">
              {t("page.profile.uploadAvatarHint")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
