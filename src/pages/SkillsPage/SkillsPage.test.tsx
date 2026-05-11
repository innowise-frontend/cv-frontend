import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SkillsPage } from "./SkillsPage";

const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/_app/skills" }),
}));

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ title: "skills", href: "/_app/skills" }),
  };
});

vi.mock("./components", () => ({
  SkillsTable: () => <div>skills-table</div>,
  SkillsEditor: () => <div>skills-editor</div>,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: () => <div>breadcrumbs</div>,
}));

describe("SkillsPage", () => {
  it("renders admin table when current user is admin", () => {
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });

    render(<SkillsPage />);

    expect(screen.getByText("skills-table")).toBeInTheDocument();
    expect(screen.queryByText("skills-editor")).not.toBeInTheDocument();
  });

  it("renders editor for current user otherwise", () => {
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });

    render(<SkillsPage />);

    expect(screen.getByText("skills-editor")).toBeInTheDocument();
    expect(screen.queryByText("skills-table")).not.toBeInTheDocument();
  });
});
