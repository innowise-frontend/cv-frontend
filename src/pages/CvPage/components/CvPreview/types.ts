import { CvQueryResult } from "@pages/CvPage/types";

export type CvPreviewData = CvQueryResult;

export type CvPreviewProject = NonNullable<CvPreviewData["projects"]>[number];

export type CvPreviewSkillRow = {
  name: string;
  years: number | null;
  lastUsed: number | null;
};

export type CvPreviewSkillGroup = {
  categoryId: string | null;
  categoryName: string;
  skills: CvPreviewSkillRow[];
  totalYears: number | null;
  lastUsed: number | null;
};
