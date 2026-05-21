import { describe, expect, it, vi } from "vitest";
import { getTabs } from "./getTabs";
import type { TFunction } from "i18next";

const t = ((key: string) => `translated:${key}`) as TFunction;

describe("getTabs", () => {
  it("maps labelKey through t() and preserves value", () => {
    const result = getTabs(
      [
        { value: "profile", labelKey: "page.profile.tabs.profile" },
        { value: "skills", labelKey: "page.profile.tabs.skills" },
      ],
      t,
    );

    expect(result).toEqual([
      { value: "profile", label: "translated:page.profile.tabs.profile" },
      { value: "skills", label: "translated:page.profile.tabs.skills" },
    ]);
  });

  it("returns an empty array for empty input", () => {
    expect(getTabs([], t)).toEqual([]);
  });

  it("calls t() once per item", () => {
    const tMock = vi.fn((key: string) => key) as unknown as TFunction;
    getTabs(
      [
        { value: "a", labelKey: "key.a" },
        { value: "b", labelKey: "key.b" },
      ],
      tMock,
    );

    expect(tMock).toHaveBeenCalledTimes(2);
    expect(tMock).toHaveBeenCalledWith("key.a");
    expect(tMock).toHaveBeenCalledWith("key.b");
  });
});
