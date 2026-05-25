import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteSkillModal } from "./DeleteSkillModal";

const useDeleteSkillMutationMock = vi.hoisted(() => vi.fn());
const mutateAsyncMock = vi.hoisted(() => vi.fn());
const closeModalMock = vi.hoisted(() => vi.fn());

vi.mock("../../api", () => ({
  useDeleteSkillMutation: (...args: unknown[]) => useDeleteSkillMutationMock(...args),
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
}));

describe("DeleteSkillModal", () => {
  beforeEach(() => {
    useDeleteSkillMutationMock.mockReturnValue({ mutateAsync: mutateAsyncMock });
  });

  it("renders the delete trigger", () => {
    render(<DeleteSkillModal name="React" id="s1" />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("renders the skill name in the confirmation body", () => {
    render(<DeleteSkillModal name="React" id="s1" />);
    expect(screen.getByText(/React/)).toBeInTheDocument();
  });

  it("calls mutateAsync with the skill id on confirm", () => {
    render(<DeleteSkillModal name="React" id="s1" />);
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(mutateAsyncMock).toHaveBeenCalledWith({ skillId: "s1" });
  });
});
