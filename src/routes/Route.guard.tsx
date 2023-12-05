import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from 'constants/index';

interface IProtectedRoute {
  isRouteAccessible: boolean;
  redirectRoute: string;
}

const ProtectedRoute = ({ isRouteAccessible = false, redirectRoute = Paths.LOGIN }: IProtectedRoute): JSX.Element => {
  return isRouteAccessible ? <Outlet /> : <Navigate to={redirectRoute} replace />;
};

export default ProtectedRoute;
