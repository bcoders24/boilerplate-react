import { useStore } from '@/stores/useTodoStore';

const Completed = () => {
  const completed = useStore((state) => state.getCompleted());
  return (
    <div className="rounded shadow m-2 border flex flex-col p-3">
      <h6 className="text-sky-500">Completed To Do Component</h6>
      {completed.map((todo) => (
        <div key={todo.id} className="shadow p-2 rounded hover:shadow-md transition grid grid-cols-5">
          <p className={`col-span-4 ${todo.completed ? 'text-slate-300 line-through' : 'text-green-600'}`}>
            {todo.todo}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Completed;
