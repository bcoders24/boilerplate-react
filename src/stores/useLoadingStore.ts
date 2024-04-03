import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useLoadingStore = create(
  devtools(
    immer<State>((set) => ({
      requestLoading: false,
      activeNetworkRequests: 0,
      setRequestLoading: (loading) =>
        set((state) => {
          if (loading) {
            state.activeNetworkRequests++;
          } else {
            state.activeNetworkRequests--;
          }
          state.requestLoading = state.activeNetworkRequests > 0;
        }),
    })),
    { name: 'Loading Store' },
  ),
);

type State = {
  requestLoading: boolean;
  activeNetworkRequests: number;
  setRequestLoading: (loading: boolean) => void;
};
