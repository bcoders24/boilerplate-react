import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import cn from '@/utils/cn';
import { useAlertStore } from '@/stores/useAlertStore';
import { useLoadingStore } from '@/stores/useLoadingStore';

type AlertModalProps = {
  triggerContinueFn: () => void;
};

const AlertModal: React.FC<AlertModalProps> = ({ triggerContinueFn }) => {
  const { open, setOpen } = useAlertStore();
  const { requestLoading } = useLoadingStore();
  const closeFn = () => {
    setOpen(false);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeFn}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={triggerContinueFn}>
            Continue
            <span
              className={cn({
                'ml-2 w-5 h-5 border-2 border-white border-transparent border-b-white rounded-full inline-block animate-spin':
                  requestLoading,
              })}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
