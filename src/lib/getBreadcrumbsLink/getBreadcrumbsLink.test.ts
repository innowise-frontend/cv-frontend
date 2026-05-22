import { describe, expect, it, vi } from "vitest";
import { ROUTES } from "@root/constants";
import { getBreadcrumbsLink } from "./getBreadcrumbsLink";

describe("getBreadcrumbsLink", () => {
  it("returns translated label for known route segment", () => {
    const t = vi.fn((key: string) => `translated:${key}`);

    const result = getBreadcrumbsLink(ROUTES.LANGUAGES, t);

    expect(t).toHaveBeenCalledWith("page.sidebar.languages");
    expect(result).toEqual({
      label: "translated:page.sidebar.languages",
      href: ROUTES.LANGUAGES,
    });
  });

  it("falls back to capitalized route segment for unknown route", () => {
    const t = vi.fn((key: string) => key);

    const result = getBreadcrumbsLink("/custom-page", t);

    expect(result).toEqual({
      label: "Custom-page",
      href: "/custom-page",
    });
  });
});
