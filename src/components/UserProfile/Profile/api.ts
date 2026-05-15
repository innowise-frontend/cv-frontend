import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { getErrorToastMessage } from "@root/lib";
import { sendVerification } from "@services/auth/sendVerification/sendVerification";
import {
  fetchUserProfile,
  submitUpdateProfile,
  submitUpdateUser,
  submitUploadAvatar,
} from "@services/auth/updateUserProfile/updateUserProfile";
import type {
  UpdateProfileInput,
  UpdateUserInput,
  UploadAvatarInput,
  UserQuery,
} from "@services/graphql/__generated__/graphql";

export function useUserProfile(userId: string) {
  return useQuery<UserQuery, Error>({
    queryKey: ["user-profile", userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
    staleTime: 30_000,
  });
}

function useInvalidateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
}

export function useUserProfileMutations(userId: string) {
  const { t } = useTranslation();
  const invalidate = useInvalidateUserProfile(userId);

  const updateUser = useMutation({
    mutationFn: (user: UpdateUserInput) => submitUpdateUser(user),
    onSuccess: async () => {
      await invalidate();
      toast.success(t("page.profile.toast.userUpdated"));
    },
    onError: () => {
      toast.error(t("page.profile.toast.userUpdateFailed"));
    },
  });

  const updateProfile = useMutation({
    mutationFn: (profile: UpdateProfileInput) => submitUpdateProfile(profile),
    onSuccess: async () => {
      await invalidate();
      toast.success(t("page.profile.toast.profileUpdated"));
    },
    onError: () => {
      toast.error(t("page.profile.toast.profileUpdateFailed"));
    },
  });

  const uploadAvatar = useMutation({
    mutationFn: (avatar: UploadAvatarInput) => submitUploadAvatar(avatar),
    onSuccess: async () => {
      await invalidate();
      toast.success(t("page.profile.toast.avatarUpdated"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });

  const sendVerificationEmail = useMutation({
    mutationFn: (email: string) => sendVerification(email),
    onSuccess: () => {
      toast.message(t("page.profile.toast.verificationSent"));
    },
    onError: () => {
      toast.error(t("page.profile.toast.verificationFailed"));
    },
  });

  return { updateUser, updateProfile, uploadAvatar, sendVerificationEmail };
}
