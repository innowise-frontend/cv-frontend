import { z } from "zod";
import { isDateInRange, parseProjectDate } from "@components/shared";
import type { TFunction } from "i18next";

export const projectFormValidation = (t: TFunction) =>
  z
    .object({
      name: z
        .string()
        .min(1, { message: t("page.projects.validation.nameRequired") })
        .transform((value) => value.trim()),
      domain: z
        .string()
        .min(1, { message: t("page.projects.validation.domainRequired") })
        .transform((value) => value.trim()),
      description: z
        .string()
        .min(1, { message: t("page.projects.validation.descriptionRequired") })
        .transform((value) => value.trim()),
      startDate: z.string().min(1, { message: t("page.projects.validation.startDateRequired") }),
      endDate: z.string(),
      environment: z
        .array(z.string())
        .min(1, { message: t("page.projects.validation.environmentRequired") }),
      roles: z.array(z.string()),
    })
    .superRefine((data, ctx) => {
      const endDateLimit = data.endDate.trim() ? parseProjectDate(data.endDate) : undefined;
      const startDate = parseProjectDate(data.startDate);

      if (!startDate || !isDateInRange(startDate, undefined, endDateLimit)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["startDate"],
          message: t("page.projects.validation.startDateInvalid"),
        });
      }

      if (!data.endDate.trim()) return;

      const startDateLimit = parseProjectDate(data.startDate);
      const endDate = parseProjectDate(data.endDate);

      if (!endDate || !isDateInRange(endDate, startDateLimit, undefined)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: t("page.projects.validation.endDateInvalid"),
        });
      }
    });

export type ProjectFormSchemaValues = z.infer<ReturnType<typeof projectFormValidation>>;
