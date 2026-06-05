import { CvPreviewProject } from "../../types";

export type CvPreviewProjectsProps = {
  projects: CvPreviewProject[];
  tillNowLabel: string;
  emptyMessage: string;
  labels: {
    title: string;
    projectRoles: string;
    period: string;
    responsibilities: string;
    environment: string;
  };
};
