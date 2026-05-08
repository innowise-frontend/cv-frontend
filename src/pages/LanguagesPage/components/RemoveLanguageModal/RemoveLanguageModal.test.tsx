import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { RemoveLanguageModal } from "./RemoveLanguageModal";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ userId: "u-1" }),
}));

vi.mock("../../api", () => ({
  useDeleteProfileLanguagesMutation: () => ({ mutate: mutateMock }),
}));

vi.mock("@components/shared", () => ({
  Modal: Object.assign(({ children }: { children: ReactNode }) => <div>{children}</div>, {
    Trigger: ({ children, disabled }: { children: ReactNode; disabled?: boolean }) => (
      <button disabled={disabled}>{children}</button>
    ),
    Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Header: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    Body: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Footer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Close: ({ children }: { children: ReactNode }) => <button>{children}</button>,
  }),
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("RemoveLanguageModal", () => {
  it("submits deleted languages", () => {
    render(
      <RemoveLanguageModal
        userId="u-1"
        deletedLanguages={{ userId: "u-1", name: ["English"] }}
        onChangeDeletedLanguages={vi.fn()}
        onChangeMode={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(mutateMock).toHaveBeenCalledWith(
      { userId: "u-1", name: ["English"] },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });

  it("closes delete mode and clears selection on successful removal", () => {
    const onChangeDeletedLanguages = vi.fn();
    const onChangeMode = vi.fn();

    render(
      <RemoveLanguageModal
        userId="u-1"
        deletedLanguages={{ userId: "u-1", name: ["English"] }}
        onChangeDeletedLanguages={onChangeDeletedLanguages}
        onChangeMode={onChangeMode}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    const [, options] = mutateMock.mock.calls.at(-1) ?? [];
    options?.onSuccess?.();

    expect(onChangeMode).toHaveBeenCalledWith(false);
    expect(onChangeDeletedLanguages).toHaveBeenCalledWith({ userId: "u-1", name: [] });
  });
});
