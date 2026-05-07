import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Proficiency } from "@services/graphql/__generated__/graphql";
import { LanguageProgressBar } from "./LanguageProgressBar";

const mutateMock = vi.hoisted(() => vi.fn());

vi.mock("@root/hooks", () => ({
  useAuth: () => ({ userId: "u-1" }),
}));

vi.mock("@root/components/shared/Modal/useModalContext", () => ({
  useModalContext: () => ({ closeModal: vi.fn() }),
}));

vi.mock("../../api", () => ({
  useUpdateProfileLanguageMutation: () => ({ mutate: mutateMock }),
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
  Select: ({ onValueChange }: { onValueChange: (value: string) => void }) => (
    <button onClick={() => onValueChange(Proficiency.C1)}>select</button>
  ),
  ProgressBar: ({ label }: { label: string }) => <div>{label}</div>,
}));

vi.mock("@root/lib", async () => {
  const actual = await vi.importActual<object>("@root/lib");

  return { ...actual, cn: (...classes: string[]) => classes.filter(Boolean).join(" ") };
});

describe("LanguageProgressBar", () => {
  it("calls onClick in delete mode", () => {
    const onClick = vi.fn();
    render(
      <LanguageProgressBar
        name="English"
        proficiency={Proficiency.B2}
        isDeleteMode
        chosen={false}
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("submits updated proficiency", () => {
    render(<LanguageProgressBar name="English" proficiency={Proficiency.B2} />);

    fireEvent.click(screen.getAllByRole("button", { name: "select" })[1]);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mutateMock).toHaveBeenCalledWith({
      userId: "u-1",
      name: "English",
      proficiency: Proficiency.C1,
    });
  });
});
