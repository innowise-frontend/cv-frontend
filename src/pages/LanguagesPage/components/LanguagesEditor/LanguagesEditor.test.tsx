import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Proficiency } from "@services/graphql/__generated__/graphql";
import { LanguagesEditor } from "./LanguagesEditor";

vi.mock("../../api", () => ({
  getProficiencyOptions: () => [{ label: "B2", value: "B2" }],
  useUserLanguagesQuery: () => ({
    data: { languages: [{ name: "English", proficiency: Proficiency.B2 }] },
  }),
  useLanguagesQuery: () => ({ data: { items: [{ name: "English" }] } }),
}));

vi.mock("../AddLanguageModal/AddLanguageModal", () => ({
  AddLanguageModal: () => <div>add-modal</div>,
}));

vi.mock("../RemoveLanguageModal/RemoveLanguageModal", () => ({
  RemoveLanguageModal: () => <div>remove-modal</div>,
}));

vi.mock("../LanguageProgressBar/LanguageProgressBar", () => ({
  LanguageProgressBar: ({ name, onClick }: { name: string; onClick?: () => void }) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("LanguagesEditor", () => {
  it("renders user's languages and the add affordance by default", () => {
    render(<LanguagesEditor userId="u-1" />);

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("add-modal")).toBeInTheDocument();
    expect(screen.queryByText("remove-modal")).not.toBeInTheDocument();
  });

  it("switches to delete mode and shows the remove modal", () => {
    render(<LanguagesEditor userId="u-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete language" }));

    expect(screen.getByText("remove-modal")).toBeInTheDocument();
    expect(screen.queryByText("add-modal")).not.toBeInTheDocument();
  });

  it("returns from delete mode to default view via cancel", () => {
    render(<LanguagesEditor userId="u-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Delete language" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("add-modal")).toBeInTheDocument();
    expect(screen.queryByText("remove-modal")).not.toBeInTheDocument();
  });
});
