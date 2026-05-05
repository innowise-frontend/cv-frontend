import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Modal, ProgressBar, Select } from "@components/shared";
import { useAuth } from "@root/hooks";
import { Proficiency, UpdateProfileLanguageInput } from "@services/graphql/__generated__/graphql";
import { updateProfileLanguage } from "@services/languages/updateProfileLanguage/updateProfileLanguage";
import { LanguageProps } from "./types";
import { PROFICIENCY_ORDER } from "../../const";

export const LanguageProgressBar = (language: LanguageProps) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const [updateLanguage, setUpdateLanguage] = useState<UpdateProfileLanguageInput>({
    userId: userId,
    name: language.name,
    proficiency: language.proficiency,
  });

  const proficiencyOptions = PROFICIENCY_ORDER.map((proficiency) => ({
    label: proficiency,
    value: proficiency,
  }));

  const { mutate } = useMutation({
    mutationFn: updateProfileLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const resetUpdateLanguage = () => {
    setUpdateLanguage({ userId, name: language.name, proficiency: language.proficiency });
  };

  return (
    <Modal>
      <Modal.Trigger className="lowercase">
        <ProgressBar
          className="px-2 hover:bg-gray-7 cursor-pointer transition-colors duration-150"
          key={language.name}
          label={language.name || ""}
          proficiency={language.proficiency as Proficiency}
        />
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdateLanguage}>
        <Modal.Header onCancel={resetUpdateLanguage}>Update language</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <Select
            list={[{ label: language.name, value: language.name }]}
            label="Language"
            disabled={true}
            value={language.name}
            onValueChange={(value) => setUpdateLanguage({ ...updateLanguage, name: value })}
          />
          <Select
            list={proficiencyOptions}
            label="Proficiency"
            value={updateLanguage.proficiency}
            onValueChange={(value) =>
              setUpdateLanguage({ ...updateLanguage, proficiency: value as Proficiency })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close variant="outline" className="w-40" onClick={resetUpdateLanguage}>
            Cancel
          </Modal.Close>
          <Modal.Close
            variant="filled"
            className="w-40"
            disabled={updateLanguage.proficiency === language.proficiency}
            onClick={() => mutate(updateLanguage)}
          >
            Save
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
