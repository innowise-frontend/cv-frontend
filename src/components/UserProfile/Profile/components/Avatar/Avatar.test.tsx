import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Avatar } from "./Avatar";

const useParamsMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());
const useUserProfileMock = vi.hoisted(() => vi.fn());
const useUserProfileMutationsMock = vi.hoisted(() => vi.fn());
const prepareAvatarForUploadMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useParams: (...args: unknown[]) => useParamsMock(...args),
}));

vi.mock("@root/hooks/useAuth/useAuth", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("../../api", () => ({
  useUserProfile: (...args: unknown[]) => useUserProfileMock(...args),
  useUserProfileMutations: (...args: unknown[]) => useUserProfileMutationsMock(...args),
}));

vi.mock("../../utils", () => ({
  prepareAvatarForUpload: (...args: unknown[]) => prepareAvatarForUploadMock(...args),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@root/components/shared/Avatar/Avatar", () => ({
  Avatar: ({ name, imageSrc }: { name: string; imageSrc: string }) => (
    <div data-testid="avatar-component">
      {name}-{imageSrc}
    </div>
  ),
}));

describe("UserProfile Avatar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders upload UI when editable and uploads selected file", async () => {
    const user = userEvent.setup();

    useParamsMock.mockReturnValue({ userId: "u1" });
    useAuthMock.mockReturnValue({ isAdmin: false, userId: "u1" });
    useUserProfileMock.mockReturnValue({
      data: { user: { profile: { full_name: "John Doe", avatar: "http://x" } } },
    });

    const mutateAsync = vi.fn().mockResolvedValue(undefined);
    useUserProfileMutationsMock.mockReturnValue({ uploadAvatar: { mutateAsync } });

    prepareAvatarForUploadMock.mockResolvedValue({
      ok: true,
      avatar: { base64: "data:image/png;base64,AAA", size: 3, type: "image/png" },
    });

    const { container } = render(<Avatar />);

    expect(screen.getByTestId("avatar-component")).toHaveTextContent("John Doe-http://x");

    await user.click(screen.getByRole("button", { name: "page.profile.uploadAvatar" }));

    const input = container.querySelector('input[type="file"]') as HTMLInputElement | null;
    expect(input).toBeTruthy();

    const file = new File(["abc"], "a.png", { type: "image/png" });
    await user.upload(input!, file);

    expect(prepareAvatarForUploadMock).toHaveBeenCalledTimes(1);
    expect(mutateAsync).toHaveBeenCalledWith({
      userId: "u1",
      base64: "data:image/png;base64,AAA",
      size: 3,
      type: "image/png",
    });
  });

  it("does not render upload UI when not editable", () => {
    useParamsMock.mockReturnValue({ userId: "u2" });
    useAuthMock.mockReturnValue({ isAdmin: false, userId: "u1" });
    useUserProfileMock.mockReturnValue({
      data: { user: { profile: { full_name: "John Doe", avatar: null } } },
    });
    useUserProfileMutationsMock.mockReturnValue({ uploadAvatar: { mutateAsync: vi.fn() } });

    render(<Avatar />);

    expect(screen.queryByRole("button", { name: "page.profile.uploadAvatar" })).toBeNull();
  });
});
