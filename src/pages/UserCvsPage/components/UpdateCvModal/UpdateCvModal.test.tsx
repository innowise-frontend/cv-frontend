import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { forwardRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { UpdateCvModal } from "./UpdateCvModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useUpdateCvMutation: () => ({ mutate: mutateMock }),
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
    type,
  }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "submit" | "button";
  }) => (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Input: forwardRef<
    HTMLInputElement,
    {
      label: string;
      name?: string;
      onChange?: (e: { target: { value: string } }) => void;
      onBlur?: () => void;
    }
  >(({ label, ...props }, ref) => <input aria-label={label} ref={ref} {...props} />),
  Textarea: forwardRef<
    HTMLTextAreaElement,
    {
      label: string;
      name?: string;
      onChange?: (e: { target: { value: string } }) => void;
      onBlur?: () => void;
    }
  >(({ label, ...props }, ref) => <textarea aria-label={label} ref={ref} {...props} />),
}));

describe("UpdateCvModal", () => {
  it("submits updated cv payload", async () => {
    render(
      <UpdateCvModal
        cvId="cv-1"
        name="Old name"
        education="Old school"
        description="Old description"
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "New name" } });
    fireEvent.change(screen.getByLabelText("Education"), {
      target: { value: "New school" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New description" },
    });

    const form = document.querySelector("form");

    expect(form).not.toBeNull();

    await waitFor(() => expect(screen.getByRole("button", { name: "Update" })).not.toBeDisabled());

    fireEvent.submit(form!);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        cvId: "cv-1",
        name: "New name",
        education: "New school",
        description: "New description",
      }),
    );
  });
});
