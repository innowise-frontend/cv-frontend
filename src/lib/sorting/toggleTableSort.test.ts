import { describe, expect, it } from "vitest";
import { SortOrder } from "@root/constants";
import { toggleMultiColumnSort, toggleSingleColumnSort } from "./toggleTableSort";

describe("toggleSingleColumnSort", () => {
  it("cycles through ASC, DESC, and disabled", () => {
    expect(toggleSingleColumnSort(undefined)).toBe(SortOrder.ASC);
    expect(toggleSingleColumnSort(SortOrder.ASC)).toBe(SortOrder.DESC);
    expect(toggleSingleColumnSort(SortOrder.DESC)).toBeUndefined();
    expect(toggleSingleColumnSort(undefined)).toBe(SortOrder.ASC);
  });
});

describe("toggleMultiColumnSort", () => {
  it("starts sorting a new column in ASC order", () => {
    expect(toggleMultiColumnSort("name", undefined, undefined)).toEqual({
      sortBy: "name",
      sortOrder: SortOrder.ASC,
    });
  });

  it("cycles the active column through ASC, DESC, and disabled", () => {
    expect(toggleMultiColumnSort("name", "name", SortOrder.ASC)).toEqual({
      sortBy: "name",
      sortOrder: SortOrder.DESC,
    });

    expect(toggleMultiColumnSort("name", "name", SortOrder.DESC)).toEqual({
      sortBy: undefined,
      sortOrder: undefined,
    });
  });

  it("resets to ASC when switching to another column", () => {
    expect(toggleMultiColumnSort("domain", "name", SortOrder.DESC)).toEqual({
      sortBy: "domain",
      sortOrder: SortOrder.ASC,
    });
  });
});
