import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserCvsPage } from "./UserCvsPage";

vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/cvs" }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ label: "CVs", href: "/cvs" }),
  };
});

vi.mock("./components/CvsTable/CvsTable", () => ({
  CvsTable: () => <div data-testid="cvs-table" />,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: ({ items }: { items: Array<{ label: string }> }) => (
    <nav data-testid="breadcrumbs">{items[0]?.label}</nav>
  ),
}));

describe("UserCvsPage", () => {
  it("renders breadcrumbs and cvs table", () => {
    render(<UserCvsPage />);

    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("CVs");
    expect(screen.getByTestId("cvs-table")).toBeInTheDocument();
  });
});
