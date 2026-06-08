import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CreateDepartmentModal } from "./CreateDepartmentModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useCreateDepartmentMutation: () => ({ mutate: mutateMock }),
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

describe("CreateDepartmentModal", () => {
  it("disables submit button when input is empty", () => {
    render(<CreateDepartmentModal />);

    const button = screen.getByRole("button", { name: "CREATE" });
    expect(button).toBeDisabled();
  });

  it("submits create department payload with trimmed name", () => {
    render(<CreateDepartmentModal />);

    fireEvent.change(screen.getByLabelText("Department"), {
      target: { value: "  React  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "CREATE" }));

    expect(mutateMock).toHaveBeenCalledWith({ name: "React" });
  });
});
