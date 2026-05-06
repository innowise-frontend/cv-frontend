import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input, Modal, Select } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useAuth } from "@root/hooks";
import { UpdateUserModalProps } from "./types";
import { useGetDepartmentsApi, useGetPositionsApi, useUpdateUserApi } from "../../api";

export const UpdateUserModal = ({
  userId,
  email,
  firstName,
  lastName,
  departmentId,
  positionId,
  role,
}: UpdateUserModalProps) => {
  const { t } = useTranslation();
  const [updatedUser, setUpdatedUser] = useState({
    userId,
    profile: {
      firstName,
      lastName,
    },
    cvsIds: [],
    departmentId,
    positionId,
    role,
  });
  const { isAdmin } = useAuth();
  const { handleSubmit } = useForm();
  const { closeModal } = useModalContext();

  const { mutate } = useUpdateUserApi({
    onSuccess: () => {
      closeModal();
    },
  });

  const { data: departments } = useGetDepartmentsApi(isAdmin);
  const { data: positions } = useGetPositionsApi(isAdmin);

  const resetUpdatedUser = () => {
    setUpdatedUser({
      userId,
      profile: {
        firstName,
        lastName,
      },
      cvsIds: [],
      departmentId,
      positionId,
      role,
    });
  };

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0 text-gray dark:text-gray-8">
        {t("page.users.updateUser")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetUpdatedUser}>
        <Modal.Header>{t("page.users.updateUserTitle")}</Modal.Header>
        <form
          onSubmit={handleSubmit((data) =>
            mutate({
              userId: updatedUser.userId,
              departmentId: data.departmentId,
              positionId: data.positionId,
              role: data.role,
              cvsIds: data.cvsIds,
            }),
          )}
        >
          <Modal.Body className="grid grid-cols-2 gap-4">
            <Input label="Email" name="email" disabled placeholder="Email" value={email} />
            <Input
              disabled
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={"********"}
            />
            <Input
              label="First Name"
              name="firstName"
              placeholder="First Name"
              value={updatedUser.profile.firstName}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  profile: { ...updatedUser.profile, firstName: e.target.value },
                })
              }
            />
            <Input
              label={t("page.users.lastName")}
              name="lastName"
              placeholder={t("page.users.lastName")}
              value={updatedUser.profile.lastName}
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  profile: { ...updatedUser.profile, lastName: e.target.value },
                })
              }
            />
            <Select
              disablePortal
              sideShift="none"
              className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
              list={
                departments?.map((department) => ({
                  value: department.id,
                  label: department.name,
                })) ?? []
              }
              placeholder={t("page.users.selectDepartment")}
              label={t("page.users.department")}
              value={updatedUser.departmentId}
              onValueChange={(value) => setUpdatedUser({ ...updatedUser, departmentId: value })}
            />
            <Select
              disablePortal
              sideShift="none"
              className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
              list={
                positions?.map((position) => ({
                  value: position.id,
                  label: position.name,
                })) ?? []
              }
              placeholder={t("page.users.selectPosition")}
              label={t("page.users.position")}
              value={updatedUser.positionId}
              onValueChange={(value) => setUpdatedUser({ ...updatedUser, positionId: value })}
            />
            <Select
              disablePortal
              sideShift="none"
              list={[
                { value: "Employee", label: t("page.users.roleEmployee") },
                { value: "Admin", label: t("page.users.roleAdmin") },
              ]}
              placeholder={t("page.users.selectRole")}
              label={t("page.users.role")}
              value={updatedUser.role}
              onValueChange={(value) => setUpdatedUser({ ...updatedUser, role: value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close variant="outline" className="w-40">
              {t("page.users.cancel")}
            </Modal.Close>
            <Button type="submit" className="w-40" variant="filled">
              {t("page.users.update")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
