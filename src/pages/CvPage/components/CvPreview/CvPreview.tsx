import { useParams } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "@components/shared";
import { useCvQuery, useExportCvPdfMutation } from "@pages/CvPage/api";
import { useSkillCategoriesQuery } from "@pages/SkillsPage/api";
import { ErrorPage } from "@root/pages/ErrorPage";
import { buildCvPreviewExportHtml } from "./buildCvPreviewExportHtml";
import {
  CvPreviewHeader,
  CvPreviewProjects,
  CvPreviewSummary,
  CvPreviewSkillsTable,
} from "./components";
import { CV_PREVIEW_DOCUMENT_ID } from "./constants";
import { downloadBase64Pdf } from "./downloadBase64Pdf";
import { buildCvPreviewSkillGroups, getCvOwnerName } from "./utils";

const PDF_MARGIN = {
  top: "20px",
  right: "0",
  bottom: "20px",
  left: "0",
};

const sanitizePdfFilename = (name: string) =>
  name
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_") || "cv";

export const CvPreview = () => {
  const { t } = useTranslation();
  const { cvId } = useParams({ from: "/_app/cvs/$cvId" });
  const { data: cv, isLoading, isError } = useCvQuery(cvId);
  const { data: categories } = useSkillCategoriesQuery();
  const documentRef = useRef<HTMLElement>(null);
  const { mutate: exportCvPdf, isPending: isExporting } = useExportCvPdfMutation();

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
        margin: PDF_MARGIN,
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

  const previewLabels = {
    exportPdf: t("page.cvs.preview.exportPdf"),
    education: t("page.cvs.preview.education"),
    languageProficiency: t("page.cvs.preview.languageProficiency"),
    domains: t("page.cvs.preview.domains"),
    projectsTitle: t("page.cvs.preview.projects"),
    projectRoles: t("page.cvs.preview.projectRoles"),
    period: t("page.cvs.preview.period"),
    responsibilities: t("page.cvs.preview.responsibilities"),
    environment: t("page.cvs.preview.environment"),
    professionalSkills: t("page.cvs.preview.professionalSkills"),
    skillsColumn: t("page.cvs.preview.skillsColumn"),
    experienceColumn: t("page.cvs.preview.experienceColumn"),
    lastUsedColumn: t("page.cvs.preview.lastUsedColumn"),
    noProjects: t("page.cvs.preview.noProjects"),
    noSkills: t("page.cvs.preview.noSkills"),
  };

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
            {previewLabels.exportPdf}
          </Button>

          <article
            ref={documentRef}
            id={CV_PREVIEW_DOCUMENT_ID}
            className="bg-white px-10 py-8 text-left text-gray-2 shadow-sm"
          >
            <CvPreviewHeader cv={cv} />

            <CvPreviewSummary
              cv={cv}
              skillGroups={skillGroups}
              labels={{
                education: previewLabels.education,
                languageProficiency: previewLabels.languageProficiency,
                domains: previewLabels.domains,
              }}
            />

            <CvPreviewProjects
              projects={projects}
              tillNowLabel={t("page.projects.tillNow")}
              emptyMessage={previewLabels.noProjects}
              labels={{
                title: previewLabels.projectsTitle,
                projectRoles: previewLabels.projectRoles,
                period: previewLabels.period,
                responsibilities: previewLabels.responsibilities,
                environment: previewLabels.environment,
              }}
            />

            <CvPreviewSkillsTable
              groups={skillGroups}
              emptyMessage={previewLabels.noSkills}
              labels={{
                title: previewLabels.professionalSkills,
                skills: previewLabels.skillsColumn,
                experience: previewLabels.experienceColumn,
                lastUsed: previewLabels.lastUsedColumn,
              }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};
