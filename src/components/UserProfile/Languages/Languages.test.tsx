import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Proficiency } from "@services/graphql/__generated__/graphql";
import { Languages } from "./Languages";

const useParamsMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());
const useUserLanguagesQueryMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@root/pages/LanguagesPage/api", () => ({
  useUserLanguagesQuery: (userId: string, config?: unknown) =>
    useUserLanguagesQueryMock(userId, config),
}));

vi.mock("@root/pages/LanguagesPage/components", () => ({
  LanguagesEditor: () => <div>editor</div>,
}));

vi.mock("@components/shared", () => ({
  ProgressBar: ({ label }: { label: string }) => <div>{label}</div>,
}));

describe("UserProfile Languages", () => {
  it("renders editor when admin views any profile", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });
    useUserLanguagesQueryMock.mockReturnValue({ data: undefined });

    render(<Languages />);

    expect(screen.getByText("editor")).toBeInTheDocument();
    expect(useUserLanguagesQueryMock).toHaveBeenCalledWith("u-2", { enabled: false });
  });

  it("renders editor when viewer is the profile owner", () => {
    useParamsMock.mockReturnValue({ userId: "u-1" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    useUserLanguagesQueryMock.mockReturnValue({ data: undefined });

    render(<Languages />);

    expect(screen.getByText("editor")).toBeInTheDocument();
  });

  it("renders read-only languages for a non-owner non-admin viewer", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    useUserLanguagesQueryMock.mockReturnValue({
      data: {
        languages: [{ name: "English", proficiency: Proficiency.Native }],
      },
    });

    render(<Languages />);

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.queryByText("editor")).not.toBeInTheDocument();
    expect(useUserLanguagesQueryMock).toHaveBeenCalledWith("u-2", { enabled: true });
  });

  it("renders the empty state when a non-editor sees a profile with no languages", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    useUserLanguagesQueryMock.mockReturnValue({ data: { languages: [] } });

    render(<Languages />);

    expect(screen.getByText("You don't have any languages yet")).toBeInTheDocument();
    expect(screen.queryByText("editor")).not.toBeInTheDocument();
  });
});
