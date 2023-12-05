import { useNavigate } from 'react-router-dom';
import { loginUserFn } from '@/services/api/authApi';
import { useToast } from '@/components/ui/use-toast';
import { Paths } from '@/constants';
import useAuthStore from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const store = useAuthStore();
  const { mutate: loginUser } = useMutation({
    mutationFn: loginUserFn,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: (data) => {
      store.setRequestLoading(false);
      store.setAuthUser(data?.data?.data);
      toast({ description: 'Login success' });
      navigate(Paths.DASHBOARD);
    },
    onError: (err) => {
      store.setRequestLoading(false);
      toast({ variant: 'destructive', description: err.message });
    },
  });
  return loginUser;
};
