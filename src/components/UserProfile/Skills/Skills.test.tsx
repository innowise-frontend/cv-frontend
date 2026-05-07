import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skills } from "./Skills";

describe("Skills", () => {
  it("renders placeholder section", () => {
    render(<Skills />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });
});
