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

const getSidebarItems = ({ isAdmin, t }: GetSidebarItemsProps & { t: (key: string) => string }) => [
  {
    title: t("page.sidebar.employees"),
    to: ROUTES.ROOT,
    icon: UsersIcon,
    visible: true,
  },
  {
    title: t("page.sidebar.skills"),
    to: ROUTES.SKILLS,
    icon: TrendingUpIcon,
    visible: true,
  },
  {
    title: t("page.sidebar.languages"),
    to: ROUTES.LANGUAGES,
    icon: LanguagesIcon,
    visible: true,
  },
  {
    title: t("page.sidebar.cvs"),
    to: ROUTES.CVS,
    icon: FileUserIcon,
    visible: true,
  },
  {
    title: t("page.sidebar.settings"),
    to: ROUTES.SETTINGS,
    icon: SettingsIcon,
    visible: true,
    withDivider: true,
  },
  {
    title: t("page.sidebar.departments"),
    to: ROUTES.DEPARTMENTS,
    icon: BuildingIcon,
    visible: isAdmin,
  },
  {
    title: t("page.sidebar.positions"),
    to: ROUTES.POSITIONS,
    icon: BriefcaseIcon,
    visible: isAdmin,
  },
  {
    title: t("page.sidebar.projects"),
    to: ROUTES.PROJECTS,
    icon: FoldersIcon,
    visible: isAdmin,
  },
];

export default getSidebarItems;
