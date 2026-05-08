import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Modal, Select } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { useAuth } from "@root/hooks";
import { AddProfileSkillInput, Mastery } from "@services/graphql/__generated__/graphql";
import { AddSkillModalProps } from "./types";
import { useAddProfileSkillMutation } from "../../api";

export const AddSkillModal = ({ skills, masteryOptions }: AddSkillModalProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const [selectedSkill, setSelectedSkill] = useState<AddProfileSkillInput>({
    userId: userId,
    name: "",
    mastery: "" as Mastery,
  });

  const { closeModal } = useModalContext();

  const skillOptions = useMemo(
    () =>
      skills?.map((skill) => ({
        label: skill.name,
        value: skill.name,
        categoryId: skill.category?.id ?? null,
      })) ?? [],
    [skills],
  );

  const resetSelectedSkill = () => {
    setSelectedSkill({ userId, name: "", mastery: "" as Mastery });
  };

  const { mutateAsync } = useAddProfileSkillMutation(userId, {
    onSuccess: () => {
      closeModal();
    },
  });

  const handleSelectSkill = (value: string) => {
    const matched = skillOptions.find((item) => item.value === value);

    setSelectedSkill({
      ...selectedSkill,
      name: value,
      categoryId: matched?.categoryId ?? null,
    });
  };

  const handleAddSkill = () => {
    mutateAsync({ ...selectedSkill, userId });
  };

  return (
    <>
      <Modal.Trigger
        variant="ghost"
        className="w-40 uppercase text-gray-3 p-4 flex items-center justify-center gap-2"
      >
        <PlusIcon />
        {t("page.skills.addSkill")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetSelectedSkill}>
        <Modal.Header>{t("page.skills.addSkill")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Select
            list={skillOptions}
            label={t("page.skills.skill")}
            placeholder={t("page.skills.skill")}
            value={selectedSkill.name}
            onValueChange={handleSelectSkill}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
          <Select
            list={masteryOptions}
            label={t("page.skills.mastery")}
            placeholder={t("page.skills.mastery")}
            value={selectedSkill.mastery}
            onValueChange={(value) =>
              setSelectedSkill({
                ...selectedSkill,
                mastery: value as Mastery,
              })
            }
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40" onClick={resetSelectedSkill}>
            {t("page.skills.cancel")}
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={!selectedSkill.name || !selectedSkill.mastery || !userId}
            onClick={handleAddSkill}
          >
            {t("page.skills.add")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
