import { Paths } from 'constants/index';

interface ISidebar {
  id: string;
  path: string;
  title: string;
  icon: React.ReactElement | null;
}

export const SIDEBAR_ITEMS: ISidebar[] = [
  {
    id: 'sidebar_profile',
    path: Paths.DASHBOARD,
    title: 'Profile',
    icon: null,
  },
];
