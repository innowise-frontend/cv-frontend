import { Link } from "@tanstack/react-router";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import { Button, Dropdown, ROUTES } from "@components/shared";
import { useAuth } from "@root/hooks";
import { TableActionsProps } from "./types";

export const TableActions = ({ userId, actions }: TableActionsProps) => {
  const { isAdmin } = useAuth();

  return isAdmin === true ? (
    <Dropdown options={actions} params={userId} />
  ) : (
    <Button className="flex items-center justify-start w-10 h-10">
      <Link to={ROUTES.USER_PAGE} params={{ userId }}>
        <ChevronRightIcon width={18} height={18} />
      </Link>
    </Button>
  );
};
