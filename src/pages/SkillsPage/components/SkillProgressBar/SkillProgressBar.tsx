import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, ProgressBar, Select } from "@root/components/shared";
import { useModalContext } from "@root/components/shared/Modal/useModalContext";
import { cn } from "@root/lib";
import { Mastery } from "@services/graphql/__generated__/graphql";
import { SkillProgressBarProps, UpdateSkillDraft } from "./types";

export const SkillProgressBar = ({
  name,
  mastery,
  masteryOptions,
  disabled = false,
  chosen = false,
  isDeleteMode = false,
  onClick,
  onUpdate,
}: SkillProgressBarProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  const [draft, setDraft] = useState<UpdateSkillDraft>({ mastery });

  const reset = () => setDraft({ mastery });

  if (isDeleteMode) {
    return (
      <Button variant="ghost" className="capitalize" onClick={onClick} disabled={disabled}>
        <ProgressBar
          className={cn(
            "px-2 cursor-pointer transition-colors duration-150 hover:bg-gray-7 dark:hover:bg-gray-5",
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
      <Modal.Trigger className="capitalize" variant="ghost" disabled={disabled}>
        <ProgressBar
          className="px-2 cursor-pointer transition-colors duration-150 hover:bg-gray-7 dark:hover:bg-gray-5"
          key={name}
          label={name}
          mastery={mastery}
        />
      </Modal.Trigger>
      <Modal.Content onCancel={reset}>
        <Modal.Header>{t("page.skills.updateSkill")}</Modal.Header>
        <Modal.Body className="flex flex-col gap-9">
          <Select
            list={[{ label: name, value: name }]}
            label={t("page.skills.skill")}
            disabled={true}
            value={name}
            onValueChange={() => {}}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
          <Select
            list={masteryOptions}
            label={t("page.skills.mastery")}
            placeholder={t("page.skills.mastery")}
            value={draft.mastery}
            disablePortal
            onValueChange={(value) => setDraft({ mastery: value as Mastery })}
            className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40">
            {t("page.skills.cancel")}
          </Modal.Close>
          <Button
            variant="filled"
            className="w-40"
            disabled={disabled || draft.mastery === mastery}
            onClick={async () => {
              await onUpdate(draft);
              closeModal();
            }}
          >
            {t("page.skills.update")}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  );
};
