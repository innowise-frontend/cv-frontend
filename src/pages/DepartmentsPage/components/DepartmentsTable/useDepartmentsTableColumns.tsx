import { createColumnHelper } from "@tanstack/react-table";
import { Modal, TableActions, TableColumnHeader } from "@components/shared";
import { DeleteDepartmentModal } from "../DeleteDepartmentModal/DeleteDepartmentModal";
import { UpdateDepartmentModal } from "../UpdateDepartmentModal/UpdateDepartmentModal";
import type { DepartmentTableRow } from "./types";

export const useDepartmentsTableColumns = () => {
  const columnHelper = createColumnHelper<DepartmentTableRow>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <TableColumnHeader title="Department" />,
      cell: ({ row }) => <span>{row.original.name}</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => null,
      size: 72,
      cell: ({ row }) => (
        <TableActions
          userId={row.original.id}
          dropdownKeepMounted
          actions={[
            {
              label: (
                <Modal>
                  <UpdateDepartmentModal departmentId={row.original.id} name={row.original.name} />
                </Modal>
              ),
            },
            {
              label: (
                <Modal>
                  <DeleteDepartmentModal departmentId={row.original.id} name={row.original.name} />
                </Modal>
              ),
            },
          ]}
        />
      ),
    }),
  ];

  return { columns };
};
