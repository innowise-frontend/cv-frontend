import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Profile } from "./Profile";

const useUserProfileMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useParams: () => ({ userId: "user-1" }),
}));

vi.mock("./api", () => ({
  useUserProfile: (userId: string) => useUserProfileMock(userId),
}));

vi.mock("@root/pages/ErrorPage", () => ({
  ErrorPage: ({ error }: { error: string }) => <div data-testid="error-page">{error}</div>,
}));

vi.mock("./components/Avatar", () => ({
  Avatar: () => <div data-testid="profile-avatar" />,
}));

vi.mock("./components/Info", () => ({
  Info: () => <div data-testid="profile-info" />,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing while loading", () => {
    useUserProfileMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
    });

    const { container } = render(<Profile />);

    expect(container.firstChild).toBeNull();
  });

  it("renders ErrorPage when query fails or data is missing", () => {
    useUserProfileMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
    });

    render(<Profile />);

    expect(screen.getByTestId("error-page")).toHaveTextContent("page.profile.userNotFound");
    expect(useUserProfileMock).toHaveBeenCalledWith("user-1");
  });

  it("renders avatar and info when profile loads", () => {
    useUserProfileMock.mockReturnValue({
      data: { user: { id: "user-1" } },
      isPending: false,
      isError: false,
    });

    render(<Profile />);

    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("profile-info")).toBeInTheDocument();
  });
});
