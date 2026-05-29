import { UseQueryOptions } from "@tanstack/react-query";
import { Cv } from "@services/graphql/__generated__/graphql";

export type CvQueryConfig = Omit<UseQueryOptions<Cv>, "queryKey" | "queryFn">;

export type CvPageProps = {
  children: React.ReactNode;
};
