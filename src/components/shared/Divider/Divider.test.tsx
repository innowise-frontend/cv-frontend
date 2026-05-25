import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal rule-sized bar", () => {
    const { container } = render(<Divider />);
    const bar = container.firstChild as HTMLElement;

    expect(bar).toBeInstanceOf(HTMLDivElement);
    expect(bar).toHaveClass("w-full", "h-px", "bg-gray-5", "dark:bg-gray-3");
  });
});
