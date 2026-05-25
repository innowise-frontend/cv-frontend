import { z } from "zod";
import type { TFunction } from "i18next";

export const createCvValidation = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t("page.cvs.validation.nameRequired") })
      .transform((value) => value.trim()),
    education: z
      .string()
      .min(1, { message: t("page.cvs.validation.educationRequired") })
      .transform((value) => value.trim()),
    description: z
      .string()
      .min(1, { message: t("page.cvs.validation.descriptionRequired") })
      .transform((value) => value.trim()),
  });

export type CreateCvFormValues = z.infer<ReturnType<typeof createCvValidation>>;
