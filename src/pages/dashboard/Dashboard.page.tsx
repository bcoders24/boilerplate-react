import ModeToggle from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Paths } from '@/constants';
import useAuthStore from '@/stores/useAuthStore';
import { Link } from 'react-router-dom';
// import AddToDo from '@/pages/dashboard/components/AddTodo';
// import Completed from './components/Completed';
// import TodoList from './components/TodoList';

const Dashboard = () => {
  const store = useAuthStore();

  const logout = () => {
    store.setAuthUser(null);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ModeToggle />
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Link to={Paths.USERS}>Users</Link>
      {/* <div className="flex">
        <AddToDo />
        <Completed />
        <TodoList />
      </div> */}
    </div>
  );
};

export default Dashboard;
