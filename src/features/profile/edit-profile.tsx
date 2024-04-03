import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf } from 'zod';
import LoadingButton from '@/components/common/loading-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectOptions from '@/constants/select-options';
import { useDialogStore } from '@/stores/useDialogStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import ImgVidUploader from '@/components/common/uploader';
import { useAuthStore } from '@/stores/useAuthStore';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { addKeyValuePair } from '@/utils/functions';
import { useEditProfile } from '@/services/queries/user.query';
import SelectField from '@/components/common/select-field';
import { Images } from '@/constants';
import { DialogProps } from '@/types/common';
import { EditProfileSchema } from '@/schemas/edit-profile.schema';

export type EditProfileInput = TypeOf<typeof EditProfileSchema>;

const EditProfile: React.FC<DialogProps> = ({ dialogKey }) => {
  const user = useAuthStore((store) => store.user);
  const editProfile = useEditProfile();
  const store = useLoadingStore();
  const { dialogs, onDialogChange } = useDialogStore();

  const [openUpload, setOpenUpload] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const form = useForm<EditProfileInput>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      department: user?.department,
      email: user?.email || '',
      mobile: user?.mobile || '',
      role: user?.roleType,
    },
  });

  const onSubmit: SubmitHandler<EditProfileInput> = (values) => {
    const formData = addKeyValuePair(values, 'imgUrl', imgUrl);
    editProfile({ payload: formData, id: user?.id });
  };

  const handleDialogClose = (value: boolean) => {
    onDialogChange(dialogKey, value);
    form.reset();
    setImgUrl('');
  };
  return (
    <Dialog open={dialogs[dialogKey]} onOpenChange={handleDialogClose}>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Avatar className="w-20 h-20 relative overflow-visible">
            <img
              src={Images.PEN}
              width="20px"
              alt="upload-pic"
              className="absolute top-0 right-2 cursor-pointer"
              onClick={() => setOpenUpload(true)}
            />
            <AvatarImage src={imgUrl || user?.imgUrl} className="overflow-hidden rounded-full object-cover" />
            <AvatarFallback>{user?.firstName}</AvatarFallback>
          </Avatar>
        </div>
        <ImgVidUploader openUpload={openUpload} setOpenUpload={setOpenUpload} setImgUrl={setImgUrl} accept="image/*" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-rows-3 gap-2">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <SelectField field={field} items={SelectOptions.ROLES} placeholder="Select Role" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <SelectField field={field} items={SelectOptions.DEPARTMENTS} placeholder="Select Department" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <LoadingButton isLoading={store.requestLoading}>Submit</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
