import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { UpdateLanguageModal } from "./UpdateLanguageModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useUpdateLanguageMutation: () => ({ mutate: mutateMock }),
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

describe("UpdateLanguageModal", () => {
  it("submits updated language payload", () => {
    render(<UpdateLanguageModal languageId="1" name="English" iso2="en" nativeName="English" />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "German" } });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    expect(mutateMock).toHaveBeenCalledWith({
      languageId: "1",
      name: "German",
      iso2: "en",
      native_name: "English",
    });
  });
});
