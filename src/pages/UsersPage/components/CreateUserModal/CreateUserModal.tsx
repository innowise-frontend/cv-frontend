import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Button, Input, Modal, Select } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useAuth } from "@root/hooks";
import { UserRole } from "@services/graphql/__generated__/graphql";
import { getUsers } from "@services/users";
import { useCreateUserApi, useGetDepartmentsApi, useGetPositionsApi } from "../../api";

export const CreateUserModal = () => {
  const { t } = useTranslation();
  const [newUser, setNewUser] = useState({
    auth: {
      email: "",
      password: "",
    },
    profile: {
      firstName: "",
      lastName: "",
    },
    departmentId: "",
    positionId: "",
    role: "Employee",
  });
  const { isAdmin } = useAuth();
  const { closeModal } = useModalContext();
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { mutate } = useCreateUserApi({
    onSuccess: () => {
      closeModal();
    },
  });
  const { data: departments } = useGetDepartmentsApi({ enabled: isAdmin });
  const { data: positions } = useGetPositionsApi({ enabled: isAdmin });

  const resetNewUser = () => {
    setNewUser({
      auth: {
        email: "",
        password: "",
      },
      profile: {
        firstName: "",
        lastName: "",
      },
      departmentId: "",
      positionId: "",
      role: "Employee",
    });
  };

  const disabled =
    !newUser.auth.email ||
    !newUser.auth.password ||
    !newUser.profile.firstName ||
    !newUser.profile.lastName ||
    !newUser.departmentId ||
    !newUser.positionId ||
    !newUser.role;

  return (
    <>
      <Modal.Trigger className="flex items-center gap-2 text-red dark:text-red">
        <PlusIcon />
        {t("page.users.createUser")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetNewUser}>
        <Modal.Header>{t("page.users.createUserTitle")}</Modal.Header>
        <form
          onSubmit={handleSubmit(async () => {
            const email = newUser.auth.email.trim();
            const normalizedEmail = email.toLowerCase();

            const paginated = await getUsers({
              search: email,
              page: 1,
              limit: 100,
              sort_order: "ASC",
              sort_by: "email",
            });

            const emailTaken = paginated.items.some(
              (item) => (item.email ?? "").trim().toLowerCase() === normalizedEmail,
            );

            if (emailTaken) {
              setError("email", { message: t("page.users.emailAlreadyExists") });

              return;
            }

            mutate({
              auth: {
                email: newUser.auth.email,
                password: newUser.auth.password,
              },
              profile: {
                first_name: newUser.profile.firstName,
                last_name: newUser.profile.lastName,
              },
              departmentId: newUser.departmentId,
              positionId: newUser.positionId,
              role: newUser.role as UserRole,
              cvsIds: [],
            });
          })}
        >
          <Modal.Body className="grid grid-cols-2 gap-6">
            <Input
              error={typeof errors.email?.message === "string" ? errors.email.message : undefined}
              label={t("page.users.email")}
              name="email"
              placeholder={t("page.users.email")}
              value={newUser.auth.email}
              onChange={(e) =>
                setNewUser({ ...newUser, auth: { ...newUser.auth, email: e.target.value } })
              }
            />
            <Input
              label={t("page.users.password")}
              name="password"
              type="password"
              placeholder={t("page.users.password")}
              value={newUser.auth.password}
              onChange={(e) =>
                setNewUser({ ...newUser, auth: { ...newUser.auth, password: e.target.value } })
              }
            />
            <Input
              label={t("page.users.firstName")}
              name="firstName"
              placeholder={t("page.users.firstName")}
              value={newUser.profile.firstName}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  profile: { ...newUser.profile, firstName: e.target.value },
                })
              }
            />
            <Input
              label={t("page.users.lastName")}
              name="lastName"
              placeholder={t("page.users.lastName")}
              value={newUser.profile.lastName}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  profile: { ...newUser.profile, lastName: e.target.value },
                })
              }
            />
            <Select
              disablePortal
              className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
              list={
                departments?.map((department) => ({
                  value: department.id,
                  label: department.name,
                })) ?? []
              }
              placeholder={t("page.users.selectDepartment")}
              label={t("page.users.department")}
              value={newUser.departmentId}
              onValueChange={(value) => setNewUser({ ...newUser, departmentId: value })}
            />
            <Select
              disablePortal
              className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
              list={
                positions?.map((position) => ({
                  value: position.id,
                  label: position.name,
                })) ?? []
              }
              placeholder={t("page.users.selectPosition")}
              label={t("page.users.position")}
              value={newUser.positionId}
              onValueChange={(value) => setNewUser({ ...newUser, positionId: value })}
            />
            <Select
              disablePortal
              list={[
                { value: "Employee", label: t("page.users.roleEmployee") },
                { value: "Admin", label: t("page.users.roleAdmin") },
              ]}
              placeholder={t("page.users.selectRole")}
              label={t("page.users.role")}
              value={newUser.role}
              onValueChange={(value) => setNewUser({ ...newUser, role: value })}
            />
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close variant="outline" className="w-40">
              {t("page.users.cancel")}
            </Modal.Close>
            <Button type="submit" className="w-40" variant="filled" disabled={disabled}>
              {t("page.users.create")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
