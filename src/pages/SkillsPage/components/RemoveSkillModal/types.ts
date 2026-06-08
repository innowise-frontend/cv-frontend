export type RemoveSkillModalProps = {
  selectedNames: string[];
  disabled?: boolean;
  onRemove: () => Promise<unknown> | unknown;
  onCancel: () => void;
};
