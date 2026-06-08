import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectsPage } from "./ProjectsPage";

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return {
    ...actual,
    getBreadcrumbsLink: () => ({ label: "Projects", href: "/_app/projects" }),
  };
});

vi.mock("./components/ProjectsTable/ProjectsTable", () => ({
  ProjectsTable: () => <div>projects-table</div>,
}));

vi.mock("@components/shared", () => ({
  Breadcrumbs: () => <div>breadcrumbs</div>,
}));

describe("ProjectsPage", () => {
  it("renders breadcrumbs and projects table", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("projects-table")).toBeInTheDocument();
  });
});
