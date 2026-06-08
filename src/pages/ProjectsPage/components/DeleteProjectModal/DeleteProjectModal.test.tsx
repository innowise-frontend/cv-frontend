import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { DeleteProjectModal } from "./DeleteProjectModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useDeleteProjectMutation: () => ({ mutate: mutateMock, isPending: false }),
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

describe("DeleteProjectModal", () => {
  it("renders confirmation message with project name", () => {
    render(<DeleteProjectModal projectId="proj-1" name="CV App" />);

    expect(screen.getByText(/Are you sure you want to delete project CV App/i)).toBeInTheDocument();
  });

  it("submits project id on confirm", () => {
    render(<DeleteProjectModal projectId="proj-1" name="CV App" />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(mutateMock).toHaveBeenCalledWith({ projectId: "proj-1" });
  });
});
