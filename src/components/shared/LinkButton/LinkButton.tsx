import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@root/lib/utils";
import type { LinkButtonProps } from "./types";

const baseClassName = "flex items-center gap-4 p-4 rounded-r-40 cursor-pointer";
const activeClassName = "opacity-100 bg-gray-7 dark:bg-gray-4";
const inactiveClassName = "text-gray-3 dark:text-gray-5";

export const LinkButton = ({
  title,
  to,
  icon: Icon,
  collapsed = false,
  matchActive,
}: LinkButtonProps) => {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hasCustomActive = matchActive !== undefined;
  const isActive = hasCustomActive && matchActive(pathname);

  return (
    <Link
      to={to}
      className={cn(
        baseClassName,
        hasCustomActive && (isActive ? activeClassName : inactiveClassName),
      )}
      {...(!hasCustomActive && {
        activeProps: { className: activeClassName },
        inactiveProps: { className: inactiveClassName },
      })}
    >
      <Icon alt={title} width={24} height={24} className="shrink-0" />
      <span className={cn("shrink-0 transition-opacity durations-300", collapsed && "opacity-0")}>
        {title}
      </span>
    </Link>
  );
};
