import LoadingButton from '@/components/common/loading-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangePasswordSchema } from '@/schemas/change-password.schema';
import { useChangePassword } from '@/services/queries/auth.query';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDialogStore } from '@/stores/useDialogStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { DialogProps } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeOf } from 'zod';

export type ChangePasswordInput = TypeOf<typeof ChangePasswordSchema>;

const ChangePassword: React.FC<DialogProps> = ({ dialogKey }) => {
  const store = useLoadingStore();
  const user = useAuthStore((store) => store.user);
  const { dialogs, onDialogChange } = useDialogStore();
  const handleDialog = (value: any) => {
    onDialogChange(dialogKey, value);
    form.reset();
  };
  const changePassword = useChangePassword();
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });
  const onSubmit: SubmitHandler<ChangePasswordInput> = (values) => {
    changePassword({ payload: values, id: user?.id });
  };
  return (
    <Dialog open={dialogs[dialogKey]} onOpenChange={handleDialog}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <LoadingButton isLoading={store.requestLoading}>Submit</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
