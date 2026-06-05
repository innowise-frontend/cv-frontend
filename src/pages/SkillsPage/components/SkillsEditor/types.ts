import { ReactNode } from "react";
import { SkillCategory, SkillMastery } from "@services/graphql/__generated__/graphql";

export type SkillsEditorDeleteContext = {
  isDeleteMode: boolean;
  chosen: boolean;
  onClick: () => void;
};

export type SkillsEditorToolbarContext = {
  isDeleteMode: boolean;
  deletedSkillNames: string[];
  onCancelDeleteMode: () => void;
  onEnableDeleteMode: () => void;
  onToggleDeletedSkill: (skillName: string) => void;
  onChangeDeletedSkillNames: (names: string[]) => void;
};

export type SkillsEditorProps = {
  skills: readonly SkillMastery[] | null | undefined;
  categories: SkillCategory[] | null | undefined;
  uncategorizedLabel: string;
  renderSkillBar: (skill: SkillMastery, deleteContext: SkillsEditorDeleteContext) => ReactNode;
  renderToolbar: (context: SkillsEditorToolbarContext) => ReactNode;
};
