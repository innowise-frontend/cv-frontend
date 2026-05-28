import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import PlusIcon from "@assets/icon/PlusIcon.svg?react";
import { Button, Input, Modal, Select } from "@components/shared";
import { useModalContext } from "@components/shared/Modal/useModalContext";
import { SortOrder } from "@root/constants";
import { useAuth } from "@root/hooks";
import { UserRole } from "@services/graphql/__generated__/graphql";
import { getUsers } from "@services/users";
import { CreateUserFormValues } from "./types";
import { useCreateUserApi, useGetDepartmentsApi, useGetPositionsApi } from "../../api";

const defaultFormValues: CreateUserFormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  departmentId: "",
  positionId: "",
  role: UserRole.Employee,
};

export const CreateUserModal = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const { closeModal } = useModalContext();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<CreateUserFormValues>({
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const watched = useWatch<CreateUserFormValues>({ control }) ?? defaultFormValues;

  const { mutate } = useCreateUserApi({
    onSuccess: () => {
      reset(defaultFormValues);
      closeModal();
    },
  });

  const handleCreateUser = async (data: CreateUserFormValues) => {
    clearErrors("email");
    const email = data.email.trim();
    const normalizedEmail = email.toLowerCase();

    const paginated = await getUsers({
      search: email,
      page: 1,
      limit: 100,
      sort_order: SortOrder.ASC,
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
        email: data.email,
        password: data.password,
      },
      profile: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
      departmentId: data.departmentId,
      positionId: data.positionId,
      role: data.role,
    });

    toast.success(t("page.users.createUser"));
  };

  const { data: departments } = useGetDepartmentsApi({ enabled: isAdmin });
  const { data: positions } = useGetPositionsApi({ enabled: isAdmin });

  return (
    <>
      <Modal.Trigger className="flex items-center gap-2 text-red dark:text-red">
        <PlusIcon />
        {t("page.users.createUser")}
      </Modal.Trigger>
      <Modal.Content onCancel={() => reset(defaultFormValues)}>
        <Modal.Header>{t("page.users.createUserTitle")}</Modal.Header>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <Modal.Body className="grid grid-cols-[400px_400px] gap-y-9 gap-x-3">
            <Input
              error={typeof errors.email?.message === "string" ? errors.email.message : undefined}
              label={t("page.users.email")}
              placeholder={t("page.users.email")}
              {...register("email", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.email}
            />
            <Input
              label={t("page.users.password")}
              type="password"
              placeholder={t("page.users.password")}
              {...register("password", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.password}
            />
            <Input
              label={t("page.users.firstName")}
              placeholder={t("page.users.firstName")}
              {...register("firstName", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.firstName}
            />
            <Input
              label={t("page.users.lastName")}
              placeholder={t("page.users.lastName")}
              {...register("lastName", {
                required: true,
                validate: (v) => v.trim().length > 0,
              })}
              value={watched.lastName}
            />
            <Controller
              name="departmentId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  disablePortal
                  className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
                  list={
                    departments?.items?.map((department) => ({
                      value: department.id,
                      label: department.name,
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
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  disablePortal
                  className="[&_[data-slot=select-trigger][data-placeholder]]:text-gray-6"
                  list={
                    positions?.items?.map((position) => ({
                      value: position.id,
                      label: position.name,
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
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  disablePortal
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
            <Modal.Close variant="outline" className="w-40">
              {t("page.users.cancel")}
            </Modal.Close>
            <Button type="submit" className="w-40" variant="filled" disabled={!isValid}>
              {t("page.users.create")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </>
  );
};
