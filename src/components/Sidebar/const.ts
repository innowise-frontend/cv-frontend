import UsersIcon from "@assets/icon/UsersIcon.svg?react";
import TrendingUpIcon from "@assets/icon/TrendingUpIcon.svg?react";
import LanguagesIcon from "@assets/icon/LanguagesIcon.svg?react";
import FileUserIcon from "@assets/icon/FileUserIcon.svg?react";
import BuildingIcon from "@assets/icon/BuildingIcon.svg?react";
import BriefcaseIcon from "@assets/icon/BriefcaseIcon.svg?react";
import FoldersIcon from "@assets/icon/FoldersIcon.svg?react";
import SettingsIcon from "@assets/icon/SettingsIcon.svg?react";

interface Props {
  isAdmin?: boolean;
}

const getSidebarItems = ({ isAdmin }: Props) => [
  {
    title: "Employees",
    to: "/",
    icon: UsersIcon,
    visible: true,
  },
  {
    title: "Skills",
    to: "/skills",
    icon: TrendingUpIcon,
    visible: true,
  },
  {
    title: "Languages",
    to: "/languages",
    icon: LanguagesIcon,
    visible: true,
  },
  {
    title: "CVs",
    to: "/cvs",
    icon: FileUserIcon,
    visible: true,
    withDivider: isAdmin,
  },

  {
    title: "Departments",
    to: "/departments",
    icon: BuildingIcon,
    visible: isAdmin,
  },
  {
    title: "Positions",
    to: "/positions",
    icon: BriefcaseIcon,
    visible: isAdmin,
  },
  {
    title: "Projects",
    to: "/projects",
    icon: FoldersIcon,
    visible: isAdmin,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: SettingsIcon,
    visible: true,
  },
];

export default getSidebarItems;
