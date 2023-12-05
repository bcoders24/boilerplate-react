import { useState } from 'react';
import { useStore } from '@/stores/useTodoStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddToDo = () => {
  const [todoTitle, setTodoTitle] = useState('');

  const addTodo = useStore((state) => state.addTodo);
  const onAdd = () => {
    addTodo({
      id: new Date().getTime(),
      todo: todoTitle,
      completed: false,
    });
    setTodoTitle('');
  };

  return (
    <div className="rounded shadow m-2 border flex flex-col p-3 gap-2">
      <h6 className="text-sky-500">Add To Do Component</h6>
      <Input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />
      <Button onClick={onAdd} className="rounded-r">
        Add
      </Button>
    </div>
  );
};

export default AddToDo;
