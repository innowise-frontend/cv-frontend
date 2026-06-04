import { isAfter, isBefore } from "date-fns";
import { formatProjectDateDisplay, parseProjectDate } from "@components/shared";
import type { CvProjectDateBounds } from "./cvProjectFormValidation";

const pickLaterDate = (left?: Date, right?: Date) => {
  if (!left) return right;
  if (!right) return left;

  return isAfter(left, right) ? left : right;
};

const pickEarlierDate = (left?: Date, right?: Date) => {
  if (!left) return right;
  if (!right) return left;

  return isBefore(left, right) ? left : right;
};

export const getCvProjectDatePickerLimits = (
  bounds: CvProjectDateBounds | undefined,
  formStartDate?: string,
  formEndDate?: string,
) => {
  const projectMin = bounds?.startDate
    ? parseProjectDate(formatProjectDateDisplay(bounds.startDate))
    : undefined;
  const projectMax = bounds?.endDate
    ? parseProjectDate(formatProjectDateDisplay(bounds.endDate))
    : undefined;
  const formStart = parseProjectDate(formStartDate);
  const formEnd = parseProjectDate(formEndDate);

  return {
    startDateMin: projectMin,
    startDateMax: pickEarlierDate(formEnd, projectMax),
    endDateMin: pickLaterDate(formStart, projectMin),
    endDateMax: projectMax,
  };
};
