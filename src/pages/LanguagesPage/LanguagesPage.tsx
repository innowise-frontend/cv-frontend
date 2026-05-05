import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useState } from "react";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import RemoveIcon from "@assets/icon/RemoveIcon.svg?react";
import { Button, Modal, Select, Breadcrumbs } from "@components/shared";
import { useAuth } from "@root/hooks";
import { getBreadcrumbsLink } from "@root/lib/getBreadcrumbsLink/getBreadCrumbsLink";
import { AddProfileLanguageInput, Proficiency } from "@services/graphql/__generated__/graphql";
import { getLanguages, addProfileLanguage } from "@services/languages";
import { getUserProfile } from "@services/users";
import { LanguageProgressBar } from "./components";
import { PROFICIENCY_ORDER } from "./const";

export const LanguagesPage = () => {
  const location = useLocation();
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const [selectedLanguage, setSelectedLanguage] = useState<AddProfileLanguageInput>({
    userId: userId,
    name: "",
    proficiency: "" as Proficiency,
  });

  const proficiencyOptions = PROFICIENCY_ORDER.map((proficiency) => ({
    label: proficiency,
    value: proficiency,
  }));

  const { data: userLanguagesData } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
  });

  const { data: languagesData } = useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages({ page: 1, limit: 10 }),
  });

  const { mutate } = useMutation({
    mutationFn: addProfileLanguage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  const languageOptions =
    languagesData?.items?.map((item) => ({
      label: item.name,
      value: item.name,
    })) ?? [];

  const resetSelectedLanguage = () => {
    setSelectedLanguage({ userId, name: "", proficiency: "" as Proficiency });
  };

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[getBreadcrumbsLink(location.pathname)]} className="pl-5" />
      <div className="mx-auto flex flex-col pt-8 px-6">
        <h2 className="text-left pb-4">Current languages</h2>
        <div className="grid grid-cols-3">
          {userLanguagesData?.languages.length === 0 ? (
            <div className="col-span-3">You don't have any languages yet</div>
          ) : (
            userLanguagesData?.languages.map((language) => (
              <LanguageProgressBar
                key={language.name}
                name={language.name}
                proficiency={language.proficiency}
              />
            ))
          )}
        </div>
        <div className="flex gap-8 justify-end pt-4">
          <Modal>
            <Modal.Trigger
              variant="ghost"
              className="uppercase text-gray-3 p-4 flex justify-between align-center"
            >
              <PlusIcon />
              Add language
            </Modal.Trigger>
            <Modal.Content onCancel={resetSelectedLanguage}>
              <Modal.Header onCancel={resetSelectedLanguage}>Add language</Modal.Header>
              <Modal.Body className="flex flex-col gap-4">
                <Select
                  list={languageOptions}
                  label="Language"
                  placeholder="Language"
                  value={selectedLanguage.name}
                  onValueChange={(value) =>
                    setSelectedLanguage({ ...selectedLanguage, name: value })
                  }
                  className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
                />
                <Select
                  list={proficiencyOptions}
                  label="Proficiency"
                  placeholder="Proficiency"
                  value={selectedLanguage.proficiency}
                  onValueChange={(value) =>
                    setSelectedLanguage({ ...selectedLanguage, proficiency: value as Proficiency })
                  }
                  className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
                />
              </Modal.Body>
              <Modal.Footer className="flex justify-end gap-4">
                <Modal.Close variant="outline" className="w-40" onClick={resetSelectedLanguage}>
                  Cancel
                </Modal.Close>
                <Modal.Close
                  variant="filled"
                  className="w-40"
                  disabled={!selectedLanguage.name || !selectedLanguage.proficiency}
                  onClick={() => mutate(selectedLanguage)}
                >
                  Add
                </Modal.Close>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Button
            variant="ghost"
            className="uppercase text-red p-4 flex justify-between align-center"
          >
            <RemoveIcon />
            Delete language
          </Button>
        </div>
      </div>
    </div>
  );
};
