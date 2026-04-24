import { describe, it, expect } from "vitest";
import { renderWithFileRoutes } from "@root/lib/testUtils";
import { ProfileBlock } from "./ProfileBlock";

describe("ProfileBlock", () => {
  it("should render", async () => {
    const { getByText } = await renderWithFileRoutes(
      <ProfileBlock firstName="Rostislav" lastName="Harlanov" />,
    );

    expect(getByText("Rostislav Harlanov")).toBeVisible();
    expect(getByText("Rostislav Harlanov")).toHaveAttribute("href", "/profile");
  });
});
