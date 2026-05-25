import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button, Modal } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { DeleteUserModalProps } from "./types";
import { useDeleteUserApi } from "../../api";

export const DeleteUserModal = ({ userId, firstName, lastName }: DeleteUserModalProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();
  const { handleSubmit } = useForm();
  const { mutate } = useDeleteUserApi({
    onSuccess: () => {
      closeModal();
      toast.success(t("page.users.deleteUserSuccess"));
    },
  });

  const username = `${firstName} ${lastName}`;

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.users.deleteUser")}
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>{t("page.users.deleteUserTitle")}</Modal.Header>
        <form onSubmit={handleSubmit(() => mutate(userId))}>
          <Modal.Body>
            <span>{t("page.users.confirmDeleteBefore")}</span>
            <span className="font-bold">{username} </span>
            <span>{t("page.users.confirmDeleteAfter")}</span>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close variant="outline" className="w-40">
              {t("page.users.cancel")}
            </Modal.Close>
            <Button variant="filled" className="w-40" type="submit">
              {t("page.users.confirm")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
