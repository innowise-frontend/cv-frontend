import { z } from "zod";
import { formatProjectDateDisplay, isDateInRange, parseProjectDate } from "@components/shared";
import type { CvProjectDateBounds } from "../types";

const toProjectBoundDate = (value?: string | null) =>
  value ? parseProjectDate(formatProjectDateDisplay(value)) : undefined;

const refineCvProjectDateRange = (
  data: { startDate: string; endDate: string },
  ctx: z.RefinementCtx,
  bounds?: CvProjectDateBounds,
) => {
  const formEndLimit = data.endDate.trim() ? parseProjectDate(data.endDate) : undefined;
  const startDate = parseProjectDate(data.startDate);
  const projectMin = toProjectBoundDate(bounds?.startDate);
  const projectMax = toProjectBoundDate(bounds?.endDate);

  if (!startDate || !isDateInRange(startDate, undefined, formEndLimit)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["startDate"],
      message: "",
    });
  } else if (projectMin && !isDateInRange(startDate, projectMin, projectMax)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["startDate"],
      message: "",
    });
  }

  if (!data.endDate.trim()) return;

  const formStartLimit = parseProjectDate(data.startDate);
  const endDate = parseProjectDate(data.endDate);

  if (!endDate || !isDateInRange(endDate, formStartLimit, undefined)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "",
    });
  } else if (projectMin && !isDateInRange(endDate, projectMin, projectMax)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "",
    });
  }
};

const cvProjectFormBase = () => ({
  name: z.string().min(1, { message: "" }),
  domain: z.string(),
  description: z.string(),
  startDate: z.string().min(1, { message: "" }),
  endDate: z.string(),
  environment: z.array(z.string()),
  roles: z.array(z.string()),
  responsibilities: z.string().min(1, { message: "" }),
});

export const cvAddProjectFormValidation = (bounds?: CvProjectDateBounds) =>
  z
    .object(cvProjectFormBase())
    .superRefine((data, ctx) => refineCvProjectDateRange(data, ctx, bounds));

export const cvUpdateProjectFormValidation = (bounds?: CvProjectDateBounds) =>
  z
    .object({
      ...cvProjectFormBase(),
      name: z.string(),
    })
    .superRefine((data, ctx) => refineCvProjectDateRange(data, ctx, bounds));
