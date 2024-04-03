import { Images } from '@/constants';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="w-full h-screen bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Images.AUTH_BACKGROUND})` }}
    >
      <div className="w-full h-full rounded-2xl flex justify-center items-center">
        <div className="p-7 rounded-md bg-white box-shadow">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
