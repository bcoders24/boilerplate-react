import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDialogStore } from '@/stores/useDialogStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { getMeFn } from '../api/auth';
import { editProfileFn } from '../api/user';

export const useGetUser = (id: string) => {
  const { isFetching, data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getMeFn(id),
    enabled: !!id,
  });
  return { isFetching, data };
};

export const useEditProfile = () => {
  const store = useLoadingStore();
  const setUser = useAuthStore((store) => store.setUser);
  const dialogs = useDialogStore();
  const { mutate: editProfile } = useMutation({
    mutationFn: editProfileFn,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: ({ data }) => {
      toast.success('Profile Updated.');
      setUser(data);
      store.setRequestLoading(false);
      dialogs.onDialogChange('editProfile', false);
    },
    onError: (err) => {
      store.setRequestLoading(false);
      toast.error(err.message);
    },
  });
  return editProfile;
};
