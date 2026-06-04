import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Modal, Select } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { AddSkillDraft, AddSkillModalProps } from "./types";

export const AddSkillModal = ({
  skills,
  addedSkillNames = [],
  masteryOptions,
  disabled = false,
  onAdd,
}: AddSkillModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [draft, setDraft] = useState<AddSkillDraft>({
    name: "",
    mastery: "",
    categoryId: null,
  });

  const addedSkillNameSet = useMemo(() => new Set(addedSkillNames), [addedSkillNames]);

  const skillOptions = useMemo(
    () =>
      skills
        ?.filter((skill) => !addedSkillNameSet.has(skill.name))
        .map((skill) => ({
          label: skill.name,
          value: skill.name,
          categoryId: skill.category?.id ?? null,
        })) ?? [],
    [skills, addedSkillNameSet],
  );

  const isAddDisabled = disabled || skillOptions.length === 0;

  const reset = () => {
    setDraft({ name: "", mastery: "", categoryId: null });
  };

  const handleSelectSkill = (value: string) => {
    const matched = skillOptions.find((item) => item.value === value);

    setDraft((prev) => ({
      ...prev,
      name: value,
      categoryId: matched?.categoryId ?? null,
    }));
  };

  const handleAdd = async () => {
    await onAdd(draft);
    closeModal();
  };

  return (
    <>
      <Modal.Trigger
        variant="ghost"
        className="w-40 uppercase text-gray-3 p-4 flex items-center justify-center gap-2 dark:hover:text-gray-2"
        disabled={isAddDisabled}
      >
        <PlusIcon />
        {t("page.skills.addSkill")}
      </Modal.Trigger>
      <Modal.Content onCancel={reset}>
        <Modal.Header>{t("page.skills.addSkill")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-9">
          <Select
            list={skillOptions}
            label={t("page.skills.skill")}
            placeholder={t("page.skills.skill")}
            value={draft.name}
            onValueChange={handleSelectSkill}
          />
          <Select
            list={masteryOptions}
            label={t("page.skills.mastery")}
            placeholder={t("page.skills.mastery")}
            value={draft.mastery}
            onValueChange={(value) =>
              setDraft((prev) => ({
                ...prev,
                mastery: value as Mastery,
              }))
            }
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-4">
          <Modal.Close variant="outline" className="w-40">
            {t("page.skills.cancel")}
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={isAddDisabled || !draft.name || !draft.mastery}
            onClick={handleAdd}
          >
            {t("page.skills.add")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
