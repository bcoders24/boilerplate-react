import { ReactNode } from 'react';
import Header from '@/features/shared/header';
import Sidebar from '@/features/shared/sidebar';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-whitesmoke">
      <Sidebar />
      <div className="flex flex-col h-full w-full max-w-screen-3xl mx-auto">
        <Header />
        <div className="w-full h-[calc(100%-72px)] px-6 pt-6">
          <div className="w-full h-full rounded-t-md overflow-scroll no-scrollbar bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
