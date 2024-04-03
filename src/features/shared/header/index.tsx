import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logout from './logout';
import { Typography } from '@/components/common/typography';
import { Paths } from '@/constants';
import { useDialogStore } from '@/stores/useDialogStore';
import { useAuthStore } from '@/stores/useAuthStore';
import LocationSelector from '../location-selector';

const DEFAULT_NA = 'N/a';

const Header = () => {
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);
  const onDialogChange = useDialogStore((store) => store.onDialogChange);
  const handleProfileClick = () => {
    navigate(Paths.PROFILE);
  };
  const handleLogoutClick = () => {
    onDialogChange('logout', true);
  };
  return (
    <header className="w-full bg-whitesmoke px-4 py-2">
      <div className="flex justify-end items-center gap-2">
        {/* Location Selector */}
        <LocationSelector />
        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.imgUrl} />
              <AvatarFallback>
                <Typography variant="small">{user?.firstName || DEFAULT_NA}</Typography>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={user?.imgUrl} />
                  <AvatarFallback>
                    <Typography variant="small">{user?.firstName || DEFAULT_NA}</Typography>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <Typography variant="small">{user?.displayName || DEFAULT_NA}</Typography>
                  <Typography variant="small">{user?.email || DEFAULT_NA}</Typography>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <Typography variant="xsmall">Profile</Typography>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogoutClick}>
              <Typography variant="xsmall">Logout</Typography>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Logout dialogKey="logout" />
    </header>
  );
};

export default Header;
