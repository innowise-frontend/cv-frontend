import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@root/components/shared/Button/Button";
import { Input } from "@root/components/shared/Input/Input";
import { Select } from "@root/components/shared/Select/Select";
import { useAuth } from "@root/hooks/useAuth/useAuth";
import { getErrorToastMessage } from "@root/lib";
import { useUserProfile, useUserProfileMutations } from "../../api";
import type { Option } from "../../types";

export const Info = () => {
  const { t } = useTranslation();
  const { userId } = useParams({ from: "/_app/users/$userId" });
  const { isAdmin, userId: authUserId, isVerified } = useAuth();
  const { data } = useUserProfile(userId);
  const { updateUser, updateProfile, sendVerificationEmail } = useUserProfileMutations(userId);

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

  const memberSinceLine = new Date(Number(createdAt)).toDateString();

  const hasChanges =
    (firstName || "") !== (initialFirstName || "") ||
    (lastName || "") !== (initialLastName || "") ||
    (departmentId || "") !== (initialDepartmentId || "") ||
    (positionId || "") !== (initialPositionId || "");

  const isEditable = isAdmin || userId === authUserId;

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
      toast.error(getErrorToastMessage(e));
    }
  }

  return (
    <>
      <div className="mt-8 mb-16.5 flex flex-col">
        <p className="text-gray-2 dark:text-gray-8 text-2xl mb-2">{fullName}</p>
        <p className="text-gray-3 dark:text-gray-5 text-base">{email}</p>
        {memberSinceLine ? (
          <p className="text-gray-2 dark:text-gray-8 text-base">
            {t("page.profile.memberSince")} {memberSinceLine}
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-12 w-[860px]">
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[410px_410px] md:justify-center">
          <Input
            disabled={!isEditable}
            label={t("page.profile.firstName")}
            value={firstName}
            className="w-full md:w-[410px] border-gray-5 bg-gray-8 text-gray-2 dark:bg-gray-2 dark:text-gray-5"
            onChange={(e) => setDraft((prev) => ({ ...prev, firstName: e.target.value }))}
          />

          <Input
            disabled={!isEditable}
            label={t("page.profile.lastName")}
            value={lastName}
            className="w-full md:w-[410px] border-gray-5 bg-gray-8 text-gray-2 dark:bg-gray-2 dark:text-gray-5"
            onChange={(e) => setDraft((prev) => ({ ...prev, lastName: e.target.value }))}
          />

          <Select
            disabled={!isEditable}
            label={t("page.profile.department")}
            list={departments}
            placeholder={t("page.profile.selectDepartment")}
            value={departmentId}
            onValueChange={(next) => setDraft((prev) => ({ ...prev, departmentId: next }))}
            className="w-full md:w-[410px]"
          />

          <Select
            disabled={!isEditable}
            label={t("page.profile.position")}
            list={positions}
            placeholder={t("page.profile.selectPosition")}
            value={positionId}
            onValueChange={(next) => setDraft((prev) => ({ ...prev, positionId: next }))}
            className="w-full md:w-[410px]"
          />
        </div>
        {isEditable && (
          <div className="mt-10 flex justify-end gap-6">
            {userId === authUserId && !isVerified && (
              <Button
                variant="outline"
                type="button"
                className="w-40"
                onClick={() => handleVerifyEmail(email)}
              >
                {t("page.profile.verifyEmail")}
              </Button>
            )}
            <Button
              variant="filled"
              type="button"
              className="w-40"
              disabled={!hasChanges}
              onClick={handleUpdate}
            >
              {t("page.profile.update")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
