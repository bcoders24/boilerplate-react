import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAuthStore = create(
  devtools(
    persist(
      immer<State>((set) => ({
        session: undefined,
        user: undefined,
        setSession: (session) =>
          set((state) => {
            state.session = session;
          }),
        setUser: (user) =>
          set((state) => {
            state.user = user;
          }),
        logout: () =>
          set((state) => {
            state.user = undefined;
            state.session = undefined;
          }),
      })),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'Auth Store' },
  ),
);

type State = {
  session?: any;
  user?: any;
  setSession: (session?: any) => void;
  setUser: (user: any) => void;
  logout: () => void;
};
