import { CvPreviewData, CvPreviewSkillGroup } from "../../types";

export type CvPreviewSummaryProps = {
  cv: CvPreviewData;
  skillGroups: CvPreviewSkillGroup[];
  labels: {
    education: string;
    languageProficiency: string;
    domains: string;
  };
};
