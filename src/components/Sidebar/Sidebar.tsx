import { ProfileBlock } from "@components/ProfileBlock";
import Divider from "../shared/Divider";
import LinkButton from "../shared/LinkButton";
import getSidebarItems from "./const";

const Sidebar = () => {
  return (
    <div className="w-50 h-full flex flex-col justify-between gap-3.5 pb-15">
      <div>
        {getSidebarItems({ isAdmin: true }).map((item) => (
          <>
            {item.visible && (
              <LinkButton key={item.title} title={item.title} to={item.to} icon={item.icon} />
            )}
            {item.withDivider && <Divider />}
          </>
        ))}
      </div>
      <ProfileBlock />
    </div>
  );
};

export default Sidebar;
