import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Modal, Select } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { UpdateSkillModalProps } from "./types";
import { useSkillCategoriesQuery, useUpdateSkillMutation } from "../../api";
import { buildCategoryNameById } from "../../const";

export const UpdateSkillModal = ({ name, categoryId, skillId }: UpdateSkillModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [updatedSkill, setUpdatedSkill] = useState({
    name,
    categoryId: categoryId ?? "",
    skillId,
  });

  const { data: categoriesData } = useSkillCategoriesQuery();

  const categoryOptions = useMemo(() => {
    const map = buildCategoryNameById(categoriesData);

    return Array.from(map, ([id, label]) => ({ value: id, label }));
  }, [categoriesData]);

  const { mutateAsync } = useUpdateSkillMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const resetUpdatedSkill = () => {
    setUpdatedSkill({ name, categoryId: categoryId ?? "", skillId });
  };

  const isPristine = updatedSkill.name === name && updatedSkill.categoryId === (categoryId ?? "");

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.skills.edit")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.skills.updateSkill")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Input
            placeholder={t("page.skills.name")}
            label={t("page.skills.name")}
            type="text"
            value={updatedSkill.name}
            onChange={(e) => setUpdatedSkill({ ...updatedSkill, name: e.target.value })}
          />
          <Select
            list={categoryOptions}
            label={t("page.skills.category")}
            placeholder={t("page.skills.category")}
            value={updatedSkill.categoryId}
            onValueChange={(value) => setUpdatedSkill({ ...updatedSkill, categoryId: value })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40" onClick={resetUpdatedSkill}>
            {t("page.skills.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={isPristine || !updatedSkill.name}
            onClick={() => {
              mutateAsync({
                name: updatedSkill.name,
                skillId: updatedSkill.skillId,
                categoryId: updatedSkill.categoryId || undefined,
              });
            }}
          >
            {t("page.skills.update")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
