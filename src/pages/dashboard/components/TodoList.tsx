import { useStore } from '@/stores/useTodoStore';

const TodoList = () => {
  const todos = useStore((state) => state.todos);
  const setCompleted = useStore((state) => state.setCompleted);
  return (
    <div className="rounded shadow m-2 border flex flex-col p-3">
      <h6 className="text-sky-500">To Do List Component</h6>
      {todos.map((todo) => (
        <div key={todo.id} className="shadow p-2 rounded hover:shadow-md transition grid grid-cols-5">
          <p className={`col-span-4 ${todo.completed ? 'text-slate-300 line-through' : 'text-green-600'}`}>
            {todo.todo}
          </p>
          <input
            type="checkbox"
            value={`${todo.completed}`}
            onChange={(e) => setCompleted(todo.id, e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
