import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Mastery, Proficiency } from "@root/services/graphql/__generated__/graphql";
import { COLORS } from "./constants";
import { ProgressBar } from "./ProgressBar";

function getTrackAndIndicator(progressRoot: HTMLElement) {
  const track = progressRoot.firstElementChild as HTMLElement | null;
  const indicator = track?.firstElementChild as HTMLElement | null;

  return { track, indicator };
}

function expectClasses(el: HTMLElement | null, classString: string) {
  expect(el).toHaveClass(...classString.trim().split(/\s+/));
}

describe("ProgressBar", () => {
  it("renders the label (title text)", () => {
    render(<ProgressBar label="TypeScript" mastery={Mastery.Expert} />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders the label for proficiency variant", () => {
    render(<ProgressBar label="English" proficiency={Proficiency.B1} />);

    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("applies mastery track and indicator colors from the palette", () => {
    render(<ProgressBar label="Novice skill" mastery={Mastery.Novice} />);

    const progress = screen.getByRole("progressbar");
    const { track, indicator } = getTrackAndIndicator(progress);

    expectClasses(track, COLORS.gray.trackClassName);
    expectClasses(indicator, COLORS.gray.indicatorClassName);
  });

  it("applies proficiency colors (blue) on track and indicator", () => {
    render(<ProgressBar label="Expert skill" proficiency={Proficiency.B1} />);

    const progress = screen.getByRole("progressbar");
    const { track, indicator } = getTrackAndIndicator(progress);

    expectClasses(track, COLORS.blue.trackClassName);
    expectClasses(indicator, COLORS.blue.indicatorClassName);
  });
});
