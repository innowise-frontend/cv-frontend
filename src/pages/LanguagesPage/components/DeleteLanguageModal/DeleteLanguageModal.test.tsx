import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { DeleteLanguageModal } from "./DeleteLanguageModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useDeleteLanguageMutation: () => ({ mutate: mutateMock }),
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

describe("DeleteLanguageModal", () => {
  it("submits language id", () => {
    render(<DeleteLanguageModal id="lang-1" name="English" />);

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(mutateMock).toHaveBeenCalledWith({ languageId: "lang-1" });
  });
});
