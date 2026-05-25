import { describe, expect, it, vi } from "vitest";
import { renderWithFileRoutes } from "@root/lib/testUtils";
import { ProfileBlock } from "./ProfileBlock";

const useAuthMock = vi.fn();
const useUserProfileMock = vi.fn();

vi.mock("@root/hooks", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("@root/components/UserProfile/Profile/api", () => ({
  useUserProfile: (userId: string) => useUserProfileMock(userId),
}));

const buildProfile = (
  overrides: Partial<{
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string | null;
  }> = {},
) => ({
  data: {
    user: {
      profile: {
        first_name: "Rostislav",
        last_name: "Harlanov",
        full_name: "Rostislav Harlanov",
        avatar: null,
        ...overrides,
      },
    },
  },
});

describe("ProfileBlock", () => {
  it("renders the current user's name and links to their profile page", async () => {
    useAuthMock.mockReturnValue({ userId: "u-1" });
    useUserProfileMock.mockReturnValue(buildProfile());

    const { getByText, getByRole } = await renderWithFileRoutes(<ProfileBlock />);

    expect(getByText("Rostislav Harlanov")).toBeVisible();
    expect(getByRole("link")).toHaveAttribute("href", "/users/u-1/profile");
  });

  it("hides the name when collapsed but keeps the avatar link", async () => {
    useAuthMock.mockReturnValue({ userId: "u-1" });
    useUserProfileMock.mockReturnValue(buildProfile());

    const { queryByText, getByRole } = await renderWithFileRoutes(<ProfileBlock collapsed />);

    expect(queryByText("Rostislav Harlanov")).not.toBeInTheDocument();
    expect(getByRole("link")).toHaveAttribute("href", "/users/u-1/profile");
  });

  it("renders nothing when there is no logged-in user", async () => {
    useAuthMock.mockReturnValue({ userId: "" });
    useUserProfileMock.mockReturnValue({ data: undefined });

    const { container } = await renderWithFileRoutes(<ProfileBlock />);

    expect(container.querySelector("a")).toBeNull();
  });

  it("renders an empty placeholder while the profile is still loading", async () => {
    useAuthMock.mockReturnValue({ userId: "u-1" });
    useUserProfileMock.mockReturnValue({ data: undefined });

    const { getByRole, queryByText } = await renderWithFileRoutes(<ProfileBlock />);

    expect(getByRole("link")).toHaveAttribute("href", "/users/u-1/profile");
    expect(queryByText(/Rostislav/)).not.toBeInTheDocument();
  });
});
