import { useParams } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import DownloadIcon from "@root/assets/icon/DownloadIcon.svg?react";
import { Button } from "@root/components/shared/Button/Button";
import { Input } from "@root/components/shared/Input/Input";
import { Select } from "@root/components/shared/Select/Select";
import { useAuth } from "@root/hooks/useAuth/useAuth";
import { cn } from "@root/lib/utils";
import { ErrorPage } from "@root/pages/ErrorPage";
import { prepareAvatarForUpload } from "./avatarFileUpload";
import { MAX_AVATAR_BYTES, AVATAR_ACCEPT } from "./constants";
import { useUserProfile, useUserProfileMutations } from "./useUserProfile";
import type { Option } from "./types";

export const Profile = () => {
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { isAdmin, userId: authUserId, isVerified } = useAuth();
  const { data, isPending, isError } = useUserProfile(userId);
  const { updateUser, updateProfile, uploadAvatar, sendVerificationEmail } =
    useUserProfileMutations(userId);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const initialFirstName = data?.user.profile.first_name ?? "";
  const initialLastName = data?.user.profile.last_name ?? "";
  const fullName = data?.user.profile.full_name ?? "";
  const email = data?.user.email ?? "";
  const createdAt = data?.user.profile.created_at ?? "";
  const initialDepartmentId = data?.user.department?.id ?? "";
  const initialPositionId = data?.user.position?.id ?? "";

  const [draft, setDraft] = useState<{
    firstName?: string;
    lastName?: string;
    departmentId?: string;
    positionId?: string;
  }>({});

  const firstName = draft.firstName ?? initialFirstName;
  const lastName = draft.lastName ?? initialLastName;
  const departmentId = draft.departmentId ?? initialDepartmentId;
  const positionId = draft.positionId ?? initialPositionId;

  const departments: Option[] =
    data?.departments.map((d) => ({ value: d.id, label: d.name })) ?? [];
  const positions: Option[] = data?.positions.map((p) => ({ value: p.id, label: p.name })) ?? [];

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.trim();
  const avatar = data?.user.profile.avatar ?? null;

  const memberSinceLine = new Date(Number(createdAt)).toDateString();

  const hasChanges =
    (firstName || "") !== (initialFirstName || "") ||
    (lastName || "") !== (initialLastName || "") ||
    (departmentId || "") !== (initialDepartmentId || "") ||
    (positionId || "") !== (initialPositionId || "");

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

  const handleVerifyEmail = (email: string) => {
    sendVerificationEmail.mutate(email);
  };

  async function handleUpdate() {
    if (!hasChanges) return;

    try {
      if (firstName !== initialFirstName || lastName !== initialLastName) {
        await updateProfile.mutateAsync({
          userId,
          first_name: firstName || null,
          last_name: lastName || null,
        });
      }

      if (departmentId !== initialDepartmentId || positionId !== initialPositionId) {
        await updateUser.mutateAsync({
          userId,
          departmentId: departmentId || undefined,
          positionId: positionId || undefined,
        });
      }

      setDraft({});
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (isPending) {
    return null;
  }

  if (isError || !data) {
    return <ErrorPage error={t("page.profile.userNotFound")} />;
  }

  return (
    <div className="w-full py-3">
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

      <div className="mt-8 mb-16.5 flex flex-col">
        <p className="text-gray-2 dark:text-gray-8 text-2xl mb-2">{fullName}</p>
        <p className="text-gray-3 dark:text-gray-5 text-base">{email}</p>
        {memberSinceLine ? (
          <p className="text-gray-2 dark:text-gray-8 text-base">
            {t("page.profile.memberSince")} {memberSinceLine}
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-12 w-full">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          <Input
            disabled={!isEditable}
            label={t("page.profile.firstName")}
            value={firstName}
            className="border-gray-5 bg-gray-8 text-gray-2 dark:bg-gray-2 dark:text-gray-5"
            onChange={(e) => setDraft((prev) => ({ ...prev, firstName: e.target.value }))}
          />

          <Input
            disabled={!isEditable}
            label={t("page.profile.lastName")}
            value={lastName}
            className="border-gray-5 bg-gray-8 text-gray-2 dark:bg-gray-2 dark:text-gray-5"
            onChange={(e) => setDraft((prev) => ({ ...prev, lastName: e.target.value }))}
          />

          <Select
            disabled={!isEditable}
            label={t("page.profile.department")}
            list={departments}
            placeholder={t("page.profile.selectDepartment")}
            value={departmentId}
            onValueChange={(next) => setDraft((prev) => ({ ...prev, departmentId: next }))}
          />

          <Select
            disabled={!isEditable}
            label={t("page.profile.position")}
            list={positions}
            placeholder={t("page.profile.selectPosition")}
            value={positionId}
            onValueChange={(next) => setDraft((prev) => ({ ...prev, positionId: next }))}
          />
        </div>
        {isEditable && (
          <div className="mt-10 flex justify-end gap-6">
            {userId === authUserId && !isVerified && (
              <Button variant="outline" type="button" onClick={() => handleVerifyEmail(email)}>
                {t("page.profile.verifyEmail")}
              </Button>
            )}
            <Button variant="filled" type="button" disabled={!hasChanges} onClick={handleUpdate}>
              {t("page.profile.update")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
