import { Fragment } from 'react';
import { Route, Routes as RouteContainer, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '@/routes/route.guard';
import ForgotPassword from '@/features/auth/forgot-password.page';
import Login from '@/features/auth/login.page';
import ResetPassword from '@/features/auth/reset-password.page';
import VerifyEmail from '@/features/auth/verify-email.page';
import PageNotFound from '@/features/errors/not-found.page';
import NoInternetConnection from '@/features/errors/no-internet-connection';
import ModuleLoader from '@/components/common/loaders/module-loader';
import ScreenLoader from '@/components/common/loaders/screen-loader';
import { Paths } from '@/constants';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGetUser } from '@/services/queries/user.query';
import Layout from '@/layouts/main-layout';
import { DecodeToken } from '@/utils/decode';
import { lazyLoad } from '@/utils/loadable';
import useNetwork from '@/hooks/useNetwork';

const Profile = lazyLoad(
  () => import('@/features/profile/profile.page'),
  (module) => module.default,
  {
    fallback: <ModuleLoader />,
  },
);

const ProductDetails = lazyLoad(
  () => import('@/features/product-details/product-details.page'),
  (module) => module.default,
  {
    fallback: <ModuleLoader />,
  },
);

const ProductDashboard = lazyLoad(
  () => import('@/features/product-dashboard/product-dashboard.page'),
  (module) => module.default,
  {
    fallback: <ModuleLoader />,
  },
);

const CustomerDetails = lazyLoad(
  () => import('@/features/customer-details/customer-details.page'),
  (module) => module.default,
  {
    fallback: <ModuleLoader />,
  },
);

const Routes = () => {
  const isOnline = useNetwork();
  const store = useAuthStore();
  const id = DecodeToken(store.session?.accessToken)?.admin;
  const { isFetching, data: user } = useGetUser(id);
  if (isFetching) return <ScreenLoader />;

  return (
    <Fragment>
      <Router>
        <RouteContainer>
          {/* AUTH ROUTES */}
          <Route element={<ProtectedRoute isRouteAccessible={!user} redirectRoute={Paths.PRODUCT_DETAILS} />}>
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
              path={Paths.PRODUCT_DETAILS}
              element={
                <Layout>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path={Paths.PRODUCT_DASHBOARD}
              element={
                <Layout>
                  <ProductDashboard />
                </Layout>
              }
            />
            <Route
              path={Paths.CUSTOMER_DETAILS}
              element={
                <Layout>
                  <CustomerDetails />
                </Layout>
              }
            />
            <Route
              path={Paths.PROFILE}
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
          </Route>
          {/* ADMIN ROUTES END */}

          {/* UNKNOWN ROUTES */}
          <Route path={Paths.NOT_FOUND} element={<PageNotFound />} />
        </RouteContainer>
      </Router>

      {!isOnline && <NoInternetConnection />}
    </Fragment>
  );
};

export default Routes;
