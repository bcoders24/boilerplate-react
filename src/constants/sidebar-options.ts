import { SidebarItem } from '@/types';
import { Paths } from '@/constants';
import { Sidebar } from './enums';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: Sidebar.PRODUCT_DETAILS,
    path: Paths.PRODUCT_DETAILS,
    title: Sidebar.PRODUCT_DETAILS,
    extras: false,
  },
  {
    id: Sidebar.PRODUCT_DASHBOARD,
    path: Paths.PRODUCT_DASHBOARD,
    title: Sidebar.PRODUCT_DASHBOARD,
    extras: true,
  },
  {
    id: Sidebar.CUSTOMER_DETAILS,
    path: Paths.CUSTOMER_DETAILS,
    title: Sidebar.CUSTOMER_DETAILS,
    extras: false,
  },
];
