import { CvPreviewData, CvPreviewProject } from "../types";

export const getCvOwnerName = (cv: CvPreviewData): string => {
  const profile = cv.user?.profile;

  if (profile?.full_name?.trim()) return profile.full_name.trim();

  const parts = [profile?.first_name, profile?.last_name].filter(Boolean);

  return parts?.length ? parts.join(" ") : (cv.user?.email ?? "cv");
};

export const getCvOwnerPosition = (cv: CvPreviewData): string =>
  cv.user?.position?.name ?? cv.user?.position_name ?? "";

export const getUniqueDomains = (projects: CvPreviewProject[]): string[] => {
  const domains = projects.map((project) => project.domain.trim()).filter(Boolean);

  return [...new Set(domains)];
};

export const formatLanguages = (languages: CvPreviewData["languages"]): string =>
  languages.map((language) => `${language.name} — ${language.proficiency}`).join(", ");
