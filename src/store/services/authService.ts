import LocalStorage from "utils/LocalStorage";
import { Endpoints } from "constants/index";
import { baseApi } from "../../api/api";
import { setLogout, setToken, setUser } from "../slices/authSlice";

const onLoginStarted = async (_, { dispatch, queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled;
    dispatch(setToken(data.accessToken));
    dispatch(setUser(data.accessToken));
  } catch (error) {
    console.error("Error", error);
  }
};
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => {
        return {
          url: Endpoints.LOGIN,
          method: "POST",
          body: values,
        };
      },
      onQueryStarted: onLoginStarted,
      invalidatesTags: ["Session"],
    }),
    loginGoogle: builder.mutation({
      query: (values) => ({
        url: Endpoints.GOOGLE,
        method: "POST",
        body: values,
      }),
      onQueryStarted: onLoginStarted,
    }),
    register: builder.mutation({
      query: (values) => ({
        url: Endpoints.REGISTER,
        method: "POST",
        body: values,
      }),
      onQueryStarted: onLoginStarted,
    }),
    forgotPassword: builder.mutation({
      query: (values) => ({
        url: Endpoints.FORGOT,
        method: "POST",
        body: values,
      }),
      onQueryStarted: onLoginStarted,
    }),
    verifyCode: builder.mutation({
      query: (values) => ({
        url: Endpoints.OTP,
        method: "POST",
        body: values,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (args?.operation === "PWD") dispatch(setToken(data.accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (values) => ({
        url: Endpoints.RESET,
        method: "POST",
        body: values,
      }),
    }),
    // resendCode: builder.query({
    //     query: () => AUTH_ROUTE + '/v1/client/auth/refresh-code',
    // }),
    // recoverPassword: builder.mutation({
    //     query: values => ({
    //         url: AUTH_ROUTE + '/v1/client/users/recover-password',
    //         method: 'POST',
    //         body: values,
    //     }),
    // }),
    // completeRegistration: builder.mutation({
    //     query: values => ({
    //         url: AUTH_ROUTE + '/v1/client/users/profiles',
    //         method: 'POST',
    //         body: values,
    //     }),
    //     invalidatesTags: ['Session'],
    // }),
    // getSession: builder.query({
    //     query: () => AUTH_ROUTE + '/v1/client/users/session',
    //     onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
    //         try {
    //             const { data } = await queryFulfilled
    //             dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }))
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     },
    //     transformResponse: async response => {
    //         const user = jwtDecode(response.idToken)
    //         LocalStorage.setInLocalStorage('refreshToken', response.accessToken)

    //         return { accessToken: response.accessToken, user: user.personData }
    //     },
    //     providesTags: ['Session'],
    // }),
    // getRefresh: builder.mutation({
    //     query: refreshToken => ({
    //         url: AUTH_ROUTE + '/v1/client/auth/refresh',
    //         method: 'POST',
    //         headers: {
    //             'refresh-token': refreshToken,
    //         },
    //     }),
    //     transformResponse: response => {
    //         const user = jwtDecode(response.idToken)
    //         return { accessToken: response.accessToken, user: user.personData }
    //     },
    //     invalidatesTags: ['Session'],
    // }),
    // savePushToken: builder.mutation({
    //     query: values => ({
    //         url: AUTH_ROUTE + '/v1/client/auth/push-token',
    //         method: 'POST',
    //         body: values,
    //     }),
    // }),
    logout: builder.mutation({
      query: () => ({
        url: Endpoints.LOGOUT,
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLogout());
          LocalStorage.removeFromLocalStorage("refreshToken");
          await queryFulfilled;
          setTimeout(() => {
            dispatch(baseApi.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLoginGoogleMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
  // useCompleteRegistrationMutation,
  // useRecoverPasswordMutation,
  // useLazyResendCodeQuery,
  // useLazyGetSessionQuery,
  // useGetRefreshMutation,
  useLogoutMutation,
  // useSavePushTokenMutation,
} = authApi;
