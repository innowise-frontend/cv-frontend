import React, { useState } from "react";
import LeftArrowIcon from "@assets/icon/LeftArrowIcon.svg?react";
import { Logo } from "@components/Logo";
import { Divider, LinkButton, ProfileBlock } from "@components/shared";
import { useAuth } from "@root/hooks/useAuth";
import getSidebarItems from "./const";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <div
      className={`relative flex h-full flex-col justify-between pb-14 ${!isCollapsed && "min-w-50"}`}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed((item) => !item)}
        className="absolute -right-2 top-13 z-20 p-1 text-gray-3 dark:text-gray-5"
      >
        <LeftArrowIcon />
      </button>

      <div className="flex flex-col gap-3.5 ">
        <Logo collapsed={isCollapsed} />
        {getSidebarItems({ isAdmin: isAdmin }).map(
          (item) =>
            item.visible && (
              <React.Fragment key={item.title}>
                <LinkButton
                  title={item.title}
                  to={item.to}
                  icon={item.icon}
                  collapsed={isCollapsed}
                />
                {item.withDivider && <Divider />}
              </React.Fragment>
            ),
        )}
      </div>

      <ProfileBlock collapsed={isCollapsed} firstName="Rostislav" lastName="Harlanov" />
    </div>
  );
};
