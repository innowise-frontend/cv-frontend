import { useParams } from "@tanstack/react-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import DownloadIcon from "@root/assets/icon/DownloadIcon.svg?react";
import { useAuth } from "@root/hooks/useAuth/useAuth";
import { cn } from "@root/lib/utils";
import { AVATAR_ACCEPT, MAX_AVATAR_BYTES } from "./constants";
import { useUserProfile, useUserProfileMutations } from "./useUserProfile";
import { prepareAvatarForUpload } from "./utils";

export const Avatar = () => {
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { isAdmin, userId: authUserId } = useAuth();
  const { data } = useUserProfile(userId);
  const { uploadAvatar } = useUserProfileMutations(userId);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const firstName = data?.user.profile.first_name ?? "";
  const lastName = data?.user.profile.last_name ?? "";
  const fullName = data?.user.profile.full_name ?? "";

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.trim();
  const avatar = data?.user.profile.avatar ?? null;

  const isEditable = isAdmin || userId === authUserId;

  async function handleAvatarFile(file: File) {
    const prepared = await prepareAvatarForUpload(file, MAX_AVATAR_BYTES, t);

    if (!prepared.ok) {
      toast.error(prepared.message);

      return;
    }

    try {
      await uploadAvatar.mutateAsync({ userId, ...prepared.avatar });
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-16">
      <div
        className={cn(
          "flex size-30 shrink-0 items-center justify-center rounded-full",
          "bg-gray-5 text-3xl text-gray-8 dark:bg-gray-3 dark:text-gray-2",
        )}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={fullName || t("page.profile.userAvatarAlt")}
            className="size-full rounded-full object-cover"
          />
        ) : (
          initials || t("page.profile.initialsUnknown")
        )}
      </div>

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
              <DownloadIcon className="size-6 shrink-0 text-gray-2 dark:text-gray-5 " />
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
