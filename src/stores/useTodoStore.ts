import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ToDo {
  id: number;
  todo: string;
  completed: boolean;
}

interface State {
  todos: ToDo[];
  addTodo: (todo: ToDo) => void;
  setCompleted: (id: number, completed: boolean) => void;
  getCompleted: () => ToDo[];
  fetchTodos: () => void;
}

export const useStore = create(
  persist(
    immer<State>((set, get) => ({
      todos: [],
      addTodo: (todo: ToDo) =>
        set((state) => {
          state.todos.push(todo);
        }),
      setCompleted: (id: number, completed: boolean) =>
        set((state) => {
          const todo = state.todos.find((el: ToDo) => el.id === id);
          if (todo) todo.completed = completed;
        }),
      getCompleted: () => get().todos.filter((el) => el.completed),
      fetchTodos: async () => {
        const res = await fetch('https://dummyjson.com/todos', {
          method: 'GET',
        });
        const response = await res.json();
        set({ todos: response.todos });
      },
    })),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
