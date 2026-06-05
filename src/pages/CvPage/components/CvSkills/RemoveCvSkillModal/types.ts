import { DeleteCvSkillInput } from "@services/graphql/__generated__/graphql";

export type RemoveCvSkillModalProps = {
  cvId: string;
  deletedSkills: DeleteCvSkillInput;
  onChangeDeletedSkills: (value: DeleteCvSkillInput) => void;
  onChangeMode: (mode: boolean) => void;
};
