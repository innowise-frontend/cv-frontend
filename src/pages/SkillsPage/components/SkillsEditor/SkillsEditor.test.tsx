import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { SkillsEditor } from "./SkillsEditor";

vi.mock("@components/shared", () => ({
  Modal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

const skills = [{ name: "TypeScript", mastery: Mastery.Novice, categoryId: null }];

describe("SkillsEditor", () => {
  it("renders skills and toolbar from render props", () => {
    render(
      <SkillsEditor
        skills={skills}
        categories={undefined}
        uncategorizedLabel="Other"
        renderSkillBar={(skill) => <span>{skill.name}</span>}
        renderToolbar={({ isDeleteMode, onEnableDeleteMode }) =>
          isDeleteMode ? (
            <div>delete-toolbar</div>
          ) : (
            <button onClick={onEnableDeleteMode}>remove</button>
          )
        }
      />,
    );

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "remove" })).toBeInTheDocument();
  });

  it("switches toolbar when delete mode is enabled", () => {
    render(
      <SkillsEditor
        skills={skills}
        categories={undefined}
        uncategorizedLabel="Other"
        renderSkillBar={(skill) => <span>{skill.name}</span>}
        renderToolbar={({ isDeleteMode, onEnableDeleteMode, onCancelDeleteMode }) =>
          isDeleteMode ? (
            <button onClick={onCancelDeleteMode}>cancel</button>
          ) : (
            <button onClick={onEnableDeleteMode}>remove</button>
          )
        }
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "remove" }));
    expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
  });
});
