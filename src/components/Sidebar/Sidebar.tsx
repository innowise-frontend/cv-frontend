import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LeftArrowIcon from "@assets/icon/LeftArrowIcon.svg?react";
import { Logo } from "@components/Logo";
import { Divider, LinkButton, ProfileBlock } from "@components/shared";
import { useAuth } from "@root/hooks/useAuth/useAuth";
import getSidebarItems from "./const";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAdmin } = useAuth();
  const { t } = useTranslation();

  return (
    <div
      className={`relative flex h-full flex-col justify-between pb-14 transition-[min-width] duration-300 ease-in-out ${isCollapsed ? "min-w-14" : "w-50"}`}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed((item) => !item)}
        className={`absolute -right-2.5 top-13 z-20 flex size-5 cursor-pointer items-center justify-center rounded-full p-1 text-gray-3 transition-transform duration-300 hover:bg-gray-7 dark:text-gray-5 dark:hover:bg-gray-3 ${isCollapsed ? "rotate-180" : ""}`}
      >
        <LeftArrowIcon />
      </button>

      <div className="flex flex-col gap-3.5 ">
        <Logo collapsed={isCollapsed} />
        {getSidebarItems({ isAdmin: isAdmin, t }).map(
          (item) =>
            item.visible && (
              <React.Fragment key={item.title}>
                <LinkButton
                  title={item.title}
                  to={item.to}
                  icon={item.icon}
                  collapsed={isCollapsed}
                />
                {item.withDivider && isAdmin && <Divider />}
              </React.Fragment>
            ),
        )}
      </div>

      <ProfileBlock collapsed={isCollapsed} />
    </div>
  );
};
