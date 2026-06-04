import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { SortOrder } from "@constants/sortOptions";
import { getErrorToastMessage } from "@root/lib";
import {
  AddProfileSkillInput,
  CreateSkillInput,
  DeleteProfileSkillInput,
  DeleteSkillInput,
  Mastery,
  UpdateProfileSkillInput,
  UpdateSkillInput,
} from "@services/graphql/__generated__/graphql";
import {
  addProfileSkill,
  createSkill,
  deleteProfileSkills,
  deleteSkill,
  getSkillCategories,
  getSkills,
  updateProfileSkill,
  updateSkill,
} from "@services/skills";
import { getUserProfile } from "@services/users";

type UserSkillsQueryConfig = Omit<
  UseQueryOptions<Awaited<ReturnType<typeof getUserProfile>>>,
  "queryKey" | "queryFn"
>;

export const useUserSkillsQuery = (userId: string, config?: UserSkillsQueryConfig) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
    ...config,
  });

export const useSkillsSelectQuery = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills({ page: 1, limit: 100 }),
  });

export const useSkillCategoriesQuery = () =>
  useQuery({
    queryKey: ["skillCategories"],
    queryFn: () => getSkillCategories(),
  });

export const useSkillsTableQuery = ({
  search,
  page,
  limit,
  sortOrder,
}: {
  search: string;
  page: number;
  limit: number;
  sortOrder: SortOrder;
}) =>
  useQuery({
    queryKey: ["skills", search, page, limit, sortOrder],
    queryFn: () =>
      getSkills({
        search,
        page,
        limit,
        sort_order: sortOrder,
        sort_by: "name",
      }),
  });

export const useAddProfileSkillMutation = (
  userId: string,
  { onSuccess }: { onSuccess?: () => void },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddProfileSkillInput) => addProfileSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      onSuccess?.();
      toast.success(t("page.skills.toast.added"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateProfileSkillMutation = (
  userId: string,
  { onSuccess }: { onSuccess?: () => void },
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileSkillInput) => updateProfileSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      onSuccess?.();
      toast.success(t("page.skills.toast.updated"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteProfileSkillsMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteProfileSkillInput) => deleteProfileSkills(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      toast.success(t("page.skills.toast.removed"));
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useCreateSkillMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSkillInput) => createSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skills"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useUpdateSkillMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSkillInput) => updateSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skills"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const useDeleteSkillMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteSkillInput) => deleteSkill(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["skills"] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorToastMessage(error));
    },
  });
};

export const getMasteryOptions = (values: readonly Mastery[]) =>
  values.map((mastery) => ({
    label: mastery,
    value: mastery,
  }));
