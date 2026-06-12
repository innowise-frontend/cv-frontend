import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { SortOrder } from "@constants/sortOptions";
import { getErrorToastMessage } from "@root/lib";
import { buildSortParams } from "@root/lib/sorting/toggleTableSort";
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

type UserLanguagesQueryConfig = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof getUserProfile>>>,
  "queryKey" | "queryFn"
>;

type LanguagesQueryConfig = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof getLanguages>>>,
  "queryKey" | "queryFn"
>;

export const useUserLanguagesQuery = (userId: string, config?: UserLanguagesQueryConfig) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
    ...config,
  });

export const useLanguagesQuery = (config?: LanguagesQueryConfig) =>
  useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages({ page: 1, limit: 100 }),
    ...config,
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
  sortOrder?: SortOrder;
}) =>
  useQuery({
    queryKey: ["languages", search, page, limit, sortOrder],
    queryFn: () =>
      getLanguages({
        search,
        page,
        limit,
        ...buildSortParams(sortOrder, "name"),
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
      toast.success(t("page.languages.toast.added"));
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
      toast.success(t("page.languages.toast.removed"));
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
      toast.success(t("page.languages.toast.updated"));
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
