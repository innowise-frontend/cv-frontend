import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableActions } from "./TableActions";

const dropdownMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
  }: {
    children: React.ReactNode;
    to: string;
    params: { userId: string };
  }) => (
    <a data-testid="router-link" data-to={to} data-user-id={params.userId}>
      {children}
    </a>
  ),
}));

vi.mock("@components/shared", () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button type="button" className={className}>
      {children}
    </button>
  ),
  Dropdown: (props: {
    options: Array<{ label: string; onClick: (userId?: string) => void }>;
    params?: string;
  }) => {
    dropdownMock(props);

    return <div data-testid="actions-dropdown">Actions</div>;
  },
  ROUTES: {
    USER_PAGE: "/users/$userId",
  },
}));

describe("TableActions", () => {
  const actions = [
    { label: "View profile", onClick: vi.fn() },
    { label: "Delete", onClick: vi.fn() },
  ];

  it("renders dropdown when variant is dropdown", () => {
    render(<TableActions userId="42" actions={actions} variant="dropdown" />);

    expect(screen.getByTestId("actions-dropdown")).toBeInTheDocument();
    expect(dropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.arrayContaining([
          expect.objectContaining({ label: "View profile", onClick: expect.any(Function) }),
          expect.objectContaining({ label: "Delete", onClick: expect.any(Function) }),
        ]),
      }),
    );

    const passedOptions = dropdownMock.mock.calls[0][0].options;
    passedOptions[0].onClick();
    expect(actions[0].onClick).toHaveBeenCalledWith("42");
    expect(screen.queryByTestId("router-link")).not.toBeInTheDocument();
  });

  it("defaults to dropdown variant", () => {
    render(<TableActions userId="42" actions={actions} />);

    expect(screen.getByTestId("actions-dropdown")).toBeInTheDocument();
  });

  it("renders user profile link when variant is profileLink", () => {
    render(<TableActions userId="99" actions={actions} variant="profileLink" />);

    const link = screen.getByTestId("router-link");
    expect(link).toHaveAttribute("data-to", "/users/$userId");
    expect(link).toHaveAttribute("data-user-id", "99");
    expect(screen.queryByTestId("actions-dropdown")).not.toBeInTheDocument();
  });
});
