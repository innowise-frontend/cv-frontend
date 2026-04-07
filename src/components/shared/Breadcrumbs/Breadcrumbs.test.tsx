import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("should render a breadcrumb navigation", () => {
    render(<Breadcrumbs items={[{ label: "Home", href: "/" }]} />);

    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
  });

  it("should render a link per item with the correct href", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Settings", href: "/settings" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/settings");
  });

  it("should use an empty href when href is omitted", () => {
    render(<Breadcrumbs items={[{ label: "Current" }]} />);

    const anchor = screen.getByText("Current").closest("a");

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", "");
  });

  it("should render a separator between items but not after the last", () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { label: "A", href: "/a" },
          { label: "B", href: "/b" },
          { label: "C", href: "/c" },
        ]}
      />,
    );
    const separators = container.querySelectorAll('[data-slot="breadcrumb-separator"]');

    expect(separators).toHaveLength(2);
  });

  it("should merge className onto the outer wrapper", () => {
    const { container } = render(
      <Breadcrumbs items={[{ label: "A", href: "/a" }]} className="breadcrumbs-extra" />,
    );

    expect(container.firstChild).toHaveClass("breadcrumbs-extra");
  });
});
