import { Link } from "@tanstack/react-router";
import type { ProfileBlockProps } from "./types";

export const ProfileBlock = ({ collapsed = false }: ProfileBlockProps) => {
  return (
    <Link to="/profile" className="flex items-center justify-center gap-2">
      <div className="w-10 h-10 rounded-full bg-red text-gray-8 dark:text-gray flex items-center justify-center">
        R
      </div>
      {!collapsed && "Rostislav Harlanov"}
    </Link>
  );
};
