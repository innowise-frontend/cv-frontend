import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { DeleteCvModal } from "./DeleteCvModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useDeleteCvMutation: () => ({ mutate: mutateMock }),
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
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("DeleteCvModal", () => {
  it("submits cv id on confirm", () => {
    render(<DeleteCvModal cvId="cv-1" name="My CV" />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    expect(mutateMock).toHaveBeenCalledWith({ cvId: "cv-1" });
  });
});
