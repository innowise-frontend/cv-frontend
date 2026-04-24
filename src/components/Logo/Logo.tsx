import { Link } from "@tanstack/react-router";
import LogoIconDark from "@assets/icon/LogoIconDark.svg?react";
import LogoIconLight from "@assets/icon/LogoIconLight.svg?react";
import type { LogoProps } from "./types";

export const Logo = ({ collapsed = false }: LogoProps) => {
  return (
    <Link to="/" search={{ search: undefined }} className="flex items-center gap-4 p-4">
      <LogoIconLight className="dark:hidden" />
      <LogoIconDark className="hidden dark:block" />
      {!collapsed && <span className="leading-6 text-gray-14 dark:text-white-3">CV Builder</span>}
    </Link>
  );
};
