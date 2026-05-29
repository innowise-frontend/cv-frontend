import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Textarea } from "@components/shared";
import { ErrorPage } from "@root/pages/ErrorPage";
import { useUpdateCvMutation } from "@root/pages/UserCvsPage/api";
import { useCvQuery } from "../api";

export const CvDetails = () => {
  const { t } = useTranslation();
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });
  const queryClient = useQueryClient();
  const { data: cv, isLoading, isError } = useCvQuery(cvId);

  const [draft, setDraft] = useState<{
    name?: string;
    education?: string;
    description?: string;
  }>({});

  const initialName = cv?.name ?? "";
  const initialEducation = cv?.education ?? "";
  const initialDescription = cv?.description ?? "";

  const name = draft.name ?? initialName;
  const education = draft.education ?? initialEducation;
  const description = draft.description ?? initialDescription;

  const hasChanges =
    (name || "") !== (initialName || "") ||
    (education || "") !== (initialEducation || "") ||
    (description || "") !== (initialDescription || "");

  const isFormFilled =
    name.trim().length > 0 && education.trim().length > 0 && description.trim().length > 0;

  const canUpdate = hasChanges && isFormFilled;

  const { mutateAsync: updateCvMutation, isPending } = useUpdateCvMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cv", cvId] });
    },
  });

  if (isLoading) return null;
  if (isError || !cv) return <ErrorPage error={t("page.error.defaultErrorMessage")} />;

  async function handleUpdate() {
    if (!canUpdate || !cv) return;

    await updateCvMutation({
      cvId: cv.id,
      name: name.trim(),
      education: education.trim(),
      description: description.trim(),
    });

    setDraft({});
  }

  return (
    <div className="w-full min-h-0 flex-1 overflow-y-auto py-3">
      <div className="mx-auto mt-12 w-full max-w-[860px] px-5">
        <div className="flex flex-col gap-9">
          <Input
            label={t("page.cvs.name")}
            placeholder={t("page.cvs.name")}
            value={name}
            onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label={t("page.cvs.education")}
            placeholder={t("page.cvs.education")}
            value={education}
            onChange={(e) => setDraft((prev) => ({ ...prev, education: e.target.value }))}
          />
          <Textarea
            label={t("page.cvs.description")}
            placeholder={t("page.cvs.description")}
            value={description}
            className="min-h-40"
            onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            type="button"
            variant="filled"
            className="w-40"
            disabled={!canUpdate || isPending}
            onClick={handleUpdate}
          >
            {t("page.cvs.update")}
          </Button>
        </div>
      </div>
    </div>
  );
};
