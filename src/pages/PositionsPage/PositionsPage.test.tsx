import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PositionsPage } from "./PositionsPage";

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ title: "positions", href: "/_app/positions" }),
  };
});

vi.mock("./components", () => ({
  PositionsTable: () => <div>positions-table</div>,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: () => <div>breadcrumbs</div>,
}));

describe("PositionsPage", () => {
  it("renders breadcrumbs and positions table", () => {
    render(<PositionsPage />);

    expect(screen.getByText("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("positions-table")).toBeInTheDocument();
  });
});
