import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Paths } from '@/constants';
import { changePasswordFn, loginUserFn } from '@/services/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoadingStore } from '@/stores/useLoadingStore';

export const useLogin = () => {
  const navigate = useNavigate();
  const setRequestLoading = useLoadingStore((store) => store.setRequestLoading);
  const authStore = useAuthStore();
  const { mutate: loginUser } = useMutation({
    mutationFn: loginUserFn,
    onMutate() {
      setRequestLoading(true);
    },
    onSuccess: ({ data }) => {
      setRequestLoading(false);
      authStore.setSession({ accessToken: data?.data?.token });
      authStore.setUser(data?.data);
      navigate(Paths.PRODUCT_DETAILS);
    },
    onError: (err) => {
      setRequestLoading(false);
      toast.error(err.message);
    },
  });
  return loginUser;
};

export const useChangePassword = () => {
  const setRequestLoading = useLoadingStore((store) => store.setRequestLoading);
  const logout = useAuthStore((store) => store.logout);
  const { mutate: changePassword } = useMutation({
    mutationFn: changePasswordFn,
    onMutate() {
      setRequestLoading(true);
    },
    onSuccess: () => {
      setRequestLoading(false);
      logout();
    },
    onError: (err) => {
      setRequestLoading(false);
      toast.error(err.message);
    },
  });
  return changePassword;
};
