import React from "react";
import { Divider } from "@components/shared/divider";
import { LinkButton } from "@components/shared/linkButton";
import { ProfileBlock } from "@components/shared/profileBlock";
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
