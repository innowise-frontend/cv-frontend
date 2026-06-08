import { useParams } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "@components/shared";
import { useCvQuery, useExportCvPdfMutation } from "@pages/CvPage/api";
import { useCvProjectRoleOptionsQuery } from "@pages/CvPage/components/CvProjects/api";
import { useSkillCategoriesQuery } from "@pages/SkillsPage/api";
import { ErrorPage } from "@root/pages/ErrorPage";
import {
  CvPreviewHeader,
  CvPreviewProjects,
  CvPreviewSummary,
  CvPreviewSkillsTable,
} from "./components";
import {
  buildCvPreviewSkillGroups,
  buildCvPreviewExportHtml,
  downloadBase64Pdf,
  getCvOwnerName,
  sanitizePdfFilename,
  CV_PREVIEW_DOCUMENT_ID,
} from "./utils/index";

export const CvPreview = () => {
  const { t } = useTranslation();
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });
  const { data: cv, isLoading, isError } = useCvQuery(cvId);
  const { data: categories } = useSkillCategoriesQuery();
  const { data: roleOptions = [] } = useCvProjectRoleOptionsQuery();
  const documentRef = useRef<HTMLElement>(null);
  const { mutate: exportCvPdf, isPending: isExporting } = useExportCvPdfMutation();

  const roleNameById = useMemo(
    () => Object.fromEntries(roleOptions.map((role) => [role.value, role.label])),
    [roleOptions],
  );

  const skillGroups = useMemo(() => {
    if (!cv) return [];

    return buildCvPreviewSkillGroups(cv, categories, t("page.skills.uncategorized"));
  }, [categories, cv, t]);

  const projects = useMemo(() => cv?.projects ?? [], [cv?.projects]);

  const handleExportPdf = () => {
    const documentNode = documentRef.current;

    if (!documentNode || !cv) return;

    exportCvPdf(
      {
        html: buildCvPreviewExportHtml(documentNode.outerHTML),
      },
      {
        onSuccess: (base64) => {
          downloadBase64Pdf(base64, `${sanitizePdfFilename(getCvOwnerName(cv))}.pdf`);
        },
      },
    );
  };

  if (isLoading) return <Spinner />;

  if (isError || !cv) {
    return <ErrorPage error={t("page.error.defaultErrorMessage")} />;
  }

  return (
    <div className="w-full min-h-0 flex-1 overflow-y-auto py-3">
      <div className="mx-auto w-full max-w-[852px] px-5 pb-10 pt-8">
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            disabled={isExporting}
            onClick={handleExportPdf}
            className="absolute right-10 top-8 z-10 shrink-0 border-red px-9 font-medium uppercase text-red dark:border-red dark:text-red dark:hover:bg-transparent"
          >
            {t("page.cvs.preview.exportPdf")}
          </Button>

          <article
            ref={documentRef}
            id={CV_PREVIEW_DOCUMENT_ID}
            className="px-10 py-8 text-left text-gray-2 dark:text-gray-8 "
          >
            <CvPreviewHeader cv={cv} />

            <CvPreviewSummary
              cv={cv}
              skillGroups={skillGroups}
              labels={{
                education: t("page.cvs.preview.education"),
                languageProficiency: t("page.cvs.preview.languageProficiency"),
                domains: t("page.cvs.preview.domains"),
              }}
            />

            <CvPreviewProjects
              projects={projects}
              roleNameById={roleNameById}
              tillNowLabel={t("page.cvs.preview.tillNow")}
              emptyMessage={t("page.cvs.preview.noProjects")}
              labels={{
                title: t("page.cvs.preview.projects"),
                roles: t("page.cvs.preview.roles"),
                period: t("page.cvs.preview.period"),
                responsibilities: t("page.cvs.preview.responsibilities"),
                environment: t("page.cvs.preview.environment"),
              }}
            />

            <CvPreviewSkillsTable
              groups={skillGroups}
              emptyMessage={t("page.cvs.preview.noSkills")}
              labels={{
                title: t("page.cvs.preview.professionalSkills"),
                skills: t("page.cvs.preview.skillsColumn"),
                experience: t("page.cvs.preview.experienceColumn"),
                lastUsed: t("page.cvs.preview.lastUsedColumn"),
              }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};
