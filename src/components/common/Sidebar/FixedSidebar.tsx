import { Stack } from "@mui/material";
import SidebarItem from "common/SidebarItem";
import { SIDEBAR_ITEMS } from "utils/SidebarItems";

const FixedSidebar = ({ width }) => {
  return (
    <Stack
      width={width}
      height="100%"
      direction="column"
      borderRight="1px solid #f1f1f1"
    >
      {SIDEBAR_ITEMS.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          path={item.path}
        />
      ))}
    </Stack>
  );
};

export default FixedSidebar;
