import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Input, Modal, Select } from "@components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { useCreateSkillMutation, useSkillCategoriesQuery } from "../../api";
import { buildCategoryNameById } from "../../const";

export const CreateSkillModal = () => {
  const { t } = useTranslation();
  const [createdSkill, setCreatedSkill] = useState({
    name: "",
    categoryId: "",
  });

  const { closeModal } = useModalContext();
  const { data: categoriesData } = useSkillCategoriesQuery();
  console.log(categoriesData);

  const categoryOptions = useMemo(() => {
    const map = buildCategoryNameById(categoriesData);

    return Array.from(map, ([id, name]) => ({ value: id, label: name }));
  }, [categoriesData]);

  const resetCreatedSkill = () => {
    setCreatedSkill({ name: "", categoryId: "" });
  };

  const { mutateAsync } = useCreateSkillMutation({
    onSuccess: () => {
      closeModal();
      resetCreatedSkill();
    },
  });

  return (
    <>
      <Modal.Trigger className="text-red font-medium">
        <PlusIcon height={16} width={16} />
        {t("page.skills.createSkill")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetCreatedSkill}>
        <Modal.Header>{t("page.skills.createSkill")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Input
            placeholder={t("page.skills.name")}
            label={t("page.skills.name")}
            value={createdSkill.name}
            onChange={(e) => setCreatedSkill({ ...createdSkill, name: e.target.value })}
          />
          <Select
            list={categoryOptions}
            label={t("page.skills.category")}
            placeholder={t("page.skills.category")}
            value={createdSkill.categoryId}
            onValueChange={(value) => setCreatedSkill({ ...createdSkill, categoryId: value })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40" onClick={resetCreatedSkill}>
            {t("page.skills.cancel")}
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={!createdSkill.name}
            onClick={() => {
              mutateAsync({
                name: createdSkill.name,
                categoryId: createdSkill.categoryId || undefined,
              });
            }}
          >
            {t("page.skills.add")}
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
