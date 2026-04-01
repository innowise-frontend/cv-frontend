import { describe, it, expect } from "vitest";
import ProfileBlock from "./ProfileBlock";
import { renderWithFileRoutes } from "@root/lib/testUtils";

describe("ProfileBlock", () => {
  it("should render", async () => {
    const { getByText } = await renderWithFileRoutes(<ProfileBlock />);

    expect(getByText("Rostislav Harlanov")).toBeVisible();
    expect(getByText("Rostislav Harlanov")).toHaveAttribute("href", "/profile");
  });
});
