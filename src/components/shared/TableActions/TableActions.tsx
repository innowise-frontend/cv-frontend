import { Link } from "@tanstack/react-router";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import { Button, Dropdown, ROUTES } from "@components/shared";
import { TableActionsProps } from "./types";

export const TableActions = ({
  userId,
  actions,
  variant = "dropdown",
  dropdownKeepMounted,
}: TableActionsProps) => {
  const dropdownOptions = actions.map((action) => ({
    ...action,
    onClick: () => action.onClick?.(userId),
  }));

  return (
    <div className="flex justify-end">
      {variant === "dropdown" ? (
        <Dropdown options={dropdownOptions} keepMounted={dropdownKeepMounted} />
      ) : (
        <Button className="flex items-center justify-start w-10 h-10">
          <Link to={ROUTES.USER_PAGE} params={{ userId }}>
            <ChevronRightIcon width={18} height={18} />
          </Link>
        </Button>
      )}
    </div>
  );
};
