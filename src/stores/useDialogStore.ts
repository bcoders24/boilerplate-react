import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useDialogStore = create(
  devtools(
    immer<State>((set) => ({
      data: undefined,
      dialogs: {},
      onDialogChange: (key, value, data) =>
        set((state) => {
          state.dialogs[key] = value;
          if (value) state.data = data;
          else state.data = undefined;
        }),
    })),
    { name: 'Dialog Store' },
  ),
);

type State = {
  dialogs: Record<string, boolean>;
  onDialogChange: (key: string, value: boolean, data?: any) => void;
  data?: any;
};
