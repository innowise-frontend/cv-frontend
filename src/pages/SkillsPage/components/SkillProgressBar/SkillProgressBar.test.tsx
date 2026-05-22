import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { SkillProgressBar } from "./SkillProgressBar";

const useUpdateProfileSkillMutationMock = vi.hoisted(() => vi.fn());
const closeModalMock = vi.hoisted(() => vi.fn());
const mutateAsyncMock = vi.hoisted(() => vi.fn());

vi.mock("../../api", () => ({
  getMasteryOptions: () => [
    { label: "Novice", value: Mastery.Novice },
    { label: "Expert", value: Mastery.Expert },
  ],
  useUpdateProfileSkillMutation: (...args: unknown[]) => useUpdateProfileSkillMutationMock(...args),
}));

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: closeModalMock }),
}));

vi.mock("@components/shared", () => ({
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: {
    Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
    Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Close: ({ children }: { children: ReactNode }) => <button>{children}</button>,
  },
  ProgressBar: ({ label }: { label: string }) => <div data-testid="progress-bar">{label}</div>,
  Select: ({
    label,
    onValueChange,
  }: {
    label: string;
    value: string;
    onValueChange: (v: string) => void;
  }) => (
    <div>
      <span>{label}</span>
      <button onClick={() => onValueChange(Mastery.Expert)}>select-{label}</button>
    </div>
  ),
}));

const defaultProps = {
  userId: "u-1",
  name: "React",
  mastery: Mastery.Novice,
  categoryId: "c-1",
};

describe("SkillProgressBar", () => {
  beforeEach(() => {
    useUpdateProfileSkillMutationMock.mockReturnValue({ mutateAsync: mutateAsyncMock });
  });

  it("renders the progress bar with the skill name", () => {
    render(<SkillProgressBar {...defaultProps} />);
    expect(screen.getByTestId("progress-bar")).toHaveTextContent("React");
  });

  it("in delete mode renders a button instead of modal trigger", () => {
    render(<SkillProgressBar {...defaultProps} isDeleteMode onClick={vi.fn()} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("calls onClick when clicked in delete mode", () => {
    const onClick = vi.fn();
    render(<SkillProgressBar {...defaultProps} isDeleteMode onClick={onClick} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(onClick).toHaveBeenCalled();
  });

  it("calls mutateAsync when update button is clicked with changed mastery", () => {
    render(<SkillProgressBar {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "select-Skill mastery" }));
    fireEvent.click(screen.getByRole("button", { name: "Update" }));
    expect(mutateAsyncMock).toHaveBeenCalled();
  });
});
