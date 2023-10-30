import { Stack } from "@mui/material";
import FixedSidebar from "../Sidebar/FixedSidebar";
import Header from "../Header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Stack direction="column" height="100vh">
        <Header />
        <Stack width="100%" height="100%" direction="row">
          <FixedSidebar width="20%" />
          <Stack width="80%" height="calc(100vh - 44px)">
            {children}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Layout;
