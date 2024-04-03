import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useSidebarStore = create(
  devtools(
    immer<State>((set) => ({
      expanded: true,
      setExpanded: (value) =>
        set((state) => {
          state.expanded = value;
        }),
      toggleExpanded: () =>
        set((state) => {
          state.expanded = !state.expanded;
        }),
    })),
    { name: 'Sidebar Store' },
  ),
);

type State = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;
};
