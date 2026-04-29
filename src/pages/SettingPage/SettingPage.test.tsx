import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SettingPage } from "./SettingPage";

const changeLanguageMock = vi.fn<(language: string) => Promise<void>>();
const getDefaultThemeMock = vi.fn(() => "light");
const setDefaultThemeMock = vi.fn();

vi.mock("@root/lib/theme/theme", () => ({
  getDefaultTheme: () => getDefaultThemeMock(),
  setDefaultTheme: (theme: string) => setDefaultThemeMock(theme),
}));

vi.mock("@components/ChangePassword", () => ({
  ChangePassword: ({ className }: { className?: string }) => (
    <div data-testid="change-password" className={className}>
      ChangePassword
    </div>
  ),
}));

vi.mock("@components/shared/Select/Select", () => ({
  Select: ({
    label,
    value,
    multiple,
    onValueChange,
  }: {
    label: string;
    value: string | string[];
    multiple?: boolean;
    onValueChange: (value: string | string[]) => void;
  }) => (
    <div>
      <span>{label}</span>
      <span data-testid={`${label}-value`}>{Array.isArray(value) ? value.join(",") : value}</span>
      <button
        type="button"
        onClick={() => {
          if (label === "page.setting.theme") onValueChange("dark");
          if (label === "page.setting.language") onValueChange("uk");
          if (multiple) onValueChange(["react", "ts"]);
        }}
      >
        change-{label}
      </button>
    </div>
  ),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      resolvedLanguage: "en",
      changeLanguage: changeLanguageMock,
    },
  }),
}));

describe("SettingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    changeLanguageMock.mockResolvedValue(undefined);
  });

  it("renders selects and change password block", () => {
    render(<SettingPage />);

    expect(screen.getByText("page.setting.theme")).toBeInTheDocument();
    expect(screen.getByText("page.setting.language")).toBeInTheDocument();
    expect(screen.getByTestId("change-password")).toBeInTheDocument();
  });

  it("changes theme and applies selected theme", () => {
    render(<SettingPage />);

    fireEvent.click(screen.getByRole("button", { name: "change-page.setting.theme" }));

    expect(setDefaultThemeMock).toHaveBeenCalledWith("dark");
  });

  it("changes language using i18n", () => {
    render(<SettingPage />);

    fireEvent.click(screen.getByRole("button", { name: "change-page.setting.language" }));

    expect(changeLanguageMock).toHaveBeenCalledWith("uk");
  });
});
