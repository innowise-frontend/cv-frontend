import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateSkillModal } from "./CreateSkillModal";

const useCreateSkillMutationMock = vi.hoisted(() => vi.fn());
const mutateAsyncMock = vi.hoisted(() => vi.fn());
const closeModalMock = vi.hoisted(() => vi.fn());

vi.mock("../../api", () => ({
  useCreateSkillMutation: (...args: unknown[]) => useCreateSkillMutationMock(...args),
  useSkillCategoriesQuery: () => ({ data: [{ id: "c1", name: "Frontend", children: [] }] }),
}));

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: closeModalMock }),
}));

vi.mock("@components/shared", () => ({
  Input: ({
    value,
    onChange,
    label,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }) => <input aria-label={label} value={value} onChange={onChange} />,
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
    <button onClick={() => onValueChange("c1")}>select-{label}</button>
  ),
}));

describe("CreateSkillModal", () => {
  beforeEach(() => {
    useCreateSkillMutationMock.mockReturnValue({ mutateAsync: mutateAsyncMock });
  });

  it("renders the trigger button", () => {
    render(<CreateSkillModal />);
    expect(screen.getByRole("button", { name: /Create skill/i })).toBeInTheDocument();
  });

  it("add button is disabled when name is empty", () => {
    render(<CreateSkillModal />);
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("enables add button after typing a name and calls mutateAsync", () => {
    render(<CreateSkillModal />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "TypeScript" } });
    const addBtn = screen.getByRole("button", { name: "Add" });
    expect(addBtn).not.toBeDisabled();
    fireEvent.click(addBtn);
    expect(mutateAsyncMock).toHaveBeenCalledWith(expect.objectContaining({ name: "TypeScript" }));
  });
});
