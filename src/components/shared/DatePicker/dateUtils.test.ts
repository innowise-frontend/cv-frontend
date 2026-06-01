import { describe, expect, it } from "vitest";
import {
  API_DATE_FORMAT,
  createDateDisabledMatcher,
  formatProjectDate,
  formatProjectDateDisplay,
  isDateInRange,
  parseProjectDate,
  toApiProjectDate,
  toFormProjectDate,
} from "./dateUtils";

describe("parseProjectDate", () => {
  it("parses display format dd/MM/yyyy", () => {
    const date = parseProjectDate("15/06/2025");

    expect(date?.getFullYear()).toBe(2025);
    expect(date?.getMonth()).toBe(5);
    expect(date?.getDate()).toBe(15);
  });

  it("parses API format yyyy-MM-dd", () => {
    const date = parseProjectDate("2025-06-15");

    expect(date?.getFullYear()).toBe(2025);
    expect(date?.getMonth()).toBe(5);
    expect(date?.getDate()).toBe(15);
  });

  it("returns undefined for empty or invalid values", () => {
    expect(parseProjectDate("")).toBeUndefined();
    expect(parseProjectDate("   ")).toBeUndefined();
    expect(parseProjectDate("not-a-date")).toBeUndefined();
  });
});

describe("formatProjectDate", () => {
  it("formats date as dd/MM/yyyy", () => {
    expect(formatProjectDate(new Date(2025, 5, 15))).toBe("15/06/2025");
  });
});

describe("formatProjectDateDisplay", () => {
  it("formats API date for display", () => {
    expect(formatProjectDateDisplay("2025-06-15")).toBe("15/06/2025");
  });

  it("returns empty string when value cannot be parsed", () => {
    expect(formatProjectDateDisplay("invalid")).toBe("");
  });
});

describe("toApiProjectDate", () => {
  it("converts display date to ISO date string", () => {
    expect(toApiProjectDate("15/06/2025")).toBe("2025-06-15");
  });

  it("keeps API format unchanged", () => {
    expect(toApiProjectDate("2025-06-15")).toBe("2025-06-15");
  });

  it("returns undefined for invalid input", () => {
    expect(toApiProjectDate("")).toBeUndefined();
  });

  it("uses yyyy-MM-dd API format constant", () => {
    expect(API_DATE_FORMAT).toBe("yyyy-MM-dd");
  });
});

describe("toFormProjectDate", () => {
  it("returns empty string for empty input", () => {
    expect(toFormProjectDate("")).toBe("");
  });

  it("returns display format for API input", () => {
    expect(toFormProjectDate("2025-06-15")).toBe("15/06/2025");
  });
});

describe("isDateInRange", () => {
  const min = new Date(2025, 0, 10);
  const max = new Date(2025, 0, 20);

  it("returns true when date is within range", () => {
    expect(isDateInRange(new Date(2025, 0, 15), min, max)).toBe(true);
  });

  it("returns false when date is before min", () => {
    expect(isDateInRange(new Date(2025, 0, 5), min, max)).toBe(false);
  });

  it("returns false when date is after max", () => {
    expect(isDateInRange(new Date(2025, 0, 25), min, max)).toBe(false);
  });
});

describe("createDateDisabledMatcher", () => {
  it("disables dates outside range", () => {
    const isDisabled = createDateDisabledMatcher(new Date(2025, 0, 10), new Date(2025, 0, 20));

    expect(isDisabled(new Date(2025, 0, 5))).toBe(true);
    expect(isDisabled(new Date(2025, 0, 15))).toBe(false);
    expect(isDisabled(new Date(2025, 0, 25))).toBe(true);
  });
});
