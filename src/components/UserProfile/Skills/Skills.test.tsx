import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { Skills } from "./Skills";

const useParamsMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());
const useUserSkillsQueryMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useParams: () => useParamsMock(),
}));

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@root/pages/SkillsPage/api", () => ({
  useUserSkillsQuery: (userId: string, config?: unknown) => useUserSkillsQueryMock(userId, config),
  useSkillCategoriesQuery: () => ({ data: undefined }),
}));

vi.mock("@root/pages/SkillsPage/components", () => ({
  SkillsEditor: () => <div>editor</div>,
}));

vi.mock("@components/shared", () => ({
  ProgressBar: ({ label }: { label: string }) => <div>{label}</div>,
}));

describe("UserProfile Skills", () => {
  it("renders editor when admin views any profile", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });
    useUserSkillsQueryMock.mockReturnValue({ data: undefined });

    render(<Skills />);

    expect(screen.getByText("editor")).toBeInTheDocument();
    expect(useUserSkillsQueryMock).toHaveBeenCalledWith("u-2", { enabled: false });
  });

  it("renders editor when viewer is the profile owner", () => {
    useParamsMock.mockReturnValue({ userId: "u-1" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    useUserSkillsQueryMock.mockReturnValue({ data: undefined });

    render(<Skills />);

    expect(screen.getByText("editor")).toBeInTheDocument();
  });

  it("renders read-only skills for a non-owner non-admin viewer", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    useUserSkillsQueryMock.mockReturnValue({
      data: {
        skills: [{ name: "TypeScript", mastery: Mastery.Novice, categoryId: null }],
      },
    });

    render(<Skills />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.queryByText("editor")).not.toBeInTheDocument();
    expect(useUserSkillsQueryMock).toHaveBeenCalledWith("u-2", { enabled: true });
  });

  it("renders the empty state when a non-editor sees a profile with no skills", () => {
    useParamsMock.mockReturnValue({ userId: "u-2" });
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });
    useUserSkillsQueryMock.mockReturnValue({ data: { skills: [] } });

    render(<Skills />);

    expect(screen.getByText("You don't have any skills yet")).toBeInTheDocument();
    expect(screen.queryByText("editor")).not.toBeInTheDocument();
  });
});
