import { describe, expect, it } from "vitest";
import { getPaginationPages } from "./getPaginationPages";

describe("getPaginationPages", () => {
  it("should return all pages when pagesCount is 7 or less", () => {
    expect(getPaginationPages(5, 3)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationPages(7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should include ellipsis when there is a large gap", () => {
    expect(getPaginationPages(10, 5)).toEqual([1, 2, 3, 4, 5, 6, "ellipsis", 9, 10]);
  });

  it("should fill a single-page gap without ellipsis", () => {
    expect(getPaginationPages(10, 7)).toEqual([1, 2, "ellipsis", 6, 7, 8, 9, 10]);
  });

  it("should handle pages near the start boundary", () => {
    expect(getPaginationPages(10, 1)).toEqual([1, 2, "ellipsis", 9, 10]);
  });

  it("should handle pages near the end boundary", () => {
    expect(getPaginationPages(10, 10)).toEqual([1, 2, "ellipsis", 9, 10]);
  });
});
