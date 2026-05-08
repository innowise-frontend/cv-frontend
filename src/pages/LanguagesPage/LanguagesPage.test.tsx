import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguagesPage } from "./LanguagesPage";

const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/_app/languages" }),
}));

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ title: "languages", href: "/_app/languages" }),
  };
});

vi.mock("./components", () => ({
  LanguagesTable: () => <div>languages-table</div>,
  LanguagesEditor: () => <div>languages-editor</div>,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: () => <div>breadcrumbs</div>,
}));

describe("LanguagesPage", () => {
  it("renders admin table when current user is admin", () => {
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: true });

    render(<LanguagesPage />);

    expect(screen.getByText("languages-table")).toBeInTheDocument();
    expect(screen.queryByText("languages-editor")).not.toBeInTheDocument();
  });

  it("renders editor for current user otherwise", () => {
    useAuthMock.mockReturnValue({ userId: "u-1", isAdmin: false });

    render(<LanguagesPage />);

    expect(screen.getByText("languages-editor")).toBeInTheDocument();
    expect(screen.queryByText("languages-table")).not.toBeInTheDocument();
  });
});
