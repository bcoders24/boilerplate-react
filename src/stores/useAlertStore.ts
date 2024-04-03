import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAlertStore = create(
  devtools(
    immer<State>((set) => ({
      open: false,
      record: {},
      setOpen: (value, record) =>
        set((state) => {
          if (value) state.record = record;
          else state.record = {};
          state.open = value;
        }),
    })),
    { name: 'Alert Dialog Store' },
  ),
);

type State = {
  open: boolean;
  setOpen: (value: boolean, record?: Record<string, unknown>) => void;
  record?: Record<string, unknown>;
};
