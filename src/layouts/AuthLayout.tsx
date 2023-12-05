import { Images } from '@/constants';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-center bg-no-repeat p-8 bg-off-white">
      <div className="w-full h-full rounded-2xl flex justify-center items-center p-8 bg-white">
        <div className="md:flex flex-1 hidden items-center justify-center rounded-2xl w-full h-full overflow-hidden">
          <img className="w-full h-full object-cover" src={Images.AUTH_BACKGROUND} alt="logo-img" />
        </div>
        <div className="flex-1 flex justify-center items-center p-7 rounded-lg opacity-90 bg-white dark:bg-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
