import {
  Route,
  Routes as RouteContainer,
  BrowserRouter as Router,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { Paths } from "constants/index";
import Layout from "src/components/common/Layouts/Layout";
import ProtectedRoute from "src/routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { StoreModel } from "src/store/store";
// Routes imports
import Login from "pages/auth/Login";
import ForgotPassword from "pages/auth/ForgotPassword";
import VerifyEmail from "pages/auth/VerifyEmail";
import ResetPassword from "pages/auth/ResetPassword";
import Loader from "src/components/common/Loader/Loader";
import PageNotFound from "pages/errors/PageNotFound";

const Profile = lazy(() => import("pages/Profile"));
const Users = lazy(() => import("pages/Users"));
const UserData = lazy(() => import("src/pages/user/Users"));

const Routes = () => {
  const user = useSelector((state: StoreModel) => state.auth.user);
  return (
    <Router>
      <Suspense
        fallback={
          <Layout>
            <Loader />
          </Layout>
        }
      >
        <RouteContainer>
          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!user}
                redirectRoute={Paths.PROFILE}
              />
            }
          >
            <Route index path={Paths.LOGIN} element={<Login />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!!user}
                redirectRoute={Paths.LOGIN}
              />
            }
          >
            <Route
              path={Paths.PROFILE}
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!!user && user.roles.includes("client")}
                redirectRoute={Paths.LOGIN}
              />
            }
          >
            <Route
              path={Paths.USER_LIST}
              element={
                <Layout>
                  <Users />
                </Layout>
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!!user}
                redirectRoute={Paths.LOGIN}
              />
            }
          >
            <Route
              path={Paths.USER_DATA}
              element={
                <Layout>
                  <UserData />
                </Layout>
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!user}
                redirectRoute={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!user}
                redirectRoute={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.OTP} element={<VerifyEmail />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={!user}
                redirectRoute={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.RESET_PASSWORD} element={<ResetPassword />} />
          </Route>

          <Route path={Paths.NOT_FOUND} element={<PageNotFound />} />
        </RouteContainer>
      </Suspense>
    </Router>
  );
};

export default Routes;
