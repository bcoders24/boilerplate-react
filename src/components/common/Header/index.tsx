import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import Logout from './components/Logout';

const Header = () => {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  return (
    <div className="w-full bg-gray-300 dark:bg-gray-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div>
          <h1>Logo</h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>Admin</span>
                    <span>jass@gmail.com</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditProfile(true)}>Edit profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChangePassword(true)}>Change password</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogout(true)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {editProfile && <EditProfile open={editProfile} onOpenChange={setEditProfile} />}
      {changePassword && <ChangePassword open={changePassword} onOpenChange={setChangePassword} />}
      {logout && <Logout open={logout} onOpenChange={setLogout} />}
    </div>
  );
};

export default Header;
