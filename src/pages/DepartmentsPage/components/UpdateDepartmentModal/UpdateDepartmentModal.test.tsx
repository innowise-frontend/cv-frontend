import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { UpdateDepartmentModal } from "./UpdateDepartmentModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useUpdateDepartmentMutation: () => ({ mutate: mutateMock }),
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

const defaultProps = { departmentId: "dept-1", name: "React" };

describe("UpdateDepartmentModal", () => {
  it("disables submit button when name is unchanged", () => {
    render(<UpdateDepartmentModal {...defaultProps} />);

    const button = screen.getByRole("button", { name: /update/i });
    expect(button).toBeDisabled();
  });

  it("disables submit button when name is cleared", () => {
    render(<UpdateDepartmentModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Department"), { target: { value: "" } });

    expect(screen.getByRole("button", { name: /update/i })).toBeDisabled();
  });

  it("submits updated department payload with trimmed name", () => {
    render(<UpdateDepartmentModal {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Department"), { target: { value: "  Node  " } });
    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    expect(mutateMock).toHaveBeenCalledWith({ departmentId: "dept-1", name: "Node" });
  });
});
