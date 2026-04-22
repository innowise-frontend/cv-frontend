import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";

const logoMock = vi.fn(({ collapsed }: { collapsed: boolean }) => (
  <div data-testid="logo">{String(collapsed)}</div>
));
const linkButtonMock = vi.fn(({ title, collapsed }: { title: string; collapsed: boolean }) => (
  <div data-testid={`sidebar-link-${title}`}>{String(collapsed)}</div>
));
const dividerMock = vi.fn(() => <div data-testid="sidebar-divider" />);
const profileBlockMock = vi.fn(({ collapsed }: { collapsed: boolean }) => (
  <div data-testid="profile-block">{String(collapsed)}</div>
));

const useAuthMock = vi.fn();

vi.mock("@assets/icon/LeftArrowIcon.svg?react", () => ({
  default: () => <svg data-testid="left-arrow-icon" />,
}));

vi.mock("@components/Logo", () => ({
  Logo: (props: { collapsed: boolean }) => logoMock(props),
}));

vi.mock("@components/shared", () => ({
  Divider: () => dividerMock(),
  LinkButton: (props: { title: string; collapsed: boolean }) => linkButtonMock(props),
  ProfileBlock: (props: { collapsed: boolean }) => profileBlockMock(props),
}));

vi.mock("@root/hooks/useAuth", () => ({
  useAuth: () => useAuthMock(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({ isAdmin: false });
    logoMock.mockClear();
    linkButtonMock.mockClear();
    dividerMock.mockClear();
    profileBlockMock.mockClear();
  });

  it("should render only common menu items for non-admin user", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("sidebar-link-Employees")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-Skills")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-Languages")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-CVs")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-Settings")).toBeInTheDocument();

    expect(screen.queryByTestId("sidebar-link-Departments")).not.toBeInTheDocument();
    expect(screen.queryByTestId("sidebar-link-Positions")).not.toBeInTheDocument();
    expect(screen.queryByTestId("sidebar-link-Projects")).not.toBeInTheDocument();

    expect(screen.queryByTestId("sidebar-divider")).not.toBeInTheDocument();
  });

  it("should render admin-only menu items and divider for admin user", () => {
    useAuthMock.mockReturnValue({ isAdmin: true });

    render(<Sidebar />);

    expect(screen.getByTestId("sidebar-link-Departments")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-Positions")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-link-Projects")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-divider")).toBeInTheDocument();
  });

  it("should pass collapsed state to child components after toggle click", async () => {
    const user = userEvent.setup();

    render(<Sidebar />);
    await user.click(screen.getByRole("button"));

    expect(logoMock).toHaveBeenLastCalledWith(expect.objectContaining({ collapsed: true }));
    expect(profileBlockMock).toHaveBeenLastCalledWith(expect.objectContaining({ collapsed: true }));

    const lastLinkCall = linkButtonMock.mock.calls.at(-1)?.[0];
    expect(lastLinkCall).toEqual(expect.objectContaining({ collapsed: true }));
  });

  it("should remove expanded width class when sidebar is collapsed", async () => {
    const user = userEvent.setup();

    const { container } = render(<Sidebar />);
    const sidebarRoot = container.firstChild;
    expect(sidebarRoot).toHaveClass("min-w-50");

    await user.click(screen.getByRole("button"));

    expect(sidebarRoot).not.toHaveClass("min-w-50");
  });
});
