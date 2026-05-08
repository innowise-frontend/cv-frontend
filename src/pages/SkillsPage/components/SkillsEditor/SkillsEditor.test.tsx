import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { SkillsEditor } from "./SkillsEditor";

vi.mock("../../api", () => ({
  getMasteryOptions: () => [{ label: "Novice", value: "Novice" }],
  useUserSkillsQuery: () => ({
    data: {
      skills: [{ name: "TypeScript", mastery: Mastery.Novice, categoryId: null }],
    },
  }),
  useSkillsSelectQuery: () => ({ data: { items: [{ name: "TypeScript" }] } }),
  useSkillCategoriesQuery: () => ({ data: undefined }),
}));

vi.mock("../AddSkillModal/AddSkillModal", () => ({
  AddSkillModal: () => <div>add-modal</div>,
}));

vi.mock("../RemoveSkillModal/RemoveSkillModal", () => ({
  RemoveSkillModal: () => <div>remove-modal</div>,
}));

vi.mock("../SkillProgressBar/SkillProgressBar", () => ({
  SkillProgressBar: ({ name, onClick }: { name: string; onClick?: () => void }) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("SkillsEditor", () => {
  it("renders user's skills and the add affordance by default", () => {
    render(<SkillsEditor userId="u-1" />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("add-modal")).toBeInTheDocument();
    expect(screen.queryByText("remove-modal")).not.toBeInTheDocument();
  });

  it("switches to delete mode and shows the remove modal", () => {
    render(<SkillsEditor userId="u-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Remove skills" }));

    expect(screen.getByText("remove-modal")).toBeInTheDocument();
    expect(screen.queryByText("add-modal")).not.toBeInTheDocument();
  });

  it("returns from delete mode to default view via cancel", () => {
    render(<SkillsEditor userId="u-1" />);

    fireEvent.click(screen.getByRole("button", { name: "Remove skills" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("add-modal")).toBeInTheDocument();
    expect(screen.queryByText("remove-modal")).not.toBeInTheDocument();
  });
});
