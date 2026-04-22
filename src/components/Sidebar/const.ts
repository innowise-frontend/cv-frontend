import BriefcaseIcon from "@assets/icon/BriefcaseIcon.svg?react";
import BuildingIcon from "@assets/icon/BuildingIcon.svg?react";
import FileUserIcon from "@assets/icon/FileUserIcon.svg?react";
import FoldersIcon from "@assets/icon/FoldersIcon.svg?react";
import LanguagesIcon from "@assets/icon/LanguagesIcon.svg?react";
import SettingsIcon from "@assets/icon/SettingsIcon.svg?react";
import TrendingUpIcon from "@assets/icon/TrendingUpIcon.svg?react";
import UsersIcon from "@assets/icon/UsersIcon.svg?react";
import { ROUTES } from "@root/constants";

interface GetSidebarItemsProps {
  isAdmin?: boolean;
}

const getSidebarItems = ({ isAdmin }: GetSidebarItemsProps) => [
  {
    title: "Employees",
    to: ROUTES.ROOT,
    icon: UsersIcon,
    visible: true,
  },
  {
    title: "Skills",
    to: ROUTES.SKILLS,
    icon: TrendingUpIcon,
    visible: true,
  },
  {
    title: "Languages",
    to: ROUTES.LANGUAGES,
    icon: LanguagesIcon,
    visible: true,
  },
  {
    title: "CVs",
    to: ROUTES.CVS,
    icon: FileUserIcon,
    visible: true,
    withDivider: isAdmin,
  },

  {
    title: "Departments",
    to: ROUTES.DEPARTMENTS,
    icon: BuildingIcon,
    visible: isAdmin,
  },
  {
    title: "Positions",
    to: ROUTES.POSITIONS,
    icon: BriefcaseIcon,
    visible: isAdmin,
  },
  {
    title: "Projects",
    to: ROUTES.PROJECTS,
    icon: FoldersIcon,
    visible: isAdmin,
  },
  {
    title: "Settings",
    to: ROUTES.SETTINGS,
    icon: SettingsIcon,
    visible: true,
  },
];

export default getSidebarItems;
