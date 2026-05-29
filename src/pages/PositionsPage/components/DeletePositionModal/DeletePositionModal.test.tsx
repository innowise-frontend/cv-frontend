import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { DeletePositionModal } from "./DeletePositionModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useDeletePositionMutation: () => ({ mutate: mutateMock }),
}));

vi.mock("@components/shared", () => ({
  Modal: {
    Trigger: ({ children }: { children: ReactNode }) => <button>{children}</button>,
    Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Close: ({ children }: { children: ReactNode }) => <button>{children}</button>,
  },
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("DeletePositionModal", () => {
  it("renders confirmation message with position name", () => {
    render(<DeletePositionModal id="pos-1" name="Developer" />);

    expect(
      screen.getByText(/Are you sure you want to delete position Developer/i),
    ).toBeInTheDocument();
  });

  it("submits position id on confirm", () => {
    render(<DeletePositionModal id="pos-1" name="Developer" />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(mutateMock).toHaveBeenCalledWith({ positionId: "pos-1" });
  });
});
