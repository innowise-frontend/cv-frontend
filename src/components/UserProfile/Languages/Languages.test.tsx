import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Languages } from "./Languages";

describe("Languages", () => {
  it("renders placeholder section", () => {
    render(<Languages />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });
});
