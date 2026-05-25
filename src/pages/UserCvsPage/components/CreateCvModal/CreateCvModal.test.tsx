import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { forwardRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CreateCvModal } from "./CreateCvModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ userId: "user-1" }),
}));

vi.mock("../../api", () => ({
  useCreateCvMutation: () => ({ mutate: mutateMock }),
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
    disabled,
    type,
  }: {
    children: ReactNode;
    disabled?: boolean;
    type?: "submit" | "button";
  }) => (
    <button type={type} disabled={disabled}>
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

describe("CreateCvModal", () => {
  it("submits create cv payload with current user id", async () => {
    render(<CreateCvModal />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "My CV" } });
    fireEvent.change(screen.getByLabelText("Education"), { target: { value: "MIT" } });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Description" },
    });

    const form = document.querySelector("form");

    expect(form).not.toBeNull();

    await waitFor(() => expect(screen.getByRole("button", { name: "Create" })).not.toBeDisabled());

    fireEvent.submit(form!);

    await waitFor(() =>
      expect(mutateMock).toHaveBeenCalledWith({
        name: "My CV",
        education: "MIT",
        description: "Description",
        userId: "user-1",
      }),
    );
  });
});
