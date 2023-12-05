import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

type LogoutProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const Logout = ({ open, onOpenChange }: LogoutProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>Are you sure you really wanna logout ?</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
