import { Fragment } from 'react';
import { Typography } from '@/components/common/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ChangePassword from './change-password';
import EditProfile from './edit-profile';
import { Images } from '@/constants';
import { useAuthStore } from '@/stores/useAuthStore';
import SEO from '@/components/common/seo';
import { useDialogStore } from '@/stores/useDialogStore';

const DEFAULT_NA = 'N/a';

const Profile = () => {
  const user = useAuthStore((store) => store.user);
  const onDialogChange = useDialogStore((store) => store.onDialogChange);
  return (
    <Fragment>
      <SEO title="Profile" description="User Profile" name="Shoot Flow" type="webapp" />
      <div className="w-full h-full flex justify-center items-center">
        <div className="box-shadow rounded-md px-8 py-2 relative">
          <button className="absolute top-4 right-4" onClick={() => onDialogChange('editProfile', true)}>
            <img src={Images.EDIT} width="28px" alt="edit-profile" />
          </button>
          <div className="flex flex-col items-center justify-center my-4">
            <Avatar className="w-20 h-20 mb-2">
              <AvatarImage src={user?.imgUrl} />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
            <Typography variant="body" className="font-semibold">
              {user?.displayName || DEFAULT_NA}
            </Typography>
            <Typography variant="small" className="text-gray-400 font-medium">
              MY ACCOUNT
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-b border-r p-4 flex flex-col justify-center items-center">
              <Typography variant="small" className="text-gray-400">
                ROLE
              </Typography>
              <Typography variant="small" className="font-medium">
                {user?.roleType || DEFAULT_NA}
              </Typography>
            </div>
            <div className="border-b border-l p-4 flex flex-col justify-center items-center">
              <Typography variant="small" className="text-gray-400">
                DEPARTMENT
              </Typography>
              <Typography variant="small" className="font-medium">
                {DEFAULT_NA}
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-t border-r p-4 flex flex-col justify-center items-center">
              <Typography variant="small" className="text-gray-400">
                PHONE
              </Typography>
              <Typography variant="small" className="font-medium">
                {user?.mobile || DEFAULT_NA}
              </Typography>
            </div>
            <div className="border-t border-l p-4 flex flex-col justify-center items-center">
              <Typography variant="small" className="text-gray-400">
                EMAIL
              </Typography>
              <Typography variant="small" className="font-medium">
                {user?.email || DEFAULT_NA}
              </Typography>
            </div>
          </div>
          <div className="flex justify-end py-4">
            <Button onClick={() => onDialogChange('changePassword', true)}>Change Password</Button>
          </div>
        </div>
        <EditProfile dialogKey="editProfile" />
        <ChangePassword dialogKey="changePassword" />
      </div>
    </Fragment>
  );
};

export default Profile;
