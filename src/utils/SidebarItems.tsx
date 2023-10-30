import { ISidebar } from "models/general/SidebarData";
import { Paths } from "constants/index";

export const SIDEBAR_ITEMS: ISidebar[] = [
  {
    id: "sidebar_profile",
    path: Paths.PROFILE,
    title: "Profile",
    icon: null,
  },
  {
    id: "sidebar_users",
    path: Paths.USER_LIST,
    title: "Users",
    icon: null,
  },
  {
    id: "sidebar_table",
    path: Paths.USER_DATA,
    title: "Table",
    icon: null,
  },
];
