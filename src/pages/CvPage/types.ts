import { UseQueryOptions } from "@tanstack/react-query";
import type { CvQuery } from "@services/graphql/__generated__/graphql";

export type CvQueryData = NonNullable<CvQuery["cv"]>;

export type CvQueryConfig = Omit<UseQueryOptions<CvQueryData>, "queryKey" | "queryFn">;

export type CvPageProps = {
  children: React.ReactNode;
};
