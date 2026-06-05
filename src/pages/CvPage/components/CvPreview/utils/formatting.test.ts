import { describe, expect, it } from "vitest";
import { formatCvPreviewPeriod } from "./formatting";

describe("formatCvPreviewPeriod", () => {
  it("shows till now when end date is missing", () => {
    expect(formatCvPreviewPeriod("2020-01-15", null, "Till now")).toBe("01.2020 – Till now");
    expect(formatCvPreviewPeriod("2020-01-15", "", "Till now")).toBe("01.2020 – Till now");
    expect(formatCvPreviewPeriod("2020-01-15", "   ", "Till now")).toBe("01.2020 – Till now");
  });

  it("shows formatted end date when it is provided", () => {
    expect(formatCvPreviewPeriod("2020-01-15", "2023-06-01", "Till now")).toBe("01.2020 – 06.2023");
  });
});
