import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

type EditProfileProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const EditProfile = ({ open, onOpenChange }: EditProfileProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div>Here You can edit your profile</div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
