import { useQuery } from "@tanstack/react-query";
import { getCv } from "@services/cvs";
import { CvQueryConfig } from "./types";

export const useCvQuery = (cvId: string, config?: CvQueryConfig) => {
  return useQuery({
    queryKey: ["cv", cvId],
    queryFn: () => getCv(cvId),
    enabled: Boolean(cvId),
    ...config,
  });
};
