import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Mastery, type SkillsQuery } from "@services/graphql/__generated__/graphql";
import { ProfileAddSkillModal } from "./AddSkillModal";

type SkillItem = SkillsQuery["skills"]["items"][number];

const useAddProfileSkillMutationMock = vi.hoisted(() => vi.fn());
const mutateAsyncMock = vi.hoisted(() => vi.fn());
const closeModalMock = vi.hoisted(() => vi.fn());

vi.mock("@root/pages/SkillsPage/api", () => ({
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
    Close: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
      <button onClick={onClick}>{children}</button>
    ),
  },
  Select: ({
    label,
    list,
    onValueChange,
  }: {
    label: string;
    list?: { value: string }[];
    onValueChange: (v: string) => void;
  }) => (
    <button
      onClick={() =>
        onValueChange(
          label === "Skill mastery" ? Mastery.Novice : (list?.[0]?.value ?? "TypeScript"),
        )
      }
    >
      {label}
    </button>
  ),
}));

vi.mock("@assets/icon/PlusIcon.svg?react", () => ({
  default: () => <span>plus</span>,
}));

const skills: SkillItem[] = [
  { id: "s1", name: "React", created_at: "", category: null } as SkillItem,
  { id: "s2", name: "TypeScript", created_at: "", category: null } as SkillItem,
];
const masteryOptions = [{ label: Mastery.Novice, value: Mastery.Novice }];

describe("AddSkillModal (UserProfile)", () => {
  beforeEach(() => {
    useAddProfileSkillMutationMock.mockReturnValue({ mutateAsync: mutateAsyncMock });
    vi.clearAllMocks();
  });

  it("renders add trigger", () => {
    render(<ProfileAddSkillModal userId="u1" skills={skills} masteryOptions={masteryOptions} />);
    expect(screen.getByRole("button", { name: /Add skill/i })).toBeInTheDocument();
  });

  it("calls mutateAsync when confirmed", async () => {
    render(
      <ProfileAddSkillModal
        userId="u1"
        skills={skills}
        addedSkillNames={["React"]}
        masteryOptions={masteryOptions}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Skill" }));
    fireEvent.click(screen.getByRole("button", { name: "Skill mastery" }));
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(mutateAsyncMock).toHaveBeenCalled();
  });
});
