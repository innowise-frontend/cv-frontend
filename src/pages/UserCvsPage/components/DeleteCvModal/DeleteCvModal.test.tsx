import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteCvModal } from "./DeleteCvModal";

const mutateMock = vi.hoisted(() => vi.fn());
const useDeleteCvMutationMock = vi.hoisted(() => vi.fn());

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useDeleteCvMutation: (...args: unknown[]) => useDeleteCvMutationMock(...args),
}));

vi.mock("@root/components/shared", () => ({
  Modal: {
    Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
    Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Close: ({ children }: { children: ReactNode }) => <button>{children}</button>,
  },
  Button: ({
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
}));

describe("DeleteCvModal", () => {
  beforeEach(() => {
    mutateMock.mockClear();
    useDeleteCvMutationMock.mockReturnValue({ mutate: mutateMock, isPending: false });
  });

  it("submits cv id on confirm", () => {
    render(<DeleteCvModal cvId="cv-1" name="My CV" />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(mutateMock).toHaveBeenCalledWith({ cvId: "cv-1" });
  });

  it("enables confirm button when delete is not pending", () => {
    render(<DeleteCvModal cvId="cv-1" name="My CV" />);

    expect(screen.getByRole("button", { name: "Confirm" })).not.toBeDisabled();
  });

  it("disables confirm button while delete is pending", () => {
    useDeleteCvMutationMock.mockReturnValue({ mutate: mutateMock, isPending: true });

    render(<DeleteCvModal cvId="cv-1" name="My CV" />);

    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("does not submit when confirm button is disabled", () => {
    useDeleteCvMutationMock.mockReturnValue({ mutate: mutateMock, isPending: true });

    render(<DeleteCvModal cvId="cv-1" name="My CV" />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(mutateMock).not.toHaveBeenCalled();
  });
});
