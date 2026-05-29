import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input, Textarea } from "@components/shared";
import { ErrorPage } from "@root/pages/ErrorPage";
import { useUpdateCvMutation } from "@root/pages/UserCvsPage/api";
import {
  updateCvValidation,
  UpdateCvFormValues,
} from "@root/pages/UserCvsPage/components/UpdateCvModal/validation";
import { useCvQuery } from "../api";

export const CvDetails = () => {
  const { t } = useTranslation();
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });
  const queryClient = useQueryClient();
  const { data: cv, isLoading, isError } = useCvQuery(cvId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting, isDirty },
  } = useForm<UpdateCvFormValues>({
    defaultValues: {
      name: cv?.name ?? "",
      education: cv?.education ?? "",
      description: cv?.description ?? "",
    },
    mode: "onChange",
    resolver: zodResolver(updateCvValidation(t)),
  });

  useEffect(() => {
    if (!cv) return;
    reset({
      name: cv.name ?? "",
      education: cv.education ?? "",
      description: cv.description ?? "",
    });
  }, [cv, reset]);

  const { mutateAsync: updateCvMutation } = useUpdateCvMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
    },
  });

  if (isLoading) return null;
  if (isError || !cv) return <ErrorPage error={t("page.error.defaultErrorMessage")} />;

  const onSubmit = async (data: UpdateCvFormValues) => {
    await updateCvMutation({
      cvId: cv.id,
      name: data.name,
      education: data.education,
      description: data.description,
    });
  };

  return (
    <div className="w-full min-h-0 flex-1 overflow-y-auto py-3">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-12 w-full max-w-[860px] px-5">
        <div className="flex flex-col gap-9">
          <Input
            placeholder={t("page.cvs.name")}
            label={t("page.cvs.name")}
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            placeholder={t("page.cvs.education")}
            label={t("page.cvs.education")}
            {...register("education")}
            error={errors.education?.message}
          />
          <Textarea
            placeholder={t("page.cvs.description")}
            label={t("page.cvs.description")}
            className="min-h-40"
            {...register("description")}
            error={errors.description?.message}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            type="submit"
            variant="filled"
            className="w-40"
            disabled={!isValid || !isDirty || isSubmitting}
          >
            {t("page.cvs.update")}
          </Button>
        </div>
      </form>
    </div>
  );
};
