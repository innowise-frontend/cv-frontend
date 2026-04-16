import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithFileRoutes } from "@root/lib/testUtils";
import { Sidebar } from "./Sidebar";

const PROFILE_BLOCK_MOCK = "ProfileBlock";

vi.mock("@components/shared/ProfileBlock", () => ({
  ProfileBlock: () => <div>{PROFILE_BLOCK_MOCK}</div>,
}));

describe("Sidebar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // it.
  // each([
  //   { case: "role is user", setRole: () => localStorage.setItem("role", "user") },
  //   { case: "role is unset", setRole: () => {} },
  // ])
  it("should render public links and hide admin-only nav when $case", async () => {
    const { getByText, queryByText } = await renderWithFileRoutes(<Sidebar />, {
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

    expect(queryByText("Departments")).not.toBeInTheDocument();
    expect(queryByText("Positions")).not.toBeInTheDocument();
    expect(queryByText("Projects")).not.toBeInTheDocument();
  });

  it("should render profile block", async () => {
    const { getByText } = await renderWithFileRoutes(<Sidebar />, {
      initialLocation: "/",
    });

    expect(getByText(PROFILE_BLOCK_MOCK)).toBeVisible();
  });
});
