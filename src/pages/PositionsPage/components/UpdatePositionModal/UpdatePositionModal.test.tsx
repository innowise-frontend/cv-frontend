import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { UpdatePositionModal } from "./UpdatePositionModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useUpdatePositionMutation: () => ({ mutate: mutateMock }),
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
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (e: { target: { value: string } }) => void;
  }) => (
    <input
      aria-label={label}
      value={value}
      onChange={(e) => onChange({ target: { value: e.target.value } })}
    />
  ),
}));

const defaultProps = { positionId: "pos-1", name: "Developer" };

describe("UpdatePositionModal", () => {
  it("disables submit button when name is unchanged", () => {
    render(<UpdatePositionModal {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });

  it("disables submit button when name is cleared", () => {
    render(<UpdatePositionModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Position"), { target: { value: "" } });

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });

  it("submits updated position payload with trimmed name", () => {
    render(<UpdatePositionModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Position"), { target: { value: "  Lead  " } });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    expect(mutateMock).toHaveBeenCalledWith({ positionId: "pos-1", name: "Lead" });
  });
});
