import { fireEvent, render, screen } from "@testing-library/react";
import { type ComponentProps, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { SkillsEditor } from "./SkillsEditor";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Spinner: () => <div data-testid="spinner" />,
}));

const skills = [{ name: "TypeScript", mastery: Mastery.Novice, categoryId: null }];

const defaultToolbar = ({
  isDeleteMode,
  onEnableDeleteMode,
  onCancelDeleteMode,
}: {
  isDeleteMode: boolean;
  onEnableDeleteMode: () => void;
  onCancelDeleteMode: () => void;
}) =>
  isDeleteMode ? (
    <button onClick={onCancelDeleteMode}>cancel</button>
  ) : (
    <button onClick={onEnableDeleteMode}>remove</button>
  );

const renderEditor = (props: Partial<ComponentProps<typeof SkillsEditor>> = {}) =>
  render(
    <SkillsEditor
      skills={skills}
      categories={undefined}
      uncategorizedLabel="Other"
      renderSkillBar={(skill) => <span>{skill.name}</span>}
      renderToolbar={defaultToolbar}
      {...props}
    />,
  );

describe("SkillsEditor", () => {
  it("shows spinner while skills are loading", () => {
    renderEditor({ skills: undefined, isLoading: true });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("page.table.noDataResults")).not.toBeInTheDocument();
  });

  it("shows empty state only after loading when there are no skills", () => {
    renderEditor({ skills: [], isLoading: false });

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(screen.getByText("page.table.noDataResults")).toBeInTheDocument();
  });

  it("renders grouped skills and toolbar from render props", () => {
    renderEditor();

    expect(screen.getByText("Other")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "remove" })).toBeInTheDocument();
  });

  it("switches toolbar when delete mode is enabled", () => {
    renderEditor();

    fireEvent.click(screen.getByRole("button", { name: "remove" }));

    expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "remove" })).not.toBeInTheDocument();
  });
});
