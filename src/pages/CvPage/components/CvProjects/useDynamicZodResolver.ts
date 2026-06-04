import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";
import type { ProjectFormValues } from "@pages/ProjectsPage/components/types";
import type { Resolver } from "react-hook-form";
import type { z } from "zod";

export const useDynamicZodResolver = (initialSchema: z.ZodType<ProjectFormValues>) => {
  const schemaRef = useRef(initialSchema);

  const resolver = useCallback<Resolver<ProjectFormValues>>(
    (values, context, options) =>
      (zodResolver as (schema: z.ZodType<ProjectFormValues>) => Resolver<ProjectFormValues>)(
        schemaRef.current,
      )(values, context, options),
    [],
  );

  const setSchema = (schema: z.ZodType<ProjectFormValues>) => {
    schemaRef.current = schema;
  };

  return { resolver, setSchema };
};
