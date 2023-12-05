import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Store = {
  authUser: any | null;
  requestLoading: boolean;
  setAuthUser: (user: any | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        authUser: null,
        requestLoading: false,
        setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
        setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);

export default useStore;
