import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorToastMessage } from "@root/lib";
import {
  AddProfileLanguageInput,
  DeleteLanguageInput,
  DeleteProfileLanguageInput,
  Proficiency,
  UpdateLanguageInput,
  UpdateProfileLanguageInput,
} from "@services/graphql/__generated__/graphql";
import {
  addProfileLanguage,
  createLanguage,
  deleteLanguage,
  deleteProfileLanguages,
  getLanguages,
  updateLanguage,
  updateProfileLanguage,
} from "@services/languages";
import { getUserProfile } from "@services/users";

export const useUserLanguagesQuery = (userId: string, isAdmin: boolean) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !isAdmin,
  });

export const useLanguagesSelectQuery = () =>
  useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages({ page: 1, limit: 100 }),
  });

export const useLanguagesTableQuery = ({
  search,
  page,
  limit,
  sortOrder,
}: {
  search: string;
  page: number;
  limit: number;
  sortOrder: "ASC" | "DESC";
}) =>
  useQuery({
    queryKey: ["languages", search, page, limit, sortOrder],
    queryFn: () =>
      getLanguages({
        search,
        page,
        limit,
        sort_order: sortOrder,
        sort_by: "name",
      }),
  });

export const useAddProfileLanguageMutation = (
  userId: string,
  { onSuccess }: { onSuccess?: () => void },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddProfileLanguageInput) => addProfileLanguage(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useCreateLanguageMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; iso2: string; native_name: string }) =>
      createLanguage(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["languages"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteLanguageMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteLanguageInput) => deleteLanguage(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["languages"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateLanguageMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateLanguageInput) => updateLanguage(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["languages"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteProfileLanguagesMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteProfileLanguageInput) => deleteProfileLanguages(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateProfileLanguageMutation = (
  userId: string,
  { onSuccess }: { onSuccess?: () => void },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileLanguageInput) => updateProfileLanguage(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const getProficiencyOptions = (values: readonly Proficiency[]) =>
  values.map((proficiency) => ({
    label: proficiency,
    value: proficiency,
  }));
