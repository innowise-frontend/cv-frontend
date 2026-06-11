import { beforeEach, describe, expect, it, vi } from "vitest";
import { LOCAL_STORAGE_KEYS } from "@constants/localStorage";
import { applyTheme, getDefaultTheme, setDefaultTheme, watchSystemTheme } from "./theme";

type MatchMediaListener = () => void;

describe("theme utils", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("returns device as default when theme is not in storage", () => {
    expect(getDefaultTheme()).toBe("device");
  });

  it("returns theme from storage", () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, "dark");

    expect(getDefaultTheme()).toBe("dark");
  });

  it("applies dark class for dark theme", () => {
    applyTheme("dark");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class for light theme", () => {
    document.documentElement.classList.add("dark");

    applyTheme("light");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("resolves device theme using system preference", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
      }),
    );

    applyTheme("device");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("sets theme in storage and applies dark class for dark value", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
      }),
    );

    setDefaultTheme("dark");

    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("reacts to system theme changes only when saved theme is device", () => {
    let listener: MatchMediaListener | undefined;
    const addEventListenerMock = vi.fn((event: string, cb: MatchMediaListener) => {
      if (event === "change") listener = cb;
    });

    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: addEventListenerMock,
      }),
    );

    const onChange = vi.fn();
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, "device");
    watchSystemTheme(onChange);

    listener?.();
    expect(onChange).toHaveBeenCalledTimes(1);

    onChange.mockClear();
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, "light");
    listener?.();
    expect(onChange).not.toHaveBeenCalled();
  });
});
