import { describe, it, expect, vi } from "vitest";
import { renderWithFileRoutes } from "@root/lib/testUtils";
import { Sidebar } from "./Sidebar";

const PROFILE_BLOCK_MOCK = "ProfileBlock";

vi.mock("@components/shared/ProfileBlock", () => ({
  ProfileBlock: () => <div>{PROFILE_BLOCK_MOCK}</div>,
}));

describe("Sidebar", () => {
  it("should render public links", async () => {
    const { getByText } = await renderWithFileRoutes(<Sidebar />, {
      initialLocation: "/",
    });

    expect(getByText("Employees")).toBeVisible();
    expect(getByText("Employees")).toHaveAttribute("href", "/");

    expect(getByText("Skills")).toBeVisible();
    expect(getByText("Skills")).toHaveAttribute("href", "/skills");

    expect(getByText("Languages")).toBeVisible();
    expect(getByText("Languages")).toHaveAttribute("href", "/languages");

    expect(getByText("CVs")).toBeVisible();
    expect(getByText("CVs")).toHaveAttribute("href", "/cvs");

    expect(getByText("Settings")).toBeVisible();
    expect(getByText("Settings")).toHaveAttribute("href", "/settings");
  });

  it("should render admin links", async () => {
    const { getByText } = await renderWithFileRoutes(<Sidebar />, {
      initialLocation: "/",
    });

    expect(getByText("Departments")).toBeVisible();
    expect(getByText("Departments")).toHaveAttribute("href", "/departments");

    expect(getByText("Positions")).toBeVisible();
    expect(getByText("Positions")).toHaveAttribute("href", "/positions");

    expect(getByText("Projects")).toBeVisible();
    expect(getByText("Projects")).toHaveAttribute("href", "/projects");
  });

  it("should render profile block", async () => {
    const { getByText } = await renderWithFileRoutes(<Sidebar />, {
      initialLocation: "/",
    });

    expect(getByText(PROFILE_BLOCK_MOCK)).toBeVisible();
  });
});
