import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { UserProfilePage } from "./UserProfilePage";

const navigateMock = vi.hoisted(() => vi.fn());
const useUserProfileMock = vi.hoisted(() => vi.fn());

vi.mock("@root/components/UserProfile/Profile/api", () => ({
  useUserProfile: (userId: string) => useUserProfileMock(userId),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
  useParams: () => ({ userId: "user-42" }),
  useRouterState: ({ select }: { select: (s: { location: { pathname: string } }) => string }) =>
    select({ location: { pathname: "/users/user-42/profile" } }),
}));

vi.mock("@root/components/shared/Breadcrumbs/Breadcrumbs", () => ({
  Breadcrumbs: ({ items }: { items: Array<{ label: string; href: string }> }) => (
    <nav data-testid="breadcrumbs">
      {items.map((item) => (
        <span key={item.href} data-href={item.href}>
          {item.label}
        </span>
      ))}
    </nav>
  ),
}));

vi.mock("@root/components/shared/Tabs/Tabs", () => ({
  PageTabs: ({
    children,
    onValueChange,
    value,
  }: {
    children: React.ReactNode;
    onValueChange: (next: string) => void;
    value: string;
  }) => (
    <div data-testid="page-tabs" data-active={value}>
      <button type="button" onClick={() => onValueChange("skills")}>
        switch-skills
      </button>
      {children}
    </div>
  ),
}));

describe("UserProfilePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserProfileMock.mockReturnValue({
      data: {
        user: {
          id: "user-42",
          email: "u@example.com",
          created_at: "",
          department: null,
          position: null,
          profile: {
            created_at: "",
            full_name: "Ada Lovelace",
            first_name: "Ada",
            last_name: "Lovelace",
            avatar: null,
            email: null,
          },
        },
        departments: [],
        positions: [],
      },
      isPending: false,
      isError: false,
    });
  });

  it("renders breadcrumbs with employees, profile name, and active tab", () => {
    render(
      <UserProfilePage>
        <div>tab-body</div>
      </UserProfilePage>,
    );

    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("Employees")).toHaveAttribute("data-href", "/");
    expect(screen.getByText("Ada Lovelace")).toHaveAttribute("data-href", "/users/user-42/profile");
    expect(screen.getByText("profile")).toHaveAttribute("data-href", "/users/user-42/profile");
    expect(useUserProfileMock).toHaveBeenCalledWith("user-42");
  });

  it("navigates when tab value changes", async () => {
    const user = userEvent.setup();

    render(
      <UserProfilePage>
        <div>content</div>
      </UserProfilePage>,
    );

    await user.click(screen.getByRole("button", { name: "switch-skills" }));

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/users/$userId/skills",
      params: { userId: "user-42" },
    });
  });
});
