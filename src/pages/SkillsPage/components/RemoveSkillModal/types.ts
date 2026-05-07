import { DeleteProfileSkillInput } from "@root/services/graphql/__generated__/graphql";

export interface RemoveSkillModalProps {
  deletedSkills: DeleteProfileSkillInput;
  onChangeDeletedSkills: (value: DeleteProfileSkillInput) => void;
  onChangeMode: (mode: boolean) => void;
}
