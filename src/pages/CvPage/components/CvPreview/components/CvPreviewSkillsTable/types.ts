import { CvPreviewSkillGroup } from "../../types";

export type CvPreviewSkillsTableProps = {
  groups: CvPreviewSkillGroup[];
  emptyMessage: string;
  labels: {
    title: string;
    skills: string;
    experience: string;
    lastUsed: string;
  };
};
