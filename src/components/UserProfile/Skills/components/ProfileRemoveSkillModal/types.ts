import { DeleteProfileSkillInput } from "@root/services/graphql/__generated__/graphql";

export type RemoveSkillModalProps = {
  userId: string;
  deletedSkills: DeleteProfileSkillInput;
  onChangeDeletedSkills: (value: DeleteProfileSkillInput) => void;
  onChangeMode: (mode: boolean) => void;
};
