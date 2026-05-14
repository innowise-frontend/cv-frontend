import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { AddLanguageModal } from "./AddLanguageModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ userId: "u-1", isAdmin: false }),
}));

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useAddProfileLanguageMutation: () => ({ mutate: mutateMock }),
  useUserLanguagesQuery: () => ({ data: { languages: [] } }),
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
  Select: ({ label, onValueChange }: { label: string; onValueChange: (value: string) => void }) => (
    <button
      onClick={() => onValueChange(label.toLowerCase().includes("proficiency") ? "B2" : "English")}
    >
      {label}
    </button>
  ),
}));

describe("AddLanguageModal", () => {
  it("submits selected language and proficiency", () => {
    render(
      <AddLanguageModal
        userId="u-1"
        languageOptions={[{ label: "English", value: "English" }]}
        proficiencyOptions={[{ label: "B2", value: "B2" }]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    fireEvent.click(screen.getByRole("button", { name: "Proficiency" }));
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(mutateMock).toHaveBeenCalledWith({
      userId: "u-1",
      name: "English",
      proficiency: "B2",
    });
  });
});
