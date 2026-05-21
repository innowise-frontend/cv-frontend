import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Mastery, type SkillsQuery } from "@services/graphql/__generated__/graphql";
import { AddSkillModal } from "./AddSkillModal";

type SkillItem = SkillsQuery["skills"]["items"][number];

const useAddProfileSkillMutationMock = vi.hoisted(() => vi.fn());
const mutateAsyncMock = vi.hoisted(() => vi.fn());
const closeModalMock = vi.hoisted(() => vi.fn());

vi.mock("../../api", () => ({
  useAddProfileSkillMutation: (...args: unknown[]) => useAddProfileSkillMutationMock(...args),
}));

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: closeModalMock }),
}));

vi.mock("@components/shared", () => ({
  Modal: {
    Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
    Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Close: ({
      children,
      onClick,
      disabled,
    }: {
      children: ReactNode;
      onClick?: () => void;
      disabled?: boolean;
    }) => (
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
    ),
  },
  Select: ({ label, onValueChange }: { label: string; onValueChange: (v: string) => void }) => (
    <button onClick={() => onValueChange("React")}>select-{label}</button>
  ),
}));

const skills: SkillItem[] = [
  { id: "s1", name: "React", created_at: "2024-01-01", category: { id: "c1", name: "Frontend" } },
];
const masteryOptions = [{ label: "Expert", value: Mastery.Expert }];

describe("AddSkillModal", () => {
  beforeEach(() => {
    useAddProfileSkillMutationMock.mockReturnValue({ mutateAsync: mutateAsyncMock });
  });

  it("renders the trigger button", () => {
    render(<AddSkillModal userId="u1" skills={skills} masteryOptions={masteryOptions} />);
    expect(screen.getByRole("button", { name: /Add skill/i })).toBeInTheDocument();
  });

  it("add button is disabled when no skill or mastery selected", () => {
    render(<AddSkillModal userId="u1" skills={[]} masteryOptions={[]} />);
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("calls mutateAsync after selecting skill and mastery", () => {
    render(<AddSkillModal userId="u1" skills={skills} masteryOptions={masteryOptions} />);
    fireEvent.click(screen.getByRole("button", { name: "select-Skill" }));
    fireEvent.click(screen.getByRole("button", { name: "select-Skill mastery" }));
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(mutateAsyncMock).toHaveBeenCalled();
  });
});
