import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, beforeEach, expect, it, vi } from "vitest";
import { RemoveSkillModal } from "./RemoveSkillModal";

const useDeleteProfileSkillsMutationMock = vi.hoisted(() => vi.fn());
const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("../../api", () => ({
  useDeleteProfileSkillsMutation: (...args: unknown[]) =>
    useDeleteProfileSkillsMutationMock(...args),
}));

// Shared reference so Modal.Close can call Modal.Content's onCancel
const modalRef = { onCancel: undefined as (() => void) | undefined };

vi.mock("@components/shared", () => ({
  Modal: Object.assign(({ children }: { children: ReactNode }) => <div>{children}</div>, {
    Trigger: ({ children, disabled }: { children: ReactNode; disabled?: boolean }) => (
      <button disabled={disabled} data-testid="remove-trigger">
        {children}
      </button>
    ),
    Content: ({ children, onCancel }: { children: ReactNode; onCancel?: () => void }) => {
      modalRef.onCancel = onCancel;

      return <div>{children}</div>;
    },
    Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Close: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
      <button
        onClick={() => {
          onClick?.();
          modalRef.onCancel?.();
        }}
      >
        {children}
      </button>
    ),
  }),
}));

const baseProps = {
  userId: "u1",
  deletedSkills: { userId: "u1", name: [] as string[] },
  onChangeDeletedSkills: vi.fn(),
  onChangeMode: vi.fn(),
};

describe("RemoveSkillModal", () => {
  beforeEach(() => {
    useDeleteProfileSkillsMutationMock.mockReturnValue({ mutate: mutateMock });
    modalRef.onCancel = undefined;
    vi.clearAllMocks();
  });

  it("disables trigger when no skills are selected", () => {
    render(<RemoveSkillModal {...baseProps} />);
    expect(screen.getByTestId("remove-trigger")).toBeDisabled();
  });

  it("enables trigger when skills are selected", () => {
    render(<RemoveSkillModal {...baseProps} deletedSkills={{ userId: "u1", name: ["React"] }} />);
    expect(screen.getByTestId("remove-trigger")).not.toBeDisabled();
  });

  it("displays the selected skill count in the trigger", () => {
    render(
      <RemoveSkillModal {...baseProps} deletedSkills={{ userId: "u1", name: ["React", "Vue"] }} />,
    );
    expect(screen.getByTestId("remove-trigger")).toHaveTextContent("2");
  });

  it("calls mutate with deletedSkills on confirm", () => {
    const deletedSkills = { userId: "u1", name: ["React"] };
    render(<RemoveSkillModal {...baseProps} deletedSkills={deletedSkills} />);
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(mutateMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: ["React"] }),
      expect.any(Object),
    );
  });

  it("calls onChangeMode(false) when cancel is clicked", () => {
    const onChangeMode = vi.fn();
    render(<RemoveSkillModal {...baseProps} onChangeMode={onChangeMode} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onChangeMode).toHaveBeenCalledWith(false);
  });
});
