import { Drawer, Stack } from "@mui/material";
import { SIDEBAR_ITEMS } from "utils/SidebarItems";
import SidebarItem from "common/SidebarItem";

const Sidebar = ({ isVisible, setIsVisible }) => {
  const closeSidebar = () => {
    setIsVisible(false);
  };
  return (
    <Drawer anchor="left" open={isVisible} onClose={closeSidebar}>
      <Stack direction="column">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            path={item.path}
            // onSelect={onSelect}
          />
        ))}
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
