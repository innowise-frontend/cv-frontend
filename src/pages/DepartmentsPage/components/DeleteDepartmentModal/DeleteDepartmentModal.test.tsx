import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { DeleteDepartmentModal } from "./DeleteDepartmentModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useDeleteDepartmentMutation: () => ({ mutate: mutateMock }),
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

describe("DeleteDepartmentModal", () => {
  it("renders confirmation message with department name", () => {
    render(<DeleteDepartmentModal departmentId="dept-1" name="React" />);

    expect(
      screen.getByText(/Are you sure you want to delete department React/i),
    ).toBeInTheDocument();
  });

  it("submits department id on confirm", () => {
    render(<DeleteDepartmentModal departmentId="dept-1" name="React" />);

    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(mutateMock).toHaveBeenCalledWith({ departmentId: "dept-1" });
  });
});
