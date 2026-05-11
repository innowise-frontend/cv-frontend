import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, ProgressBar, Select } from "@root/components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { cn } from "@root/lib";
import { Mastery, UpdateProfileSkillInput } from "@services/graphql/__generated__/graphql";
import { SkillProgressBarProps } from "./types";
import { getMasteryOptions, useUpdateProfileSkillMutation } from "../../api";
import { MASTERY_ORDER } from "../../const";

export const SkillProgressBar = ({
  userId,
  name,
  mastery,
  categoryId,
  chosen = false,
  isDeleteMode = false,
  onClick,
}: SkillProgressBarProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [updateSkill, setUpdateSkill] = useState<UpdateProfileSkillInput>({
    userId,
    name,
    mastery,
    categoryId,
  });

  const masteryOptions = getMasteryOptions(MASTERY_ORDER);

  const { mutateAsync } = useUpdateProfileSkillMutation(userId, {
    onSuccess: () => {
      closeModal();
    },
  });

  const resetUpdateSkill = () => {
    setUpdateSkill({ userId, name: name, mastery: mastery, categoryId: categoryId });
  };

  if (isDeleteMode) {
    return (
      <Button variant="ghost" className="capitalize" onClick={onClick}>
        <ProgressBar
          className={cn(
            "px-2 cursor-pointer transition-colors duration-150 hover:bg-gray-7 dark:hover:bg-gray5",
            chosen && "*:text-gray *:dark:text-gray-8",
          )}
          key={name}
          label={name}
          mastery={mastery}
          chosen={chosen}
        />
      </Button>
    );
  }

  return (
    <>
      <Modal.Trigger className="capitalize" variant="ghost">
        <ProgressBar
          className="px-2 cursor-pointer transition-colors duration-150 hover:bg-gray-7"
          key={name}
          label={name}
          mastery={mastery}
        />
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdateSkill}>
        <Modal.Header>{t("page.skills.updateSkill")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Select
            list={[{ label: name, value: name }]}
            label={t("page.skills.skill")}
            disabled={true}
            value={name}
            onValueChange={(value) => setUpdateSkill({ ...updateSkill, name: value })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
          <Select
            list={masteryOptions}
            label={t("page.skills.mastery")}
            placeholder={t("page.skills.mastery")}
            value={updateSkill.mastery}
            disablePortal
            onValueChange={(value) => setUpdateSkill({ ...updateSkill, mastery: value as Mastery })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40" onClick={resetUpdateSkill}>
            {t("page.skills.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={updateSkill.mastery === mastery || !userId}
            onClick={() => {
              mutateAsync({ ...updateSkill, userId });
            }}
          >
            {t("page.skills.update")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
