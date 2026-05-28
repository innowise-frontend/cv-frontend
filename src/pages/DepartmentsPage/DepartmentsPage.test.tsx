import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DepartmentsPage } from "./DepartmentsPage";

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ title: "departments", href: "/_app/departments" }),
  };
});

vi.mock("./components/DepartmentsTable/DepartmentsTable", () => ({
  DepartmentsTable: () => <div>departments-table</div>,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: () => <div>breadcrumbs</div>,
}));

describe("DepartmentsPage", () => {
  it("renders breadcrumbs and departments table", () => {
    render(<DepartmentsPage />);

    expect(screen.getByText("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("departments-table")).toBeInTheDocument();
  });
});
