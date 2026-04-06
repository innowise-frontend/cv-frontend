import React from "react";
import { Divider } from "@root/components/shared/Divider";
import { LinkButton } from "@root/components/shared/LinkButton";
import { ProfileBlock } from "@root/components/shared/ProfileBlock";
import getSidebarItems from "./const";

export const Sidebar = () => {
  return (
    <div className="w-50 h-full flex flex-col justify-between gap-3.5 pb-15">
      <div>
        {getSidebarItems({ isAdmin: true }).map((item) => (
          <React.Fragment key={item.title}>
            {item.visible && <LinkButton title={item.title} to={item.to} icon={item.icon} />}
            {item.visible && item.withDivider && <Divider />}
          </React.Fragment>
        ))}
      </div>
      <ProfileBlock />
    </div>
  );
};
