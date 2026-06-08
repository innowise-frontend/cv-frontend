import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Info } from "../Info";

const useParamsMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());
const useUserProfileMock = vi.hoisted(() => vi.fn());
const useUserProfileMutationsMock = vi.hoisted(() => vi.fn());

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

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@root/components/shared/Button/Button", () => ({
  Button: ({
    children,
    disabled,
    onClick,
    type,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit";
  }) => (
    <button type={type ?? "button"} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("@root/components/shared/Input/Input", () => ({
  Input: ({
    label,
    value,
    disabled,
    onChange,
  }: {
    label: string;
    value: string;
    disabled?: boolean;
    onChange: (e: { target: { value: string } }) => void;
  }) => (
    <label>
      {label}
      <input aria-label={label} value={value} disabled={disabled} onChange={onChange} />
    </label>
  ),
}));

vi.mock("@root/components/shared/Select/Select", () => ({
  Select: ({
    label,
    value,
    disabled,
    list,
    onValueChange,
  }: {
    label: string;
    value: string;
    disabled?: boolean;
    list: Array<{ value: string; label: string }>;
    onValueChange: (v: string) => void;
  }) => (
    <label>
      {label}
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onValueChange(e.target.value)}
      >
        {list.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  ),
}));

describe("UserProfile Info", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders verify email button for own unverified profile", async () => {
    useParamsMock.mockReturnValue({ userId: "u1" });
    useAuthMock.mockReturnValue({ isAdmin: false, userId: "u1", isVerified: false });

    useUserProfileMock.mockReturnValue({
      data: {
        user: {
          email: "u1@example.com",
          department: { id: "d1" },
          position: { id: "p1" },
          profile: {
            first_name: "A",
            last_name: "B",
            full_name: "A B",
            created_at: "0",
          },
        },
        departments: { items: [{ id: "d1", name: "Dep 1" }] },
        positions: { items: [{ id: "p1", name: "Pos 1" }] },
      },
    });

    useUserProfileMutationsMock.mockReturnValue({
      updateProfile: { mutateAsync: vi.fn() },
      updateUser: { mutateAsync: vi.fn() },
      sendVerificationEmail: { mutate: vi.fn() },
    });

    render(<Info />);

    expect(screen.getByRole("button", { name: "page.profile.verifyEmail" })).toBeInTheDocument();
  });

  it("hides verify email button when user is already verified", async () => {
    useParamsMock.mockReturnValue({ userId: "u1" });
    useAuthMock.mockReturnValue({ isAdmin: false, userId: "u1", isVerified: true });

    useUserProfileMock.mockReturnValue({
      data: {
        user: {
          email: "u1@example.com",
          department: { id: "d1" },
          position: { id: "p1" },
          profile: {
            first_name: "A",
            last_name: "B",
            full_name: "A B",
            created_at: "0",
          },
        },
        departments: { items: [{ id: "d1", name: "Dep 1" }] },
        positions: { items: [{ id: "p1", name: "Pos 1" }] },
      },
    });

    useUserProfileMutationsMock.mockReturnValue({
      updateProfile: { mutateAsync: vi.fn() },
      updateUser: { mutateAsync: vi.fn() },
      sendVerificationEmail: { mutate: vi.fn() },
    });

    render(<Info />);

    expect(screen.queryByRole("button", { name: "page.profile.verifyEmail" })).toBeNull();
  });

  it("admin editing another user can update department/position (calls updateUser)", async () => {
    const user = userEvent.setup();

    useParamsMock.mockReturnValue({ userId: "u2" });
    useAuthMock.mockReturnValue({ isAdmin: true, userId: "admin-1", isVerified: false });

    useUserProfileMock.mockReturnValue({
      data: {
        user: {
          email: "u2@example.com",
          department: { id: "d1" },
          position: { id: "p1" },
          profile: {
            first_name: "A",
            last_name: "B",
            full_name: "A B",
            created_at: "0",
          },
        },
        departments: {
          items: [
            { id: "d1", name: "Dep 1" },
            { id: "d2", name: "Dep 2" },
          ],
        },
        positions: {
          items: [
            { id: "p1", name: "Pos 1" },
            { id: "p2", name: "Pos 2" },
          ],
        },
      },
    });

    const updateProfileMutateAsync = vi.fn().mockResolvedValue(undefined);
    const updateUserMutateAsync = vi.fn().mockResolvedValue(undefined);

    useUserProfileMutationsMock.mockReturnValue({
      updateProfile: { mutateAsync: updateProfileMutateAsync },
      updateUser: { mutateAsync: updateUserMutateAsync },
      sendVerificationEmail: { mutate: vi.fn() },
    });

    render(<Info />);

    expect(screen.getByLabelText("page.profile.department")).toBeEnabled();

    await user.selectOptions(screen.getByLabelText("page.profile.department"), "d2");
    await user.click(screen.getByRole("button", { name: "page.profile.update" }));

    expect(updateProfileMutateAsync).not.toHaveBeenCalled();
    expect(updateUserMutateAsync).toHaveBeenCalledWith({
      userId: "u2",
      departmentId: "d2",
      positionId: "p1",
    });
  });

  it("calls updateProfile when name changes", async () => {
    const user = userEvent.setup();

    useParamsMock.mockReturnValue({ userId: "u1" });
    useAuthMock.mockReturnValue({ isAdmin: false, userId: "u1", isVerified: false });

    useUserProfileMock.mockReturnValue({
      data: {
        user: {
          email: "u1@example.com",
          department: { id: "d1" },
          position: { id: "p1" },
          profile: {
            first_name: "A",
            last_name: "B",
            full_name: "A B",
            created_at: "0",
          },
        },
        departments: { items: [{ id: "d1", name: "Dep 1" }] },
        positions: { items: [{ id: "p1", name: "Pos 1" }] },
      },
    });

    const updateProfileMutateAsync = vi.fn().mockResolvedValue(undefined);
    const updateUserMutateAsync = vi.fn().mockResolvedValue(undefined);

    useUserProfileMutationsMock.mockReturnValue({
      updateProfile: { mutateAsync: updateProfileMutateAsync },
      updateUser: { mutateAsync: updateUserMutateAsync },
      sendVerificationEmail: { mutate: vi.fn() },
    });

    render(<Info />);

    await user.type(screen.getByLabelText("page.profile.firstName"), "X");
    await user.click(screen.getByRole("button", { name: "page.profile.update" }));

    expect(updateProfileMutateAsync).toHaveBeenCalledWith({
      userId: "u1",
      first_name: "AX",
      last_name: "B",
    });
  });
});
