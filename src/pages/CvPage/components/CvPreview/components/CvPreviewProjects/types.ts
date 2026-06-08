import { CvPreviewProject } from "../../types";

export type CvPreviewProjectsProps = {
  projects: CvPreviewProject[];
  roleNameById?: Record<string, string>;
  tillNowLabel: string;
  emptyMessage: string;
  labels: {
    title: string;
    roles: string;
    period: string;
    responsibilities: string;
    environment: string;
  };
};
