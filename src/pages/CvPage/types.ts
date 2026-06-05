import { UseQueryOptions } from "@tanstack/react-query";
import { getCv } from "@services/cvs";

export type CvQueryResult = Awaited<ReturnType<typeof getCv>>;

export type CvQueryConfig = Omit<UseQueryOptions<CvQueryResult>, "queryKey" | "queryFn">;

export type CvPageProps = {
  children: React.ReactNode;
};
