import { Link } from "@tanstack/react-router";
import type { LinkButtonProps } from "./types";

export const LinkButton = ({ title, to, icon: Icon, collapsed = false }: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-4 rounded-r-40 cursor-pointer"
      activeProps={{
        className: "text-gray-2 dark:text-gray-8 opacity-100 bg-gray-7 dark:bg-gray-4",
      }}
      inactiveProps={{ className: "text-gray-3 dark:text-gray-5" }}
    >
      <Icon alt={title} width={24} height={24} />
      {!collapsed && title}
    </Link>
  );
};
