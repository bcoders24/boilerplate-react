import Header from '@/components/common/Header';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Header />
      {children}
      {/* <Stack width="100%" height="100%" direction="row">
          <FixedSidebar width="15%" />
          <Sidebar
            isVisible={visible}
            dispatch={dispatch}
            setIsVisible={GeneralActions.setIsVisible}
          />

          <Stack sx={{ width: { xs: "100%", md: "85%" } }}>
            <Header />
            <Stack width="100%" height="calc(100% - 52px)" bgcolor="#fafafa">
              {children}
            </Stack>
          </Stack>
        </Stack> */}
    </div>
  );
};

export default MainLayout;
