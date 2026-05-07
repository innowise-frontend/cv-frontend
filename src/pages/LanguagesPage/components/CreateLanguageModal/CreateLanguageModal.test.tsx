import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CreateLanguageModal } from "./CreateLanguageModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useCreateLanguageMutation: () => ({ mutate: mutateMock }),
  useLanguagesQuery: () => ({ data: { items: [] } }),
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

describe("CreateLanguageModal", () => {
  it("submits create language payload", () => {
    render(<CreateLanguageModal />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "English" } });
    fireEvent.change(screen.getByLabelText("ISO"), { target: { value: "en" } });
    fireEvent.change(screen.getByLabelText("Native name"), {
      target: { value: "English" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(mutateMock).toHaveBeenCalledWith({
      name: "English",
      iso2: "en",
      native_name: "English",
    });
  });
});
