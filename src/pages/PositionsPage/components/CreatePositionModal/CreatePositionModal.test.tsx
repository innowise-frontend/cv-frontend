import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CreatePositionModal } from "./CreatePositionModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useCreatePositionMutation: () => ({ mutate: mutateMock }),
  usePositionsQuery: () => ({ data: { items: [] } }),
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

describe("CreatePositionModal", () => {
  it("disables submit button when input is empty", () => {
    render(<CreatePositionModal />);

    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("submits create position payload with trimmed name", () => {
    render(<CreatePositionModal />);

    fireEvent.change(screen.getByLabelText("Position"), {
      target: { value: "  Developer  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(mutateMock).toHaveBeenCalledWith({ name: "Developer" });
  });
});
