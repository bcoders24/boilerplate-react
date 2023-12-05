import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

type ChangePasswordProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const ChangePassword = ({ open, onOpenChange }: ChangePasswordProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Passoword</DialogTitle>
        </DialogHeader>
        <div>Here You can change your password</div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
