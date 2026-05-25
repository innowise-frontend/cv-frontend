import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button, Input, Modal, Select } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { useAuth } from "@root/hooks";
import { UserRole } from "@root/services/graphql/__generated__/graphql";
import { UpdateUserModalProps, UpdateUserFormValues } from "./types";
import {
  useGetDepartmentsApi,
  useGetPositionsApi,
  useUpdateProfileApi,
  useUpdateUserApi,
} from "../../api";

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
  const { isAdmin } = useAuth();
  const { handleSubmit, reset, control, register } = useForm<UpdateUserFormValues>({
    defaultValues: {
      email,
      password: "********",
      firstName,
      lastName,
      departmentId,
      positionId,
      role,
    },
  });
  const { closeModal } = useModalContext();

  const { mutateAsync: updateUserAsync } = useUpdateUserApi();
  const { mutateAsync: updateProfileAsync } = useUpdateProfileApi();

  const { data: departments } = useGetDepartmentsApi({ enabled: isAdmin });
  const { data: positions } = useGetPositionsApi({ enabled: isAdmin });

  const resetToInitial = useCallback(() => {
    reset({
      email,
      password: "********",
      firstName,
      lastName,
      departmentId,
      positionId,
      role,
    });
  }, [reset, email, firstName, lastName, departmentId, positionId, role]);

  const handleUpdateUser = async (data: UpdateUserFormValues) => {
    try {
      await updateUserAsync({
        userId,
        departmentId: data.departmentId,
        positionId: data.positionId,
        role: data.role as UserRole,
      });
      await updateProfileAsync({
        userId,
        first_name: data.firstName,
        last_name: data.lastName,
      });
      closeModal();
      toast.success(t("page.users.updateUserTitle"));
    } catch {
      toast.error(t("page.users.updateUserFailed"));
    }
  };

  useEffect(() => {
    resetToInitial();
  }, [userId, resetToInitial]);

  return (
    <>
      <Modal.Trigger className="w-full h-auto justify-start capitalize p-0">
        {t("page.users.updateUser")}
      </Modal.Trigger>
      <Modal.Content onCancel={resetToInitial}>
        <Modal.Header>{t("page.users.updateUserTitle")}</Modal.Header>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <Modal.Body className="grid grid-cols-2 gap-4">
            <Input
              label={t("page.users.email")}
              disabled
              placeholder={t("page.users.email")}
              {...register("email", { disabled: true })}
            />
            <Input
              disabled
              label={t("page.users.password")}
              type="password"
              placeholder={t("page.users.password")}
              {...register("password", { disabled: true })}
            />
            <Input
              label={t("page.users.firstName")}
              placeholder={t("page.users.firstName")}
              {...register("firstName")}
            />
            <Input
              label={t("page.users.lastName")}
              placeholder={t("page.users.lastName")}
              {...register("lastName")}
            />
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <Select
                  disablePortal
                  sideShift="none"
                  className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
                  list={
                    departments?.map((d) => ({
                      value: d.id,
                      label: d.name,
                    })) ?? []
                  }
                  placeholder={t("page.users.selectDepartment")}
                  label={t("page.users.department")}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Controller
              name="positionId"
              control={control}
              render={({ field }) => (
                <Select
                  disablePortal
                  sideShift="none"
                  className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
                  list={
                    positions?.map((p) => ({
                      value: p.id,
                      label: p.name,
                    })) ?? []
                  }
                  placeholder={t("page.users.selectPosition")}
                  label={t("page.users.position")}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  disablePortal
                  sideShift="none"
                  list={[
                    { value: UserRole.Employee, label: t("page.users.roleEmployee") },
                    { value: UserRole.Admin, label: t("page.users.roleAdmin") },
                  ]}
                  placeholder={t("page.users.selectRole")}
                  label={t("page.users.role")}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close
              type="button"
              variant="outline"
              className="w-40"
              onClick={() => {
                resetToInitial();
                closeModal();
              }}
            >
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
