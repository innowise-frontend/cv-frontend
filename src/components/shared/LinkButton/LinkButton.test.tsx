import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LinkButton } from "./LinkButton";

const linkMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select: (state: { location: { pathname: string } }) => string }) =>
    select({ location: { pathname: "/" } }),
  Link: (props: {
    to: string;
    className?: string;
    activeProps?: { className?: string };
    inactiveProps?: { className?: string };
    children: React.ReactNode;
  }) => linkMock(props),
}));

describe("LinkButton", () => {
  it("should render title and icon when expanded", () => {
    const iconMock = vi.fn((props: { alt?: string }) => <svg data-testid="link-icon" {...props} />);

    linkMock.mockImplementation(({ to, children }) => <a href={to}>{children}</a>);

    render(<LinkButton title="Employees" to="/employees" icon={iconMock} />);

    expect(screen.getByRole("link", { name: /Employees/i })).toHaveAttribute("href", "/employees");
    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
    expect(iconMock).toHaveBeenCalledWith(
      expect.objectContaining({ alt: "Employees", width: 24, height: 24 }),
      undefined,
    );
  });

  it("should visually hide title when collapsed", () => {
    const iconMock = vi.fn(() => <svg data-testid="link-icon" />);
    linkMock.mockImplementation(({ to, children }) => <a href={to}>{children}</a>);

    render(<LinkButton title="Settings" to="/settings" icon={iconMock} collapsed />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/settings");
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toHaveClass("opacity-0");
  });

  it("should pass active and inactive classes to router Link", () => {
    const iconMock = vi.fn(() => <svg />);
    linkMock.mockImplementation(({ to, children }) => <a href={to}>{children}</a>);

    render(<LinkButton title="CVs" to="/cvs" icon={iconMock} />);

    expect(linkMock).toHaveBeenCalledWith(
      expect.objectContaining({
        className: "flex items-center gap-4 p-4 rounded-r-40 cursor-pointer",
        activeProps: {
          className: "opacity-100 bg-gray-7 dark:bg-gray-4",
        },
        inactiveProps: { className: "text-gray-3 dark:text-gray-5" },
      }),
    );
  });
});
