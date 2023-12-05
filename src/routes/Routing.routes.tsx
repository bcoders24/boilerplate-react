import { Route, Routes as RouteContainer, BrowserRouter as Router } from 'react-router-dom';
// import { Suspense, lazy } from "react";
// import Loader from "src/components/common/Loader/Loader";
import { Paths } from 'constants/index';
import Layout from 'layouts/MainLayout';
// Routes imports
import ProtectedRoute from '@/routes/Route.guard';
import Login from 'pages/auth/Login.page';
import ForgotPassword from 'pages/auth/ForgotPassword.page';
import VerifyEmail from 'pages/auth/VerifyEmail.page';
import ResetPassword from 'pages/auth/ResetPassword.page';
import Dashboard from 'pages/dashboard/Dashboard.page';
import PageNotFound from 'pages/errors/PageNotFound.page';
// Store
import useAuthStore from '@/stores/useAuthStore';
import Users from '@/pages/users/Users.page';

const Routes = () => {
  const user = useAuthStore((state) => state.authUser);
  return (
    <Router>
      {/* <Suspense
        fallback={
          <Layout>
            <Loader />
          </Layout>
        }
      > */}
      <RouteContainer>
        {/* AUTH ROUTES */}
        <Route element={<ProtectedRoute isRouteAccessible={!user} redirectRoute={Paths.DASHBOARD} />}>
          <Route index path={Paths.LOGIN} element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute isRouteAccessible={!user} redirectRoute={Paths.LOGIN} />}>
          <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute isRouteAccessible={!user} redirectRoute={Paths.LOGIN} />}>
          <Route path={Paths.OTP} element={<VerifyEmail />} />
        </Route>

        <Route element={<ProtectedRoute isRouteAccessible={!user} redirectRoute={Paths.LOGIN} />}>
          <Route path={Paths.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        {/* AUTH ROUTES END */}

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute isRouteAccessible={!!user} redirectRoute={Paths.LOGIN} />}>
          <Route
            path={Paths.DASHBOARD}
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path={Paths.USERS}
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path={Paths.USER_DETAIL}
            element={
              <Layout>
                <h1>User details</h1>
              </Layout>
            }
          />
        </Route>

        {/* ADMIN ROUTES END */}

        {/* UNKNOWN ROUTES */}
        <Route path={Paths.NOT_FOUND} element={<PageNotFound />} />
      </RouteContainer>
      {/* </Suspense> */}
    </Router>
  );
};

export default Routes;
